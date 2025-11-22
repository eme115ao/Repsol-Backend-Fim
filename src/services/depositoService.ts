import { prisma } from "../prismaClient";

export async function solicitarDeposito(
  userId: number,
  amount: number,
  bancoId: number
) {
  return prisma.transaction.create({
    data: {
      userId,
      amount,
      type: "deposit",
      status: "pending",
      comprovativo: null
    }
  });
}
