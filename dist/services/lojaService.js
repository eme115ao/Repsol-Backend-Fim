"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchasedProducts = void 0;
// src/services/lojaService.ts
const prismaClient_1 = __importDefault(require("../prismaClient"));
async function getPurchasedProducts(userId) {
    return prismaClient_1.default.userProduct.findMany({
        where: { userId },
        include: { product: true },
    });
}
exports.getPurchasedProducts = getPurchasedProducts;
