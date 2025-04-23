import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient();

export const createRole = async (req: Request, res: Response) => {
  const { name } = req.body;
  const role = await prisma.role.create({ data: { name } });
  res.json(role);
};
