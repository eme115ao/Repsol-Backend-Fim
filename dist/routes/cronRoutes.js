"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rendimentoService_1 = require("../services/rendimentoService");
const router = (0, express_1.Router)();
router.post("/rendimento-diario", async (req, res) => {
    try {
        const result = await (0, rendimentoService_1.gerarRendimentosTodos)();
        return res.json({ ok: true, data: result });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
});
exports.default = router;
