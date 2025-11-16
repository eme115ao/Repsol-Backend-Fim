import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando criação de dados iniciais...");

  // Criação do usuário administrador
  const user = await prisma.user.upsert({
    where: { phone: "941971541" },
    update: {},
    create: {
      phone: "941971541",
      password: "123456",
      saldo: 0,
      isAdmin: true,
    },
  });

  console.log("✅ Usuário criado:", user.phone);

  // Produtos Reais Repsol — compatíveis com o schema atual
  const produtos = [
    { name: "Gás Butano",     minValue: 9000,   dailyRate: 270 / 9000,   durationDays: 150, image: "butano.png",     description: "Produto de entrada" },
    { name: "Gás Metano",     minValue: 20000,  dailyRate: 600 / 20000,  durationDays: 150, image: "metano.png",     description: "Plano médio" },
    { name: "Gás Propano",    minValue: 60000,  dailyRate: 1800 / 60000, durationDays: 150, image: "propano.png",    description: "Plano equilibrado" },
    { name: "Gás Pentano",    minValue: 150000, dailyRate: 4500 / 150000, durationDays: 150, image: "pentano.png",    description: "Plano sólido" },
    { name: "Gás Hexano",     minValue: 250000, dailyRate: 7000 / 250000, durationDays: 150, image: "hexano.png",     description: "Plano alto rendimento" },
    { name: "Gás Heptano",    minValue: 500000, dailyRate: 12000 / 500000, durationDays: 150, image: "heptano.png",   description: "Plano avançado" },
    { name: "Gás Octano",     minValue: 1000000, dailyRate: 25000 / 1000000, durationDays: 150, image: "octano.png",   description: "Plano supremo Repsol" },
  ];

  // Criação dos produtos
  for (const p of produtos) {
    const existente = await prisma.product.findFirst({ where: { name: p.name } });
    if (!existente) {
      await prisma.product.create({ data: p });
      console.log("📦 Produto criado:", p.name);
    } else {
      console.log("🔸 Produto já existe:", p.name);
    }
  }

  // Criar investimento de teste
  const produtoTeste = await prisma.product.findFirst({ where: { name: "Gás Butano" } });

  if (produtoTeste) {
    const invExistente = await prisma.userProduct.findFirst({
      where: {
        userId: user.id,
        productId: produtoTeste.id,
      },
    });

    if (!invExistente) {
      await prisma.userProduct.create({
        data: {
          userId: user.id,
          productId: produtoTeste.id,
          investedValue: produtoTeste.minValue,
          dailyYield: produtoTeste.minValue * produtoTeste.dailyRate,
          totalYield: 0,
          daysRemaining: produtoTeste.durationDays,
        },
      });

      console.log("💰 Investimento de teste criado em Gás Butano");
    }
  }

  console.log("🎯 Base de dados inicial pronta!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
