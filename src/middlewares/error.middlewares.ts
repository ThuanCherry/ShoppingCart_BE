import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '../constants/httpStatus'
import { omit } from 'lodash'
import { ErrorWithStatus } from '../models/Errors'

//Nơi xử lý lỗi ở đây(ErrorHandler)
export const defaultErrorHandler = (
  err: any, //
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //err: lỗi error là có thể bất cứ lỗi nào
  //ko lường trước đc
  //Nếu là lổi do mình tạo ra thì nó là ErrorWithStatus và có status

  //lỗi về đây sẽ có lỗi ErrorWithStaus
  // console.log('lỗi nè' + err.message)

  if (err instanceof ErrorWithStatus) {
    return res
      .status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR) //
      .json(omit(err, ['status']))
    //               Lỗi 500, lỗi ko biết trước đc
  }
  //nếu là lỗi khác thì phải đưa các properties và enumerable true
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  //ko đi đc fori
  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR) //
    .json(omit(err, ['stack']))
  //mỗi lần tìm lỗi thì json(err)
}
