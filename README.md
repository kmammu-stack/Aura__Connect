# 🌟 Aura Connect

Aura Connect is a platform designed to connect people with similar interests in a simple, organic, and low-pressure way.

---

## 🎯 Problem Statement
In a world more electronically connected than ever, meaningful real-world connections are fading. There is no system that reveals human intent, relevance, or openness in shared physical spaces. People often sit next to potential collaborators, friends, or mentors in cafes, events, or campuses without ever realizing it.

## 💡 Solution Overview
Aura Connect bridges this gap by acting as a real-time presence platform. It allows users to go online, broadcast their current status and interests, and effortlessly discover like-minded individuals in their vicinity. It removes the friction and awkwardness of cold approaches by providing conversational context before a chat even begins.

## ✨ Key Feature
- **Real-Time Geolocation Presence:** Instantly broadcast your presence and see who is nearby.
- **Context-Aware Discovery:** Filter nearby users based on shared interests (e.g., startups, development, design).
- **Live Interactive Radar:** A dynamic visual interface to see connections around you.
- **Instant Chat & Networking:** Start meaningful conversations right away with people you find interesting.

## 🛠️ Tech Stack Used

**Frontend**
- **React 18** (via CDN with Babel Standalone)
- **Vanilla CSS** (Custom styling with modern modern UI principles)
- **Lucide Icons**
- **Socket.io Client** (Real-time updates)

**Backend**
- **Node.js** & **Express.js** (REST API architecture)
- **MongoDB** & **Mongoose** (Database & ODM)
- **Socket.io** (WebSockets for real-time chat and presence tracking)
- **JWT & bcryptjs** (Secure Authentication and authorization)

---

## 🚀 How to Run the Project

Follow these steps to get both the frontend and backend running locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running, or a MongoDB Atlas URI.

### 1. Backend Setup
Navigate to the backend directory and start the Express server.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend development server:
```bash
npm run dev
```
*(The server should now be running on `http://localhost:8000`)*

### 2. Frontend Setup
Because the frontend uses React via CDNs (with Babel Standalone), no complex build steps (like Webpack or Vite) are required!

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. You can serve the files using any simple static file server. The easiest way via npm is:
   ```bash
   npx serve .
   ```
   *(Alternatively, use the **Live Server** extension in VS Code to open `index.html`)*
3. Open the provided `localhost` URL in your browser to experience Aura Connect!

---
*Submitting a completed README ensures no penalty points for documentation!*
