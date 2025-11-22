import { prisma } from "../prismaClient";

export async function listarBancosUsuario(userId: number) {
  return prisma.bancoUsuario.findMany({
    where: { userId },
    orderBy: { id: "desc" }
  });
}

export async function criarBancoUsuario(userId: number, banco: string, titular: string, conta: string) {
  return prisma.bancoUsuario.create({
    data: { userId, banco, titular, conta }
  });
}

export async function removerBancoUsuario(id: number, userId: number) {
  return prisma.bancoUsuario.deleteMany({
    where: { id, userId }
  });
}
