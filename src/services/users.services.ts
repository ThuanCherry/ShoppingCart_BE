import { StringValue } from 'ms'
import { TokenType } from '../constants/enums'
import { LoginReqBody, RegisterReqBody } from '../models/request/User.requests'
import User from '../models/User.schema'
import { hashPassword } from '../utils/crypto'
import { signToken } from '../utils/jwt'
import databaseServices from './database.services'
import { ErrorWithStatus } from '../models/Errors'
import HTTP_STATUS from '../constants/httpStatus'
import { USERS_MESSAGES } from '../constants/messages'

class UserService {
  private signAccessToken(user_id: string) {
    //user_id: là insertId lấy làm chữ ký
    //mã 15p
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken }, //0
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as StringValue } //as StringValue từ ms
    })
  }
  private signRefeshToken(user_id: string) {
    //mã 15p
    return signToken({
      payload: { user_id, token_type: TokenType.RefeshToken }, //0
      options: { expiresIn: process.env.REFESH_TOKEN_EXPIRE_IN as StringValue } //as StringValue từ ms
    })
  }
  //value nào dùng tạo user nên để {}, payload: là data thôi gồm 2 thuộc tính
  async register(payload: RegisterReqBody) {
    //mún đăng kí tài khoản gửi object
    const { email, password } = payload
    const result = await databaseServices.users.insertOne(
      new User({
        //...payload: lấy tất cả trong payload để tạo new user
        ...payload,
        //dùng phương pháp ghi đè
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password) //ghi đè lại password
      })
    )
    //lấy id của user vừa tạo làm access và refesh
    const user_id = result.insertedId.toString()
    //ký access và refesh, mong đợi ký cùng 1 lúc, dùng Promise.all
    const [access_token, refesh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefeshToken(user_id)
    ])
    return {
      access_token,
      refesh_token
    }
  }
  async checkEmailExist(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
  async login(payload: LoginReqBody) {
    //tìm user bằng các email và password đã mã hóa
    const user = await databaseServices.users.findOne({
      ...payload, //
      password: hashPassword(payload.password)
    })
    //nếu ko báo lỗi
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT
      })
    }
    //nếu có thì phải tạo access và refesh từ user_id của user tìm đc
    const user_id = user._id.toString()
    const [access_token, refesh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefeshToken(user_id)
    ])
    return {
      access_token,
      refesh_token
    }
  }
}
//mỗi lần export class, là tạo Object rất phiền
const userService = new UserService()
export default userService
