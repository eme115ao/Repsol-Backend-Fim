"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarProdutos = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
async function listarProdutos(_req, res) {
    try {
        const produtos = await prismaClient_1.default.product.findMany({ where: { ativo: true }, orderBy: { valorMinimo: "asc" } });
        const dados = produtos.map(p => ({
            ...p,
            rendimentoDiarioReal: Number((p.valorMinimo * (p.rendimento / 100)).toFixed(2))
        }));
        return res.json({ ok: true, data: dados });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.listarProdutos = listarProdutos;
exports.default = { listarProdutos };
