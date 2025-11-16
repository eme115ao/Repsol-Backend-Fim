import { Request, Response } from "express";
import prisma from "../prismaClient";
import { hashPassword } from "../utils/hash";

/**
 * Register and login minimal endpoints.
 * Register: phone, password, optional inviteCode
 * Login: phone, password -> returns user object (no JWT yet)
 */

export async function register(req: Request, res: Response) {
  try {
    const { phone, password, inviteCode } = req.body;
    if (!phone || !password) return res.status(400).json({ ok: false, error: "phone and password required" });

    const hashed = hashPassword(password);

    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) return res.status(400).json({ ok: false, error: "Phone already registered" });

    const user = await prisma.user.create({
      data: {
        phone,
        password: hashed,
        inviteCode: inviteCode ?? null,
      },
    });

    return res.status(201).json({ ok: true, data: { id: user.id, phone: user.phone } });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) return res.status(400).json({ ok: false, error: "phone and password required" });

    const hashed = hashPassword(password);
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user || user.password !== hashed) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    // return user basic info (no JWT for now)
    return res.json({ ok: true, data: { id: user.id, phone: user.phone, isAdmin: user.isAdmin } });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export default { register, login };
