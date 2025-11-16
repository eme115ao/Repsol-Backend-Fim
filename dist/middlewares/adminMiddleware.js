"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
async function adminMiddleware(req, res, next) {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        return res.status(401).json({ ok: false, error: "Unauthorized" });
    const user = await prismaClient_1.default.user.findUnique({ where: { id: Number(userId) } });
    if (!user || !user.isAdmin)
        return res.status(403).json({ ok: false, error: "Forbidden: admin only" });
    return next();
}
exports.adminMiddleware = adminMiddleware;
