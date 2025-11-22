import { prisma } from "../prismaClient";

export async function obterDashboard(userId: number) {
  const totalInvestido = await prisma.userProduct.aggregate({
    where: { userId },
    _sum: { investido: true }
  });

  const totalRendimento = await prisma.userProduct.aggregate({
    where: { userId },
    _sum: { rendimentoAcumulado: true }
  });

  const produtos = await prisma.userProduct.findMany({
    where: { userId },
    include: { product: true }
  });

  return {
    totalInvestido: totalInvestido._sum.investido || 0,
    totalRendimento: totalRendimento._sum.rendimentoAcumulado || 0,
    produtos
  };
}
