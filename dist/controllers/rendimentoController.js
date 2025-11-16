"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOne = exports.runAll = void 0;
const rendimentoService_1 = require("../services/rendimentoService");
async function runAll(_req, res) {
    try {
        const r = await (0, rendimentoService_1.gerarRendimentosTodos)();
        return res.json({ ok: true, data: r });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.runAll = runAll;
async function runOne(req, res) {
    try {
        const id = Number(req.params.id);
        const r = await (0, rendimentoService_1.gerarRendimentoDiario)(id);
        return res.json({ ok: true, data: r });
    }
    catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
    }
}
exports.runOne = runOne;
exports.default = { runAll, runOne };
