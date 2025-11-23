import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Token não enviado" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as any;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
