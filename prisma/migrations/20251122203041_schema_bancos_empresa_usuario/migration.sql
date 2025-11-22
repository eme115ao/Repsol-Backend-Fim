/*
  Warnings:

  - You are about to drop the `Banco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Banco" DROP CONSTRAINT "Banco_userId_fkey";

-- DropTable
DROP TABLE "Banco";

-- CreateTable
CREATE TABLE "BancoEmpresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "titular" TEXT NOT NULL,
    "conta" TEXT NOT NULL,
    "endereco" TEXT,

    CONSTRAINT "BancoEmpresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BancoUsuario" (
    "id" SERIAL NOT NULL,
    "banco" TEXT NOT NULL,
    "titular" TEXT NOT NULL,
    "conta" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BancoUsuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BancoUsuario" ADD CONSTRAINT "BancoUsuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
