import { Request, Response } from "express";
import { getUserData } from "../services/userService";

export async function getUser(req: Request, res: Response) {
  const userId = Number((req as any).userId);
  const data = await getUserData(userId);
  res.json(data);
}
