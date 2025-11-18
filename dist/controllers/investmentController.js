"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvestment = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
/**
 * Criar um novo investimento
 */
async function createInvestment(req, res) {
    try {
        const userId = req.user.id;
        const { productId, amount } = req.body;
        if (!productId || !amount) {
            return res.status(400).json({ ok: false, error: "Dados incompletos." });
        }
        // Verificar produto
        const product = await prismaClient_1.default.product.findUnique({
            where: { id: Number(productId) },
        });
        if (!product) {
            return res.status(404).json({ ok: false, error: "Produto não encontrado." });
        }
        if (amount < product.valorMinimo) {
            return res.status(400).json({
                ok: false,
                error: `Valor mínimo para investir é ${product.valorMinimo} Kz.`,
            });
        }
        // Criar investimento
        const rendimentoDiario = amount * product.rendimento;
        const investimento = await prismaClient_1.default.userProduct.create({
            data: {
                userId,
                productId: product.id,
                investido: amount,
                rendimentoAcumulado: 0,
            },
        });
        return res.json({
            ok: true,
            message: "Investimento realizado com sucesso!",
            investimento,
            rendimentoDiario,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error: "Erro ao investir." });
    }
}
exports.createInvestment = createInvestment;
