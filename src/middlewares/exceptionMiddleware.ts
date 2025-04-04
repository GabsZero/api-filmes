import { NextFunction, Request, Response } from "express"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("maoe")
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)

  const responseBody = {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  }

  console.error("Error: ", err)

  res.json(responseBody)
}

