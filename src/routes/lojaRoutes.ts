// src/routes/lojaRoutes.ts
import { Router } from "express";
import { getPurchasedProductsController } from "../controllers/lojaController";

const router = Router();

router.get("/comprados/:userId", getPurchasedProductsController);

export default router;
