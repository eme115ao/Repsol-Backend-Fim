import { Request, Response } from "express";
import prisma from "../prismaClient";

/**
 * criarInvestimento: body { userId, productId, investido }
 * listarProdutosComprados: GET /api/loja/:userId
 */

export async function criarInvestimento(req: Request, res: Response) {
  try {
    const { userId, productId, investido } = req.body;
    if (!userId || !productId || !investido) return res.status(400).json({ ok: false, error: "userId, productId, investido required" });

    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
    if (!product) return res.status(404).json({ ok: false, error: "Product not found" });
    if (Number(investido) < product.valorMinimo) return res.status(400).json({ ok: false, error: "Value below minimum" });

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    if (user.saldo < Number(investido)) return res.status(400).json({ ok: false, error: "Insufficient balance" });

    const novo = await prisma.userProduct.create({
      data: { userId: Number(userId), productId: Number(productId), investido: Number(investido), rendimentoAcumulado: 0 }
    });

    await prisma.user.update({
      where: { id: Number(userId) },
      data: { saldo: user.saldo - Number(investido) }
    });

    await prisma.transaction.create({
      data: { userId: Number(userId), amount: Number(investido), type: "Investimento", status: "approved" },
    });

    return res.status(201).json({ ok: true, data: novo });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export async function listarProdutosComprados(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    if (!userId) return res.status(400).json({ ok: false, error: "Invalid userId" });

    const ups = await prisma.userProduct.findMany({ where: { userId }, include: { product: true }, orderBy: { createdAt: "desc" } });

    const lista = ups.map(u => ({
      id: u.id,
      nome: u.product.nome,
      investido: u.investido,
      rendimentoAcumulado: u.rendimentoAcumulado,
      valorAtual: Number((u.investido + u.rendimentoAcumulado).toFixed(2)),
      rendimentoDiarioReal: Number((u.investido * (u.product.rendimento / 100)).toFixed(2)),
      duracaoDias: u.product.duracaoDias,
      createdAt: u.createdAt
    }));

    return res.json({ ok: true, data: lista });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export default { criarInvestimento, listarProdutosComprados };
