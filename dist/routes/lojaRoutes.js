"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/lojaRoutes.ts
const express_1 = require("express");
const lojaController_1 = require("../controllers/lojaController");
const router = (0, express_1.Router)();
router.get("/comprados/:userId", lojaController_1.getPurchasedProductsController);
exports.default = router;
