import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app = express();

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not set in .env file");
  console.error("Please create a .env file in the backend folder with:");
  console.error("MONGO_URI=your_mongodb_connection_string");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}));

// Connect to MongoDB
console.log("Connecting to MongoDB:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("Make sure your IP is whitelisted in MongoDB Atlas and password is URL-encoded.");
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/ai", aiRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Hostel Management System Backend API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Handle port already in use error gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.error('Solutions:');
    console.error('1. Kill the process using this port:');
    console.error('   Windows: netstat -ano | findstr :' + PORT);
    console.error('   Then: taskkill /PID <PID> /F');
    console.error('2. Or change PORT in .env file to a different port (e.g., 5001)');
    process.exit(1);
  } else {
    throw err;
  }
});
