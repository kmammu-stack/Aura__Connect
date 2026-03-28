require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// A simple in-memory map for userId -> socketId
const userSockets = new Map();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("register", (userId) => {
    if (userId) {
      userSockets.set(userId, socket.id);
      console.log(`User ${userId} registered to socket ${socket.id}`);
    }
  });

  socket.on("sendMessage", (data) => {
    const { to, text, sender } = data;
    const recipientSocket = userSockets.get(to);
    
    if (recipientSocket) {
      io.to(recipientSocket).emit("message", {
        id: Date.now().toString(),
        sender,
        text,
        timestamp: Date.now()
      });
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Aura backend running on http://localhost:${PORT}`);
});
