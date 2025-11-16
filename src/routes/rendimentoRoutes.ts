import { Router } from "express";
import { runAll, runOne } from "../controllers/rendimentoController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();
router.post("/run-all", authMiddleware, adminMiddleware, runAll);
router.post("/run/:id", authMiddleware, adminMiddleware, runOne);
export default router;
