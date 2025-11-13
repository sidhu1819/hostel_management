import express from "express";
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  assignStudentToRoom,
  removeStudentFromRoom
} from "../controllers/roomController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// CRUD operations
router.get("/", getRooms);
router.get("/:id", getRoomById);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

// Student assignment operations
router.post("/:id/assign", assignStudentToRoom);
router.post("/:id/remove", removeStudentFromRoom);

export default router;
