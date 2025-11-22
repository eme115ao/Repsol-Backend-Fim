// src/services/lojaService.ts
import prisma from "../prismaClient";

export async function getPurchasedProducts(userId: number) {
  return prisma.userProduct.findMany({
    where: { userId },
    include: { product: true },
  });
}
