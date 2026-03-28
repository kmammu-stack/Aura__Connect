const express = require("express");
const cors = require("cors");
const path = require("path");
const presenceRoutes = require("./routes/presence");
const userRoutes     = require("./routes/userRoutes"); // stub until Padmavathi's module lands

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Aura backend running 🟢" });
});

// YOUR routes — presence + discovery (core backbone)
app.use("/", presenceRoutes);

// Padmavathi's routes — user schema + profile (stub, replace when ready)
app.use("/", userRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../../frontend")));

// Fallback to index.html for single-page app behavior (if needed)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

// 404 fallback inside routes API if needed, but the * route above catches GETs.
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
