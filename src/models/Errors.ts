import HTTP_STATUS from '../constants/httpStatus'

type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
//tạo entityErr: mong muốn của mình

export class ErrorWithStatus {
  status: number
  message: string
  constructor({ status, message }: { status: number; message: string }) {
    //ưu điểm, object, ko cần truyền theo thứ tự
    this.status = status
    this.message = message
  }
}
//EntityError: là object lỗi hiện có mà em mong mún
export class EntityError extends ErrorWithStatus {
  errors: ErrorType
  constructor({
    message = 'Validation Errors',
    errors
  }: {
    message?: string //đừng thiếu dấu  ?
    errors: ErrorType
  }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY }) //new ErrorWithStatus
    this.errors = errors
  }
}
