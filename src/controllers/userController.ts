import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import {
  allUsersResponseSchema,
  userResponseSchema,
} from '../validations/userSchema';
import { ValidationError } from 'yup';

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

export const getAllUsersWithRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    const transformedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      userRoles: user.userRoles.map(({ role }) => ({
        id: role.id,
        name: role.name,
      })),
    }));

    await allUsersResponseSchema.validate(transformedUsers, {
      strict: true,
      abortEarly: false,
    });

    res.json(transformedUsers);
  } catch (err) {
    if (err instanceof ValidationError) {
      res
        .status(500)
        .json({
          message: 'Invalid response structure',
          errors: err.errors
        });
    }

    next(err);
  }
};

export const getUserWithRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Flattern the user object
    const transformedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      userRoles: user.userRoles.map(({ role }) => ({
        id: role.id,
        name: role.name,
      })),
    };

    const validationResult = await userResponseSchema.validate(
      transformedUser,
      { strict: true },
    );

    res.json(transformedUser);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(500).json({
        message: 'Invalid response structure',
        errors: err.errors,
      });
      return;
    }

    next(err);
  }
};
