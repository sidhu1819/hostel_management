import express from "express";
import { chatWithAI } from "../controllers/aiController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// AI route requires authentication
router.use(authenticate);

router.post("/", chatWithAI);

export default router;

