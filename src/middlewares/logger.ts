import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, _: Response, next: NextFunction) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);
  next();
};
