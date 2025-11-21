"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../prismaClient"));
exports.default = {
    async getDashboard(req, res) {
        const id = Number(req.params.id);
        try {
            const userProducts = await prismaClient_1.default.userProduct.findMany({
                where: { userId: id },
                include: { product: true },
            });
            const totalInvestido = userProducts.reduce((acc, item) => acc + item.investido, 0);
            const totalRendimento = userProducts.reduce((acc, item) => acc + item.rendimentoAcumulado, 0);
            return res.json({
                totalInvestido,
                totalRendimento,
                produtos: userProducts,
            });
        }
        catch (error) {
            console.error("Erro dashboard:", error);
            return res.status(500).json({ error: "Erro ao carregar dashboard" });
        }
    },
};
