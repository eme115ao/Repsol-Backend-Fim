import { Request, Response, NextFunction } from "express";
import prisma from "../prismaClient";

export async function adminMiddleware(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ ok: false, error: "Unauthorized" });

  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  if (!user || !user.isAdmin) return res.status(403).json({ ok: false, error: "Forbidden: admin only" });

  return next();
}
