import { Request, Response } from "express";
import prisma from "../prismaClient";

export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({ orderBy: { valorMinimo: "asc" } });
    return res.json(products);
  } catch (e: any) {
    return res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}
