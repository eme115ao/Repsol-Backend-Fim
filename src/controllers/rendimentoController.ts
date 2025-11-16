import { Request, Response } from "express";
import { gerarRendimentoDiario, gerarRendimentosTodos } from "../services/rendimentoService";

export async function runAll(_req: Request, res: Response) {
  try {
    const r = await gerarRendimentosTodos();
    return res.json({ ok: true, data: r });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export async function runOne(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const r = await gerarRendimentoDiario(id);
    return res.json({ ok: true, data: r });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export default { runAll, runOne };
