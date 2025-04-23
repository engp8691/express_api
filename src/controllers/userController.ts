import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { PrismaClient } from '../generated/prisma';
import {
  allUsersResponseSchema,
  userResponseSchema,
} from '../validations/userSchema';
import { ValidationError } from 'yup';
import { User } from '../types/user';

const prisma = new PrismaClient();

const saltRounds = 10;
export const generateHashedString = async (plainText: string) => await bcrypt.hash(plainText, saltRounds);

export const createUser = async (req: Request<{}, {}, Omit<User, 'id'> & { password: string }>, res: Response) => {
  const { name, email, age, password } = req.body;

  const existingUser = await prisma.user.findUnique({where: { email: email }});
  if (existingUser) {
    res.status(409).json({ message: 'User with this email exists' });
      return;
  }

  const user = await prisma.user.create({ data: { name, email, age, hashed_password: await generateHashedString(password) } });

  res.json({...user, hashed_password: undefined});
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
        ...role,
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
        ...role,
      })),
    };

    await userResponseSchema.validate(
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    // console.log(99999142, await generateHashedString(password));

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    })
    console.log(9999153, user)

    if (!user) {
      res.status(404).json({ message: 'User with this email does not exist' });
      return;
    }

    if (
      !(await bcrypt.compare(
        password,
        user.hashed_password
      ))
    ) {
      res.status(401).json({ message: 'Invalid credentials' });
      return
    }

    const token = jwt.sign(
      {
        id: user.id,
        user: {
          email: user.email,
          name: user.name,
          age: user.age,
          userRoles: user.userRoles.map(({ role }) => ({
            ...role,
          })),
        },
      },
      config.secret,
      { expiresIn: '1h' },
    );

    res.json({
      message: 'Login successful',
      token
    })
  } catch (error) {
    next(error);
  }
};
