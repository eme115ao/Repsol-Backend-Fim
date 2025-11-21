// src/routes/referralRoutes.ts
import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

/**
 * LISTAR CONVIDADOS DE UM USUÁRIO
 * GET /api/referral/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const convidados = await prisma.referral.findMany({
      where: { referrerId: id },
      include: {
        referredUser: {
          select: {
            id: true,
            phone: true,
            createdAt: true,
          },
        },
      },
    });

    return res.json(convidados);

  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
