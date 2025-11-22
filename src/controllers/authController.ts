import { Request, Response } from "express";
import { registerService, loginService } from "../services/authService";

export async function register(req: Request, res: Response) {
  const { phone, password, inviteCode } = req.body;

  const result = await registerService(phone, password, inviteCode);
  if ((result as any).error) return res.status(400).json(result);

  return res.json(result);
}

export async function login(req: Request, res: Response) {
  const { phone, password } = req.body;

  const result = await loginService(phone, password);
  if ((result as any).error) return res.status(400).json(result);

  return res.json(result);
}
