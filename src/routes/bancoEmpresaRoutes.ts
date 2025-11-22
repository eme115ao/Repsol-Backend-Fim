import { Router } from "express";
import { getBancosEmpresa } from "../controllers/bancoEmpresaController";

const router = Router();

router.get("/", getBancosEmpresa);

export default router;
