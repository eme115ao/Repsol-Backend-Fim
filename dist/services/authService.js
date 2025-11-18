"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "repsol_secret";
async function register({ phone, password, inviteCode }) {
    if (!phone || !password)
        throw new Error("phone and password required");
    // simple inviteCode validation: require 'REPSOL-0001' or allow null if admin seed created users
    if (!inviteCode)
        throw new Error("inviteCode is required");
    // optional: you can implement more invite validation
    const existing = await prismaClient_1.default.user.findUnique({ where: { phone } });
    if (existing)
        throw new Error("User already exists");
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await prismaClient_1.default.user.create({
        data: {
            phone,
            password: hashed,
            inviteCode,
            saldo: 0.0,
            isAdmin: false
        }
    });
    const token = jsonwebtoken_1.default.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: "7d" });
    return { token, user: { id: user.id, phone: user.phone, isAdmin: user.isAdmin } };
}
exports.register = register;
async function login({ phone, password }) {
    if (!phone || !password)
        throw new Error("phone and password required");
    const user = await prismaClient_1.default.user.findUnique({ where: { phone } });
    if (!user)
        throw new Error("User not found");
    const ok = await bcryptjs_1.default.compare(password, user.password);
    if (!ok)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: "7d" });
    return { token, user: { id: user.id, phone: user.phone, isAdmin: user.isAdmin } };
}
exports.login = login;
