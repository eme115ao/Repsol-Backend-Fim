import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {
  try {
    const { phone, password, inviteCode } = req.body;
    const result = await authService.register({ phone, password, inviteCode });
    return res.status(201).json(result);
  } catch (e: any) {
    return res.status(400).json({ ok: false, error: e.message || "Erro" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;
    const result = await authService.login({ phone, password });
    return res.json(result);
  } catch (e: any) {
    return res.status(401).json({ ok: false, error: e.message || "Credenciais inválidas" });
  }
}
