"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
async function getDashboard(_req, res) {
    try {
        // Example summary: total invested (sum investido), total rendimento (sum rendimentoAcumulado)
        const totalInvestido = await prismaClient_1.default.userProduct.aggregate({
            _sum: { investido: true }
        });
        const totalRendimento = await prismaClient_1.default.userProduct.aggregate({
            _sum: { rendimentoAcumulado: true }
        });
        const products = await prismaClient_1.default.userProduct.findMany({
            include: { product: true }
        });
        return res.json({
            totalInvestido: totalInvestido._sum.investido ?? 0,
            totalRendimento: totalRendimento._sum.rendimentoAcumulado ?? 0,
            products
        });
    }
    catch (e) {
        return res.status(500).json({ error: "Erro ao buscar dashboard" });
    }
}
exports.getDashboard = getDashboard;
