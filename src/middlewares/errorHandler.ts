import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  status?: number
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (/Please make sure your database server is running at/.test(err.message)) {
    res.status(err.status || 500).json({
      message:
        'Database connection error. Please make sure your database server is running.',
    })
    return
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  })
}
