// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../models/user';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authorize = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Missing or invalid token' });
     return
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.secret);
    console.log(9999926, decoded)
    req.user = decoded as User;
    next();
  } catch (err) {
     res.status(401).json({ message: 'Unauthorized access' });
     return
  }
};
