import { prisma } from "../prismaClient";

export async function listarProdutos() {
  return prisma.product.findMany({
    where: { ativo: true },
    orderBy: { valorMinimo: "asc" }
  });
}

export async function obterProduto(id: number) {
  return prisma.product.findUnique({ where: { id } });
}
