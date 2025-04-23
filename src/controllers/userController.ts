import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
};

export const assignRoleToUser = async (req: Request, res: Response) => {
  const { userId, roleId } = req.params;

  const userRole = await prisma.userRole.create({
    data: {
      userId: userId,
      roleId: roleId,
    },
  });

  res.json(userRole);
};

export const getUserWithRoles = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userRoles: {
        include: { role: true },
      },
    },
  });

  res.json(user);
};
