import { Request, Response } from "express";
import { listarBancosEmpresa } from "../services/bancoEmpresaService";

export async function getBancosEmpresa(req: Request, res: Response) {
  const bancos = await listarBancosEmpresa();
  res.json(bancos);
}
