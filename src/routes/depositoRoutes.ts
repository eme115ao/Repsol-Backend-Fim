import { Router } from "express";
import { criarDeposito } from "../controllers/depositoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, criarDeposito);

export default router;
