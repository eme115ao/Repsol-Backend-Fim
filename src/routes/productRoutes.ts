import { Router } from "express";
import { getProdutos, getProduto } from "../controllers/productController";

const router = Router();

router.get("/", getProdutos);
router.get("/:id", getProduto);

export default router;
