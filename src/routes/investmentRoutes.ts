import express from "express";
import { createInvestment } from "../controllers/investmentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// POST /api/invest
router.post("/", authMiddleware, createInvestment);

export default router;
