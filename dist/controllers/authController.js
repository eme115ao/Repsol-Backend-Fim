"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const hash_1 = require("../utils/hash");
/**
 * Register and login minimal endpoints.
 * Register: phone, password, optional inviteCode
 * Login: phone, password -> returns user object (no JWT yet)
 */
async function register(req, res) {
    try {
        const { phone, password, inviteCode } = req.body;
        if (!phone || !password)
            return res.status(400).json({ ok: false, error: "phone and password required" });
        const hashed = (0, hash_1.hashPassword)(password);
        const existing = await prismaClient_1.default.user.findUnique({ where: { phone } });
        if (existing)
            return res.status(400).json({ ok: false, error: "Phone already registered" });
        const user = await prismaClient_1.default.user.create({
            data: {
                phone,
                password: hashed,
                inviteCode: inviteCode !== null && inviteCode !== void 0 ? inviteCode : null,
            },
        });
        return res.status(201).json({ ok: true, data: { id: user.id, phone: user.phone } });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.register = register;
async function login(req, res) {
    try {
        const { phone, password } = req.body;
        if (!phone || !password)
            return res.status(400).json({ ok: false, error: "phone and password required" });
        const hashed = (0, hash_1.hashPassword)(password);
        const user = await prismaClient_1.default.user.findUnique({ where: { phone } });
        if (!user || user.password !== hashed)
            return res.status(401).json({ ok: false, error: "Invalid credentials" });
        // return user basic info (no JWT for now)
        return res.json({ ok: true, data: { id: user.id, phone: user.phone, isAdmin: user.isAdmin } });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.login = login;
exports.default = { register, login };
