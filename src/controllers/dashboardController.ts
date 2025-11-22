import { Request, Response } from "express";
import { obterDashboard } from "../services/dashboardService";

export async function getDashboard(req: Request, res: Response) {
  const userId = Number((req as any).userId);
  const data = await obterDashboard(userId);
  res.json(data);
}
