// src/controllers/transactionsController.ts
import { Request, Response } from "express";
import * as service from "../services/transactionsService";

// DEPÓSITO
export async function depositController(req: Request, res: Response) {
  try {
    const { userId, amount, comprovativo } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: "userId e amount são obrigatórios" });
    }

    const tx = await service.createDeposit(
      Number(userId),
      Number(amount),
      comprovativo || null
    );

    return res.json(tx);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal error" });
  }
}

// LEVANTAMENTO
export async function withdrawController(req: Request, res: Response) {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: "userId e amount são obrigatórios" });
    }

    const tx = await service.requestWithdrawal(Number(userId), Number(amount));

    return res.json(tx);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal error" });
  }
}

// LISTAR LEVANTAMENTOS PENDENTES (ADMIN)
export async function getPendingWithdrawalsController(_req: Request, res: Response) {
  try {
    const list = await service.getPendingWithdrawals();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal error" });
  }
}

// LISTAR TODAS AS TRANSAÇÕES DO USUÁRIO
export async function getUserTransactionsController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ message: "userId inválido" });
    }

    const list = await service.getUserTransactions(userId);

    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal error" });
  }
}
