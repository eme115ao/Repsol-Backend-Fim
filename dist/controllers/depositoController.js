"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aprovarDeposito = exports.listarPendentes = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
/**
 * listarPendentes (GET)
 * aprovarDeposito (POST /aprovar/:id)
 */
async function listarPendentes(_req, res) {
    try {
        const pendentes = await prismaClient_1.default.transaction.findMany({
            where: { type: "Depósito", status: "pending" },
            orderBy: { createdAt: "desc" },
        });
        return res.json({ ok: true, data: pendentes });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.listarPendentes = listarPendentes;
async function aprovarDeposito(req, res) {
    try {
        const depositoId = Number(req.params.id);
        const deposito = await prismaClient_1.default.transaction.findUnique({ where: { id: depositoId } });
        if (!deposito)
            return res.status(404).json({ ok: false, error: "Depósito não encontrado" });
        if (deposito.type !== "Depósito")
            return res.status(400).json({ ok: false, error: "Not a deposit" });
        if (deposito.status === "approved")
            return res.status(400).json({ ok: false, error: "Já aprovado" });
        const aprovado = await prismaClient_1.default.transaction.update({ where: { id: depositoId }, data: { status: "approved" } });
        await prismaClient_1.default.user.update({ where: { id: deposito.userId }, data: { saldo: { increment: deposito.amount } } });
        return res.json({ ok: true, message: "Depósito aprovado e saldo creditado", deposito: aprovado });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.aprovarDeposito = aprovarDeposito;
exports.default = { listarPendentes, aprovarDeposito };
