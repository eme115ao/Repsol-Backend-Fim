// src/services/transactionsService.ts
import prisma from "../prismaClient";

// Criar depósito
export async function createDeposit(
  userId: number,
  amount: number,
  comprovativo: string | null
) {
  return prisma.transaction.create({
    data: {
      userId,
      amount,
      type: "DEPOSIT",
      status: "pending",
      comprovativo: comprovativo ?? null
    },
  });
}

// Criar solicitação de levantamento
export async function requestWithdrawal(
  userId: number,
  amount: number
) {
  return prisma.transaction.create({
    data: {
      userId,
      amount,
      type: "WITHDRAW",
      status: "pending",
    },
  });
}

// Buscar levantamentos pendentes (admin)
export async function getPendingWithdrawals() {
  return prisma.transaction.findMany({
    where: { type: "WITHDRAW", status: "pending" },
    orderBy: { createdAt: "desc" },
  });
}

// Buscar todas as transações do usuário
export async function getUserTransactions(userId: number) {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
