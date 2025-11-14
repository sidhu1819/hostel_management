import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://hostel-management-system-rnox.onrender.com" // ✅ FIXED (NO TRAILING /)
    ],
    credentials: true,
  })
);

// Health check for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running!" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/ai", aiRoutes);

app.use("/api/requests", requestRoutes);

// Default API message
app.get("/", (req, res) => {
  res.json({ message: "Hostel Management System Backend API" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// PORT
const PORT = process.env.PORT || 5000;

// MongoDB connect + start server
async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error("❌ Error: MONGO_URI is missing in .env file");
    process.exit(1);
  }

  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use`);
        process.exit(1);
      } else {
        throw err;
      }
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

startServer();
