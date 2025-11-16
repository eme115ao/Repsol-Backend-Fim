import { Router } from "express";
import { listarPendentes, aprovarDeposito } from "../controllers/depositoController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();
router.get("/pendentes", authMiddleware, adminMiddleware, listarPendentes);
router.post("/aprovar/:id", authMiddleware, adminMiddleware, aprovarDeposito);
export default router;
