import { Router } from "express";
import dashboardController from "../controllers/dashboardController";

const router = Router();

router.get("/:id", dashboardController.getDashboard);

export default router;
