"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService = __importStar(require("../services/authService"));
async function register(req, res) {
    try {
        const { phone, password, inviteCode } = req.body;
        const result = await authService.register({ phone, password, inviteCode });
        return res.status(201).json(result);
    }
    catch (e) {
        return res.status(400).json({ ok: false, error: e.message || "Erro" });
    }
}
exports.register = register;
async function login(req, res) {
    try {
        const { phone, password } = req.body;
        const result = await authService.login({ phone, password });
        return res.json(result);
    }
    catch (e) {
        return res.status(401).json({ ok: false, error: e.message || "Credenciais inválidas" });
    }
}
exports.login = login;
