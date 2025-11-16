import prisma from "../prismaClient";
import { startOfDay, addDays } from "date-fns";

export async function gerarRendimentoDiario(userProductId: number) {
  const up = await prisma.userProduct.findUnique({ where: { id: userProductId }, include: { product: true, user: true } });
  if (!up || !up.product) return { ok: false, error: "UserProduct or Product not found" };

  const investido = up.investido;
  const percentual = up.product.rendimento;
  const rendimentoDia = Number((investido * (percentual / 100)).toFixed(2));

  const hoje = startOfDay(new Date());
  const jaExiste = await prisma.dailyYield.findFirst({
    where: { userProductId, date: { gte: hoje, lt: addDays(hoje, 1) } },
  });
  if (jaExiste) return { ok: false, reason: "already_generated_today" };

  const created = await prisma.dailyYield.create({ data: { userProductId, amount: rendimentoDia } });

  await prisma.userProduct.update({ where: { id: userProductId }, data: { rendimentoAcumulado: up.rendimentoAcumulado + rendimentoDia } });

  await prisma.user.update({ where: { id: up.userId }, data: { saldo: (up.user?.saldo ?? 0) + rendimentoDia } });

  await prisma.transaction.create({ data: { userId: up.userId, amount: rendimentoDia, type: "Rendimento", status: "approved" } });

  return { ok: true, rendimentoDia, dailyYieldId: created.id };
}

export async function gerarRendimentosTodos() {
  const ups = await prisma.userProduct.findMany({ include: { product: true, user: true } });
  const resultados: any[] = [];
  for (const up of ups) {
    try {
      const r = await gerarRendimentoDiario(up.id);
      resultados.push({ userProductId: up.id, result: r });
    } catch (e) {
      resultados.push({ userProductId: up.id, error: (e as Error).message });
    }
  }
  return resultados;
}

export default { gerarRendimentoDiario, gerarRendimentosTodos };
