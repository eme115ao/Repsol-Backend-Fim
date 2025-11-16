"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarProdutosComprados = exports.criarInvestimento = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
/**
 * criarInvestimento: body { userId, productId, investido }
 * listarProdutosComprados: GET /api/loja/:userId
 */
async function criarInvestimento(req, res) {
    try {
        const { userId, productId, investido } = req.body;
        if (!userId || !productId || !investido)
            return res.status(400).json({ ok: false, error: "userId, productId, investido required" });
        const product = await prismaClient_1.default.product.findUnique({ where: { id: Number(productId) } });
        if (!product)
            return res.status(404).json({ ok: false, error: "Product not found" });
        if (Number(investido) < product.valorMinimo)
            return res.status(400).json({ ok: false, error: "Value below minimum" });
        const user = await prismaClient_1.default.user.findUnique({ where: { id: Number(userId) } });
        if (!user)
            return res.status(404).json({ ok: false, error: "User not found" });
        if (user.saldo < Number(investido))
            return res.status(400).json({ ok: false, error: "Insufficient balance" });
        const novo = await prismaClient_1.default.userProduct.create({
            data: { userId: Number(userId), productId: Number(productId), investido: Number(investido), rendimentoAcumulado: 0 }
        });
        await prismaClient_1.default.user.update({
            where: { id: Number(userId) },
            data: { saldo: user.saldo - Number(investido) }
        });
        await prismaClient_1.default.transaction.create({
            data: { userId: Number(userId), amount: Number(investido), type: "Investimento", status: "approved" },
        });
        return res.status(201).json({ ok: true, data: novo });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.criarInvestimento = criarInvestimento;
async function listarProdutosComprados(req, res) {
    try {
        const userId = Number(req.params.userId);
        if (!userId)
            return res.status(400).json({ ok: false, error: "Invalid userId" });
        const ups = await prismaClient_1.default.userProduct.findMany({ where: { userId }, include: { product: true }, orderBy: { createdAt: "desc" } });
        const lista = ups.map(u => ({
            id: u.id,
            nome: u.product.nome,
            investido: u.investido,
            rendimentoAcumulado: u.rendimentoAcumulado,
            valorAtual: Number((u.investido + u.rendimentoAcumulado).toFixed(2)),
            rendimentoDiarioReal: Number((u.investido * (u.product.rendimento / 100)).toFixed(2)),
            duracaoDias: u.product.duracaoDias,
            createdAt: u.createdAt
        }));
        return res.json({ ok: true, data: lista });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.listarProdutosComprados = listarProdutosComprados;
exports.default = { criarInvestimento, listarProdutosComprados };
