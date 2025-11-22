import { Router } from "express";

import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import bancoEmpresaRoutes from "./bancoEmpresaRoutes";
import bancoUsuarioRoutes from "./bancoUsuarioRoutes";
import depositoRoutes from "./depositoRoutes";
import saqueRoutes from "./saqueRoutes";
import dashboardRoutes from "./dashboardRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/bancos", bancoEmpresaRoutes);
router.use("/meubanco", bancoUsuarioRoutes);
router.use("/deposito", depositoRoutes);
router.use("/saque", saqueRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/user", userRoutes);

export default router;
