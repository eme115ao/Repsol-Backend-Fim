import { Request, Response } from "express";
import { listarProdutos, obterProduto } from "../services/productService";

export async function getProdutos(req: Request, res: Response) {
  const produtos = await listarProdutos();
  res.json(produtos);
}

export async function getProduto(req: Request, res: Response) {
  const id = Number(req.params.id);
  const produto = await obterProduto(id);

  if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

  res.json(produto);
}
