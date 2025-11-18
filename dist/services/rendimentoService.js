"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarRendimentosTodos = exports.gerarRendimentoDiario = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const date_fns_1 = require("date-fns");
async function gerarRendimentoDiario(userProductId) {
    const up = await prismaClient_1.default.userProduct.findUnique({ where: { id: userProductId }, include: { product: true, user: true } });
    if (!up || !up.product)
        return { ok: false, error: "UserProduct or Product not found" };
    const investido = up.investido;
    const percentual = up.product.rendimento;
    const rendimentoDia = Number((investido * (percentual / 100)).toFixed(2));
    const hoje = (0, date_fns_1.startOfDay)(new Date());
    const jaExiste = await prismaClient_1.default.dailyYield.findFirst({
        where: { userProductId, date: { gte: hoje, lt: (0, date_fns_1.addDays)(hoje, 1) } },
    });
    if (jaExiste)
        return { ok: false, reason: "already_generated_today" };
    const created = await prismaClient_1.default.dailyYield.create({ data: { userProductId, amount: rendimentoDia } });
    await prismaClient_1.default.userProduct.update({ where: { id: userProductId }, data: { rendimentoAcumulado: up.rendimentoAcumulado + rendimentoDia } });
    await prismaClient_1.default.user.update({ where: { id: up.userId }, data: { saldo: (up.user?.saldo ?? 0) + rendimentoDia } });
    await prismaClient_1.default.transaction.create({ data: { userId: up.userId, amount: rendimentoDia, type: "Rendimento", status: "approved" } });
    return { ok: true, rendimentoDia, dailyYieldId: created.id };
}
exports.gerarRendimentoDiario = gerarRendimentoDiario;
async function gerarRendimentosTodos() {
    const ups = await prismaClient_1.default.userProduct.findMany({ include: { product: true, user: true } });
    const resultados = [];
    for (const up of ups) {
        try {
            const r = await gerarRendimentoDiario(up.id);
            resultados.push({ userProductId: up.id, result: r });
        }
        catch (e) {
            resultados.push({ userProductId: up.id, error: e.message });
        }
    }
    return resultados;
}
exports.gerarRendimentosTodos = gerarRendimentosTodos;
exports.default = { gerarRendimentoDiario, gerarRendimentosTodos };
