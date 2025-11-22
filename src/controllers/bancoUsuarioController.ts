import { Request, Response } from "express";
import {
  listarBancosUsuario,
  criarBancoUsuario,
  removerBancoUsuario
} from "../services/bancoUsuarioService";

export async function getBancosUsuario(req: Request, res: Response) {
  const userId = Number((req as any).userId);
  const lista = await listarBancosUsuario(userId);
  res.json(lista);
}

export async function addBancoUsuario(req: Request, res: Response) {
  const userId = Number((req as any).userId);
  const { banco, titular, conta } = req.body;

  if (!banco || !titular || !conta)
    return res.status(400).json({ error: "Dados incompletos" });

  const novo = await criarBancoUsuario(userId, banco, titular, conta);
  res.json(novo);
}

export async function deleteBancoUsuario(req: Request, res: Response) {
  const userId = Number((req as any).userId);
  const id = Number(req.params.id);

  await removerBancoUsuario(id, userId);
  res.json({ ok: true });
}
