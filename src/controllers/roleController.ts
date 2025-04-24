import { Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

export const createRole = async (req: Request, res: Response) => {
  const { name } = req.body
  const role = await prisma.role.create({ data: { name } })
  res.json(role)
}

export const deleteRole = async (req: Request, res: Response) => {
  const { roleId } = req.params

  try {
    await prisma.role.delete({
      where: { id: roleId },
    })

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role' })
  }
}
