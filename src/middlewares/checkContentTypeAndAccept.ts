import { Request, Response, NextFunction } from 'express'

export const checkContentTypeAndAccept = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const contentType = req.headers['content-type'] // aways use lower case
  const accept = req.headers['accept']

  if (
    (!contentType || !/^application\/json$/gi.test(contentType)) &&
    !/GET/gi.test(req.method) // GETs usually don’t send Content-Type
  ) {
    res.status(406).json({
      message: 'Not Acceptable: Content-Type must be application/json',
    })
    return
  }

  if (
    (!accept || !/^application\/json$/gi.test(accept)) &&
    !/GET/gi.test(req.method) // GETs usually don’t send Content-Type
  ) {
    res.status(406).json({
      message: 'Not Acceptable: Accept header must be application/json',
    })
    return
  }

  next()
}
