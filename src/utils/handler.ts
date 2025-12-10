//hàm wapperAsync biến những hàm async
//thành hàm có cấu trúc try catch  + next
import { NextFunction, Request, RequestHandler, Response } from 'express'

export const wapperAsync = (func: RequestHandler) => {
  //RequestHandler là (req, res, next)
  //mục đích là return hàm khác, có cấu trúc try catch next
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
