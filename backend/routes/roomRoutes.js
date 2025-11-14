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

import { authenticate, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
---------------------------------------------
 Public Route (No login)
---------------------------------------------
*/

// Students can see available rooms before login
router.get("/", getRooms);

/*
---------------------------------------------
 Protected Routes (Login required)
---------------------------------------------
*/

// Below routes require login
router.use(authenticate);

// Student + Admin: Get single room
router.get("/:id", getRoomById);

/*
---------------------------------------------
 Admin-Only Routes
---------------------------------------------
*/

router.post("/", isAdmin, createRoom);
router.put("/:id", isAdmin, updateRoom);
router.delete("/:id", isAdmin, deleteRoom);

/*
---------------------------------------------
 Student Assignment (Admin-only)
---------------------------------------------
*/

router.post("/:id/assign", isAdmin, assignStudentToRoom);
router.post("/:id/remove", isAdmin, removeStudentFromRoom);

export default router;
