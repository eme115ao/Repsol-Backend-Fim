import { Router } from "express";
import { listarProdutosComprados } from "../controllers/investmentController";
const router = Router();
router.get("/:userId", listarProdutosComprados);
export default router;
