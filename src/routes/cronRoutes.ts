import { Router } from "express";
import { gerarRendimentosTodos } from "../services/rendimentoService";

const router = Router();

router.post("/rendimento-diario", async (req, res) => {
  try {
    const result = await gerarRendimentosTodos();
    return res.json({ ok: true, data: result });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
});

export default router;
