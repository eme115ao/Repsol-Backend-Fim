import { prisma } from "../prismaClient";

export async function gerarRendimentosDiarios() {
  const investimentos = await prisma.userProduct.findMany({
    include: { product: true }
  });

  for (const inv of investimentos) {
    const rendimentoDia = (inv.investido * inv.product.rendimento) / 100;

    await prisma.dailyYield.create({
      data: {
        userProductId: inv.id,
        amount: rendimentoDia
      }
    });

    await prisma.userProduct.update({
      where: { id: inv.id },
      data: {
        rendimentoAcumulado: inv.rendimentoAcumulado + rendimentoDia
      }
    });

    await prisma.user.update({
      where: { id: inv.userId },
      data: { saldo: { increment: rendimentoDia } }
    });
  }

  return true;
}
