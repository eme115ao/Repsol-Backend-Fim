import { Router } from "express";
import {
  getBancosUsuario,
  addBancoUsuario,
  deleteBancoUsuario
} from "../controllers/bancoUsuarioController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getBancosUsuario);
router.post("/", authMiddleware, addBancoUsuario);
router.delete("/:id", authMiddleware, deleteBancoUsuario);

export default router;
