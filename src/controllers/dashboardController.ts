import { Request, Response } from "express";
import prisma from "../prismaClient";

export async function getDashboard(_req: Request, res: Response) {
  try {
    // Example summary: total invested (sum investido), total rendimento (sum rendimentoAcumulado)
    const totalInvestido = await prisma.userProduct.aggregate({
      _sum: { investido: true }
    });
    const totalRendimento = await prisma.userProduct.aggregate({
      _sum: { rendimentoAcumulado: true }
    });

    const products = await prisma.userProduct.findMany({
      include: { product: true }
    });

    return res.json({
      totalInvestido: totalInvestido._sum.investido ?? 0,
      totalRendimento: totalRendimento._sum.rendimentoAcumulado ?? 0,
      products
    });
  } catch (e: any) {
    return res.status(500).json({ error: "Erro ao buscar dashboard" });
  }
}
