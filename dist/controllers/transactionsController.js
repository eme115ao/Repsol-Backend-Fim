"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTransactionsController = exports.getPendingWithdrawalsController = exports.withdrawController = exports.depositController = void 0;
const service = __importStar(require("../services/transactionsService"));
// DEPÓSITO
async function depositController(req, res) {
    try {
        const { userId, amount, comprovativo } = req.body;
        if (!userId || !amount) {
            return res.status(400).json({ message: "userId e amount são obrigatórios" });
        }
        const tx = await service.createDeposit(Number(userId), Number(amount), comprovativo || null);
        return res.json(tx);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal error" });
    }
}
exports.depositController = depositController;
// LEVANTAMENTO
async function withdrawController(req, res) {
    try {
        const { userId, amount } = req.body;
        if (!userId || !amount) {
            return res.status(400).json({ message: "userId e amount são obrigatórios" });
        }
        const tx = await service.requestWithdrawal(Number(userId), Number(amount));
        return res.json(tx);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal error" });
    }
}
exports.withdrawController = withdrawController;
// LISTAR LEVANTAMENTOS PENDENTES (ADMIN)
async function getPendingWithdrawalsController(_req, res) {
    try {
        const list = await service.getPendingWithdrawals();
        return res.json(list);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal error" });
    }
}
exports.getPendingWithdrawalsController = getPendingWithdrawalsController;
// LISTAR TODAS AS TRANSAÇÕES DO USUÁRIO
async function getUserTransactionsController(req, res) {
    try {
        const userId = Number(req.params.userId);
        if (!userId) {
            return res.status(400).json({ message: "userId inválido" });
        }
        const list = await service.getUserTransactions(userId);
        return res.json(list);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal error" });
    }
}
exports.getUserTransactionsController = getUserTransactionsController;
