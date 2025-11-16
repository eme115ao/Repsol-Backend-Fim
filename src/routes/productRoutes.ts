import { Router } from "express";
import { listarProdutos } from "../controllers/productController";
const router = Router();
router.get("/", listarProdutos);
export default router;
