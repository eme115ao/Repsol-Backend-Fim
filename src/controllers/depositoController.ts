import { Request, Response } from "express";
import prisma from "../prismaClient";

/**
 * listarPendentes (GET)
 * aprovarDeposito (POST /aprovar/:id)
 */

export async function listarPendentes(_req: Request, res: Response) {
  try {
    const pendentes = await prisma.transaction.findMany({
      where: { type: "Depósito", status: "pending" },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ ok: true, data: pendentes });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export async function aprovarDeposito(req: Request & { user?: any }, res: Response) {
  try {
    const depositoId = Number(req.params.id);
    const deposito = await prisma.transaction.findUnique({ where: { id: depositoId } });
    if (!deposito) return res.status(404).json({ ok: false, error: "Depósito não encontrado" });
    if (deposito.type !== "Depósito") return res.status(400).json({ ok: false, error: "Not a deposit" });
    if (deposito.status === "approved") return res.status(400).json({ ok: false, error: "Já aprovado" });

    const aprovado = await prisma.transaction.update({ where: { id: depositoId }, data: { status: "approved" } });

    await prisma.user.update({ where: { id: deposito.userId }, data: { saldo: { increment: deposito.amount } } });

    return res.json({ ok: true, message: "Depósito aprovado e saldo creditado", deposito: aprovado });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}

export default { listarPendentes, aprovarDeposito };
