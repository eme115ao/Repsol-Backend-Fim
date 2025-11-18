import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "repsol_secret";

export async function register({ phone, password, inviteCode }: any) {
  if (!phone || !password) throw new Error("phone and password required");

  // simple inviteCode validation: require 'REPSOL-0001' or allow null if admin seed created users
  if (!inviteCode) throw new Error("inviteCode is required");

  // optional: you can implement more invite validation
  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      phone,
      password: hashed,
      inviteCode,
      saldo: 0.0,
      isAdmin: false
    }
  });

  const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: "7d" });
  return { token, user: { id: user.id, phone: user.phone, isAdmin: user.isAdmin } };
}

export async function login({ phone, password }: any) {
  if (!phone || !password) throw new Error("phone and password required");

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) throw new Error("User not found");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: "7d" });
  return { token, user: { id: user.id, phone: user.phone, isAdmin: user.isAdmin } };
}
