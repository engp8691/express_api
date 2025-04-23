import { Request, Response, NextFunction } from 'express'
import { AnySchema } from 'yup'

export const validateBody =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true })
      next()
    } catch (err: any) {
      res.status(400).json({
        message: 'Invalid request body',
        errors: err.inner?.map((e: any) => ({
          path: e.path,
          message: e.message,
        })),
      })
    }
  }
