import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket
} from "../controllers/ticketController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.put("/:id/status", updateTicketStatus);
router.delete("/:id", deleteTicket);

export default router;

