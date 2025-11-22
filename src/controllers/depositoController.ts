import { Request, Response } from "express";
import { solicitarDeposito } from "../services/depositoService";

export async function criarDeposito(req: Request, res: Response) {
  const userId = Number((req as any).userId);
  const { amount, bancoId } = req.body;

  if (!amount || !bancoId)
    return res.status(400).json({ error: "Dados incompletos" });

  const dep = await solicitarDeposito(userId, amount, bancoId);
  res.json(dep);
}
