"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/referralRoutes.ts
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const router = (0, express_1.Router)();
/**
 * LISTAR CONVIDADOS DE UM USUÁRIO
 * GET /api/referral/:id
 */
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const convidados = await prismaClient_1.default.referral.findMany({
            where: { referrerId: id },
            include: {
                referredUser: {
                    select: {
                        id: true,
                        phone: true,
                        createdAt: true,
                    },
                },
            },
        });
        return res.json(convidados);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
exports.default = router;
