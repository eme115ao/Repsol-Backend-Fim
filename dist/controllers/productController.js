"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
async function getProducts(_req, res) {
    try {
        const products = await prismaClient_1.default.product.findMany({ orderBy: { valorMinimo: "asc" } });
        return res.json(products);
    }
    catch (e) {
        return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
}
exports.getProducts = getProducts;
