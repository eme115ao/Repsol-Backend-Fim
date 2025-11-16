import { Request, Response } from "express";
import prisma from "../prismaClient";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/hash";

export async function register(req: Request, res: Response) {
  try {
    const { phone, password, inviteCode } = req.body;

    if (!phone || !password)
      return res.status(400).json({ ok: false, error: "phone and password required" });

    const exists = await prisma.user.findUnique({ where: { phone } });
    if (exists)
      return res.status(400).json({ ok: false, error: "Phone already registered" });

    const hashed = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        phone,
        password: hashed,
        inviteCode: inviteCode ?? null,
      },
    });

    return res.status(201).json({
      ok: true,
      data: { id: user.id, phone: user.phone },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: (err as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password)
      return res.status(400).json({ ok: false, error: "phone and password required" });

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user)
      return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const hashed = hashPassword(password);

    if (user.password !== hashed)
      return res.status(401).json({ ok: false, error: "Invalid credentials" });

    // === JWT TOKEN ===
    const token = jwt.sign(
      { id: user.id, phone: user.phone, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.json({
      ok: true,
      token,
      data: {
        id: user.id,
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: (err as Error).message });
  }
}

export default { register, login };
