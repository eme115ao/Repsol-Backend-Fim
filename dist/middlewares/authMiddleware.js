"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
/**
 * Simple tokenless auth for dev:
 * - Accepts x-user-id header for testing
 * - If no header, tries basic phone/password from body (login route handles)
 * Replace with JWT when ready.
 */
async function authMiddleware(req, res, next) {
    const header = req.headers["x-user-id"];
    if (header) {
        req.user = { id: Number(header) };
        return next();
    }
    return res.status(401).json({ ok: false, error: "Unauthorized - add x-user-id header for dev" });
}
exports.authMiddleware = authMiddleware;
