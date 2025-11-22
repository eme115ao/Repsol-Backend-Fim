import { prisma } from "../prismaClient";

export async function solicitarSaque(
  userId: number,
  amount: number,
  bancoUsuarioId: number
) {
  return prisma.transaction.create({
    data: {
      userId,
      amount,
      type: "withdraw",
      status: "pending"
    }
  });
}
