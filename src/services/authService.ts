import { prisma } from "../prismaClient";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

export async function registerService(phone: string, password: string, inviteCode?: string) {
  const exists = await prisma.user.findUnique({ where: { phone } });
  if (exists) return { error: "Número já registrado" };

  const hash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      phone,
      password: hash,
      inviteCode: inviteCode || null
    }
  });

  const token = signToken({ userId: user.id });

  return { token, user };
}

export async function loginService(phone: string, password: string) {
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) return { error: "Usuário não encontrado" };

  const ok = await comparePassword(password, user.password);
  if (!ok) return { error: "Senha incorreta" };

  const token = signToken({ userId: user.id });

  return { token, user };
}
