//những req của user
//Định nghĩa những gì User sẽ gửi lên
//Gữi thông qua Body,
export interface RegisterReqBody {
  email: string
  name: string
  password: string
  confirm_password: string
  date_of_birth: string
}
export interface LoginReqBody {
  email: string
  password: string
}
