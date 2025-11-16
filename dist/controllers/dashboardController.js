"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
async function getDashboard(req, res) {
    try {
        const userId = Number(req.params.userId);
        if (!userId)
            return res.status(400).json({ ok: false, error: "Invalid userId" });
        const userProducts = await prismaClient_1.default.userProduct.findMany({ where: { userId }, include: { product: true } });
        const totalInvestido = userProducts.reduce((t, u) => { var _a; return t + ((_a = u.investido) !== null && _a !== void 0 ? _a : 0); }, 0);
        const totalRendimentos = userProducts.reduce((t, u) => { var _a; return t + ((_a = u.rendimentoAcumulado) !== null && _a !== void 0 ? _a : 0); }, 0);
        const totalAtual = totalInvestido + totalRendimentos;
        const transacoes = await prismaClient_1.default.transaction.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 20 });
        return res.json({ ok: true, data: { totalInvestido, totalRendimentos, totalAtual, transacoes } });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.getDashboard = getDashboard;
exports.default = { getDashboard };
