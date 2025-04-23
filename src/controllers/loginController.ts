import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const saltRounds = 10;

const mockedUsers = [
  {
    id: '258d242e-f365-44ef-a5b6-d9ac7cbd36db',
    email: 'john@tom.com',
    name: 'John Doe',
    age: 24,
    role: 'user',
    hashedPassword: '$2b$10$3mTOZD0P2zxqakCVcV90X.jWC63.hVgl0g.9Jb3T1KHqb.1w5YV3y',
  },
  {
    id: '030831f3-ff5d-4c5f-b9ed-f99b03ca4a05',
    email: 'jane@tom.com',
    name: 'Jane Doe',
    age: 34,
    role: 'administrator',
    hashedPassword: '$2b$10$8SxWwQUhA9QSdOQq9Ksfoe3fncxpQoMyuMgvprTuii2RrYCz3Yo9u',
  },
];

export const generateHashedString = async (plainText: string) =>
  await bcrypt.hash(plainText, saltRounds);

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    // console.log(await generateHashedString(password));

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    const userInmockedUsers = mockedUsers.find((user) => user.email === email);
    if (!userInmockedUsers) {
      res.status(404).json({ message: 'User with this email does not exist' });
      return;
    }

    if (
      !(await bcrypt.compare(
        password,
        userInmockedUsers.hashedPassword,
      ))
    ) {
      res.status(401).json({ message: 'Invalid credentials' });
      return
    }

    const token = jwt.sign(
      {
        id: userInmockedUsers.id,
        user: {
          email: userInmockedUsers.email,
          name: userInmockedUsers.name,
          age: userInmockedUsers.age,
          role: userInmockedUsers.role
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
