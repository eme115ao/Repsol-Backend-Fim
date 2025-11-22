import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando seed...");

  /* ADMIN */
  const adminPhone = "934096717";
  const adminPassword = "040397";
  const inviteCode = "REPSOL-0001";

  const adminExists = await prisma.user.findUnique({
    where: { phone: adminPhone }
  });

  if (!adminExists) {
    const hash = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        phone: adminPhone,
        password: hash,
        inviteCode,
        isAdmin: true,
        saldo: 0
      }
    });

    console.log("✅ Admin criado:", adminPhone);
  } else {
    console.log("🔸 Admin já existe:", adminPhone);
  }

  /* PRODUTOS REAIS (7) */
  const produtos = [
    {
      nome: "Gás Butano",
      descricao: "Produto de entrada com rendimento diário de 3%.",
      valorMinimo: 9000,
      rendimento: 3.0,
      duracaoDias: 150,
      imagem: "butano.png"
    },
    {
      nome: "Gás Metano",
      descricao: "Plano médio para rendimento estável de 3% ao dia.",
      valorMinimo: 20000,
      rendimento: 3.0,
      duracaoDias: 150,
      imagem: "metano.png"
    },
    {
      nome: "Gás Propano",
      descricao: "Investimento com bom retorno e risco controlado.",
      valorMinimo: 60000,
      rendimento: 3.0,
      duracaoDias: 150,
      imagem: "propano.png"
    },
    {
      nome: "Gás Pentano",
      descricao: "Plano sólido com retorno diário garantido.",
      valorMinimo: 150000,
      rendimento: 3.0,
      duracaoDias: 150,
      imagem: "pentano.png"
    },
    {
      nome: "Gás Hexano",
      descricao: "Ideal para investidores experientes com ganhos diários de 3%.",
      valorMinimo: 250000,
      rendimento: 3.0,
      duracaoDias: 150,
      imagem: "hexano.png"
    },
    {
      nome: "Gás Heptano",
      descricao: "Alto rendimento e estabilidade de 3% diário.",
      valorMinimo: 500000,
      rendimento: 3.0,
      duracaoDias: 150,
      imagem: "heptano.png"
    },
    {
      nome: "Gás Octano",
      descricao: "Plano máximo de investimento com lucros expressivos de 3% ao dia.",
      valorMinimo: 1000000,
      rendimento: 3.0,
      duracaoDias: 150,
      imagem: "octano.png"
    }
  ];

  for (const p of produtos) {
    const exists = await prisma.product.findFirst({
      where: { nome: p.nome }
    });

    if (!exists) {
      await prisma.product.create({ data: p });
      console.log(`✅ Produto criado: ${p.nome}`);
    } else {
      console.log(`🔸 Produto já existe: ${p.nome}`);
    }
  }

  /* INVESTIMENTO DE TESTE PARA ADMIN */
  const produtoTeste = await prisma.product.findFirst({
    where: { nome: "Gás Butano" }
  });

  const adminUser = await prisma.user.findUnique({
    where: { phone: adminPhone }
  });

  if (produtoTeste && adminUser) {
    const invExists = await prisma.userProduct.findFirst({
      where: {
        userId: adminUser.id,
        productId: produtoTeste.id
      }
    });

    if (!invExists) {
      await prisma.userProduct.create({
        data: {
          userId: adminUser.id,
          productId: produtoTeste.id,
          investido: produtoTeste.valorMinimo,
          rendimentoAcumulado: 0
        }
      });

      console.log("✅ Investimento de teste criado para admin (Gás Butano).");
    } else {
      console.log("🔸 Investimento de teste já existe.");
    }
  }

  /* BANCOS DA EMPRESA (6) */
  await prisma.bancoEmpresa.createMany({
    data: [
      {
        nome: "BAI",
        titular: "Repsol Angola",
        conta: "AO060040000000000000001",
        endereco: "Luanda"
      },
      {
        nome: "BFA",
        titular: "Repsol Angola",
        conta: "AO060050000000000000002",
        endereco: "Luanda"
      },
      {
        nome: "BIC",
        titular: "Repsol Angola",
        conta: "AO060060000000000000003",
        endereco: "Luanda"
      },
      {
        nome: "ATLANTICO",
        titular: "Repsol Angola",
        conta: "AO060070000000000000004",
        endereco: "Luanda"
      },
      {
        nome: "SOL",
        titular: "Repsol Angola",
        conta: "AO060080000000000000005",
        endereco: "Luanda"
      },
      {
        nome: "KEVE",
        titular: "Repsol Angola",
        conta: "AO060090000000000000006",
        endereco: "Luanda"
      }
    ],
    skipDuplicates: true
  });

  console.log("🏦 Bancos da empresa criados/atualizados.");
  console.log("🎯 Seed finalizado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
