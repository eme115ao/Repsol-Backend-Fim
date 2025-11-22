import { Request, Response } from "express";
import { solicitarSaque } from "../services/saqueService";

export async function criarSaque(req: Request, res: Response) {
  const userId = Number((req as any).userId);
  const { amount, bancoUsuarioId } = req.body;

  if (!amount || !bancoUsuarioId)
    return res.status(400).json({ error: "Dados incompletos" });

  const saque = await solicitarSaque(userId, amount, bancoUsuarioId);
  res.json(saque);
}
