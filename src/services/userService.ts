import { prisma } from "../prismaClient";

export async function getUserData(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      phone: true,
      saldo: true,
      inviteCode: true,
      createdAt: true
    }
  });
}
