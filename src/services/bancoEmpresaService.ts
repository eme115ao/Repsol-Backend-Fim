import { prisma } from "../prismaClient";

export async function listarBancosEmpresa() {
  return prisma.bancoEmpresa.findMany({
    orderBy: { nome: "asc" }
  });
}
