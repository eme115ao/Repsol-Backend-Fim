// src/routes/transactionsRoutes.ts
import { Router } from "express";
import {
  depositController,
  withdrawController,
  getPendingWithdrawalsController,
  getUserTransactionsController
} from "../controllers/transactionsController";

const router = Router();

// DEPÓSITO
router.post("/deposit", depositController);

// LEVANTAMENTO
router.post("/withdraw", withdrawController);

// Alias PT
router.post("/levantamento", withdrawController);

// LISTAR LEVANTAMENTOS PENDENTES (ADMIN)
router.get("/withdraw/pending", getPendingWithdrawalsController);

// LISTAR TODAS AS TRANSAÇÕES DO USUÁRIO
router.get("/user/:userId", getUserTransactionsController);

export default router;
