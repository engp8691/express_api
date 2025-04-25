import { Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

export const createRole = async (req: Request, res: Response) => {
  const { name } = req.body
  const role = await prisma.role.create({ data: { name } })
  res.json(role)
}

export const getAllRolesWithUsers = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        userRoles: {
          include: {
            user: true,
          },
        },
      },
    })

    const transformedRoles = roles.map((role) => ({
      id: role.id,
      name: role.name,
      userRoles: role.userRoles.map((user) => ({
        userId: user.userId,
        roleId: user.roleId,
        assignedAt: user.assignedAt,
        user: {
          id: user.user.id,
          email: user.user.email,
          name: user.user.name,
        },
      })),
    }))

    res.status(200).json(transformedRoles)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all rols' })
  }
}

export const getRoleWithUsers = async (req: Request, res: Response) => {
  const { roleId } = req.params

  try {
    const role = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        userRoles: {
          include: { user: true },
        },
      },
    })

    if (!role) {
      res.status(404).json({ message: 'Role not found' })
      return
    }

    const transformedRoles = {
      id: role.id,
      name: role.name,
      userRoles: role.userRoles.map((user) => ({
        userId: user.userId,
        roleId: user.roleId,
        assignedAt: user.assignedAt,
        user: {
          id: user.user.id,
          email: user.user.email,
          name: user.user.name,
        },
      })),
    }

    res.status(200).json(transformedRoles)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get role' })
  }
}

export const updateRole = async (req: Request, res: Response) => {
  const { roleId } = req.params

  try {
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    })

    if (!role) {
      res.status(404).json({ message: 'Role not found' })
      return
    }

    const name = await prisma.role.findFirst({
      where: {
        name: req.body.name,
        id: {
          not: roleId,
        },
      },
    })

    if (name) {
      res.status(409).json({ message: 'Role with this name exists' })
      return
    }

    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: {
        name: req.body.name,
      },
    })

    res.status(201).json(updatedRole)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' })
  }
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
