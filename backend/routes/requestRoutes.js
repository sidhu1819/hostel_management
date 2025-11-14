import express from "express";
import {
  createRequest,
  deleteRequest,
  getRequests,
  approveRequest,
  rejectRequest,
} from "../controllers/requestController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Student routes
router.post("/", createRequest);         // Student creates a room request
router.delete("/:id", deleteRequest);    // Student cancels a request
router.get("/", getRequests);            // Admin or student fetches requests

// Admin routes
router.post("/:id/approve", approveRequest);
router.post("/:id/reject", rejectRequest);

export default router;
