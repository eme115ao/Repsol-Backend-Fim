// src/controllers/lojaController.ts
import { Request, Response } from "express";
import * as service from "../services/lojaService";

export async function getPurchasedProductsController(
  req: Request,
  res: Response
) {
  try {
    const userId = Number(req.params.userId);
    if (!userId) return res.status(400).json({ message: "UserId inválido" });

    const list = await service.getPurchasedProducts(userId);
    return res.json(list);
  } catch (err) {
    console.error("Erro listar produtos comprados:", err);
    return res.status(500).json({ message: "Erro interno" });
  }
}
