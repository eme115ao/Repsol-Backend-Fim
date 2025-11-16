"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const investmentController_1 = require("../controllers/investmentController");
const router = (0, express_1.Router)();
router.get("/:userId", investmentController_1.listarProdutosComprados);
exports.default = router;
