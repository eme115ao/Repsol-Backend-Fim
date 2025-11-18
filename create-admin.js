import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createAdmin() {
  const phone = "934096717";
  const password = "040397";
  const referralCode = "REPSOL-0001";

  try {
    // Verificar se já existe
    const exists = await prisma.user.findUnique({ where: { phone } });

    if (exists) {
      console.log("Usuário admin já existe. Nada foi criado.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        referralCode,
        isAdmin: true,
      },
    });

    console.log("ADMIN CRIADO COM SUCESSO:");
    console.log(user);
    process.exit(0);

  } catch (error) {
    console.error("Erro ao criar admin:", error);
    process.exit(1);
  }
}

createAdmin();

