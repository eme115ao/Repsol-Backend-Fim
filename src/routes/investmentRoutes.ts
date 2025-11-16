import { Router } from "express";
import { criarInvestimento, listarProdutosComprados } from "../controllers/investmentController";
const router = Router();
router.post("/", criarInvestimento);
router.get("/user/:userId", listarProdutosComprados);
export default router;
