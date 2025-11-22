"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/transactionsRoutes.ts
const express_1 = require("express");
const transactionsController_1 = require("../controllers/transactionsController");
const router = (0, express_1.Router)();
// DEPÓSITO
router.post("/deposit", transactionsController_1.depositController);
// LEVANTAMENTO
router.post("/withdraw", transactionsController_1.withdrawController);
// Alias PT
router.post("/levantamento", transactionsController_1.withdrawController);
// LISTAR LEVANTAMENTOS PENDENTES (ADMIN)
router.get("/withdraw/pending", transactionsController_1.getPendingWithdrawalsController);
// LISTAR TODAS AS TRANSAÇÕES DO USUÁRIO
router.get("/user/:userId", transactionsController_1.getUserTransactionsController);
exports.default = router;
