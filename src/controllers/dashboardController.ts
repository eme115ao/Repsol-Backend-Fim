import { Request, Response } from "express";
import prisma from "../prismaClient";

export default {
  async getDashboard(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const userProducts = await prisma.userProduct.findMany({
        where: { userId: id },
        include: { product: true },
      });

      const totalInvestido = userProducts.reduce(
        (acc, item) => acc + item.investido,
        0
      );

      const totalRendimento = userProducts.reduce(
        (acc, item) => acc + item.rendimentoAcumulado,
        0
      );

      return res.json({
        totalInvestido,
        totalRendimento,
        produtos: userProducts,
      });
    } catch (error) {
      console.error("Erro dashboard:", error);
      return res.status(500).json({ error: "Erro ao carregar dashboard" });
    }
  },
};
