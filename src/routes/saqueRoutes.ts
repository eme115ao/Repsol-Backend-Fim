import { Router } from "express";
import { criarSaque } from "../controllers/saqueController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, criarSaque);

export default router;
