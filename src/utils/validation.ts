import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '../constants/httpStatus'
import { EntityError, ErrorWithStatus } from '../models/Errors'
//ko nhận vào checkSchema, mà là nhận vào kết quả của checkSchema
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) //chạy checkSchema và lưu lỗi torng req
    const error = validationResult(req) //Khưi lỗi ra
    if (error.isEmpty()) {
      return next()
      //nếu ko có lỗi thì qua bước tiếp theo
    }
    //nếu có thì tổng hợp lỗi lại
    const errorObject = error.mapped() //tách ra để độ lại error.mapped()
    //lỗi ban đầu rất xấu quắc
    const entityError = new EntityError({
      errors: {}
    }) //đây là lỗi có cấu trúc đẹp muốn trả về
    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (
        msg instanceof ErrorWithStatus &&
        msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY //422
      ) {
        return next(msg) //ném về cho ErrorHandler
      }
      //đi qua key lỗi xấu
      //với mỗi key xấu, tạo ra lỗi đẹp
      entityError.errors[key] = msg
    }
    return next(entityError)
  }
}
//validation: result của Schema(là lấy RunnableValidationChains<ValidationChain>)
