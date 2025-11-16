import { Request, Response } from "express";
import prisma from "../prismaClient";

export async function listarProdutos(_req: Request, res: Response) {
  try {
    const produtos = await prisma.product.findMany({ where: { ativo: true }, orderBy: { valorMinimo: "asc" } });
    const dados = produtos.map(p => ({
      ...p,
      rendimentoDiarioReal: Number((p.valorMinimo * (p.rendimento / 100)).toFixed(2))
    }));
    return res.json({ ok: true, data: dados });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export default { listarProdutos };
