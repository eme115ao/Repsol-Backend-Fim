import { Request, Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

/**
 * Criar um novo investimento
 */
export async function createInvestment(req: AuthRequest, res: Response) {
  try {
    const userId = req.user.id;
    const { productId, amount } = req.body;

    if (!productId || !amount) {
      return res.status(400).json({ ok: false, error: "Dados incompletos." });
    }

    // Verificar produto
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ ok: false, error: "Produto não encontrado." });
    }

    if (amount < product.valorMinimo) {
      return res.status(400).json({
        ok: false,
        error: `Valor mínimo para investir é ${product.valorMinimo} Kz.`,
      });
    }

    // Criar investimento
    const rendimentoDiario = amount * product.rendimento;

    const investimento = await prisma.userProduct.create({
      data: {
        userId,
        productId: product.id,
        investido: amount,
        rendimentoAcumulado: 0,
      },
    });

    return res.json({
      ok: true,
      message: "Investimento realizado com sucesso!",
      investimento,
      rendimentoDiario,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Erro ao investir." });
  }
}
