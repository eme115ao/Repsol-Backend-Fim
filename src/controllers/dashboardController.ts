import { Request, Response } from "express";
import prisma from "../prismaClient";

export async function getDashboard(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    if (!userId) return res.status(400).json({ ok: false, error: "Invalid userId" });

    const userProducts = await prisma.userProduct.findMany({ where: { userId }, include: { product: true } });

    const totalInvestido = userProducts.reduce((t, u) => t + (u.investido ?? 0), 0);
    const totalRendimentos = userProducts.reduce((t, u) => t + (u.rendimentoAcumulado ?? 0), 0);
    const totalAtual = totalInvestido + totalRendimentos;

    const transacoes = await prisma.transaction.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 20 });

    return res.json({ ok: true, data: { totalInvestido, totalRendimentos, totalAtual, transacoes } });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export default { getDashboard };
