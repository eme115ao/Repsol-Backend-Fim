import { Request, Response, NextFunction } from "express";
import prisma from "../prismaClient";

/**
 * Simple tokenless auth for dev:
 * - Accepts x-user-id header for testing
 * - If no header, tries basic phone/password from body (login route handles)
 * Replace with JWT when ready.
 */
export async function authMiddleware(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const header = req.headers["x-user-id"];
  if (header) {
    req.user = { id: Number(header) };
    return next();
  }

  return res.status(401).json({ ok: false, error: "Unauthorized - add x-user-id header for dev" });
}
