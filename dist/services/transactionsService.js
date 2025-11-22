"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTransactions = exports.getPendingWithdrawals = exports.requestWithdrawal = exports.createDeposit = void 0;
// src/services/transactionsService.ts
const prismaClient_1 = __importDefault(require("../prismaClient"));
// Criar depósito
async function createDeposit(userId, amount, comprovativo) {
    return prismaClient_1.default.transaction.create({
        data: {
            userId,
            amount,
            type: "DEPOSIT",
            status: "pending",
            comprovativo: comprovativo ?? null
        },
    });
}
exports.createDeposit = createDeposit;
// Criar solicitação de levantamento
async function requestWithdrawal(userId, amount) {
    return prismaClient_1.default.transaction.create({
        data: {
            userId,
            amount,
            type: "WITHDRAW",
            status: "pending",
        },
    });
}
exports.requestWithdrawal = requestWithdrawal;
// Buscar levantamentos pendentes (admin)
async function getPendingWithdrawals() {
    return prismaClient_1.default.transaction.findMany({
        where: { type: "WITHDRAW", status: "pending" },
        orderBy: { createdAt: "desc" },
    });
}
exports.getPendingWithdrawals = getPendingWithdrawals;
// Buscar todas as transações do usuário
async function getUserTransactions(userId) {
    return prismaClient_1.default.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
}
exports.getUserTransactions = getUserTransactions;
