import { createHash } from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
//hàm mã hóa nội dung bất kỳ thành sha256
function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex') //16
}

//hàm mã hóa mật khẩu tiêu chuẩn theo sha256

export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET) //kết hợp password của user: + "mật khẩu bí mật của mình"
}
//tránh mã hóa password dễ đoán
