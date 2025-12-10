// import express from 'express'
// import { loginValidator } from '../middlewares/users.middlewares'
// import { loginController } from '../controllers/users.controllers'
// const usersRoutes = express.Router() //tạo router chia nhánh

// /*Login
// path: users/login
// method: POST
// Request: headers body param query
//   headers: người ta cho mật khẩu giữ lại gửi lại cho người ta
//   body: những mật khẩu gửi lên server

// body: {
//   email: String
//   password:String
// }

// loginValidator: ktr email password
// loginController: đóng gói kiện hàng và gửi kết quả

// */
// usersRoutes.post('/login', loginValidator, loginController)

// export default usersRoutes

/*Login mô tả
path: /users/login
method: POST
Request: headers body param query 
  header: nơi lưu thông tin nhạy cảm
  body: {
    email: string
    password: string
  }
  loginValidator
  loginController: xử lý logic 

 */
// import express from 'express'
// import { loginValidator, registerValidator } from '../middlewares/users.middlewares' //Nơi đây dùng bắt lỗi user ko nhập gì
// import { loginController } from '../controllers/users.controllers'
// const userRoutes = express.Router()

// userRoutes.post('/login', loginValidator, loginController)
// /*Register
// path: /users/register
// method:post
// body:{
//   email: string
//   name: string
//   password: string
//   confirm_password: string
//   date_of_birth: ISO8601
// }

// */
// userRoutes.post('/register', registerValidator) //registerController)

// export default userRoutes
/*Login 
Method: POST
path: /users/login
Request: Header body param query?

body{ //gủi lên server
  email: string
  password: string
}
loginValidator: kiểm tra email password
loginController: xử lý logic
 */

import express from 'express'
import { loginValidator, registerValidator } from '../middlewares/users.middlewares'
import { loginController, registerController } from '../controllers/users.controllers'
import { wapperAsync } from '../utils/handler'

const userRouter = express.Router()

userRouter.post('/login', loginValidator, wapperAsync(loginController))
/*Register
path: /users/register
method: POST
Request: body header param query
body{
  email: "string",
  password: "string",
  confirm_password: "string",
  date_of_birthdat: "ISO8601"
  "name": "String"
}viết ra để ktr trường data nào 

*/
userRouter.post(
  '/register',
  registerValidator, //
  wapperAsync(registerController)
) //hacker nhìn cái này nè
//middleware mục đích là validator, dùng công nghệ express-validator
//dùng hàm checkSchema

/*Hê thông này cần gì? Cần sự bảo trì 
middleware dùng checkSchema: validation
  có ktr valid                      middleware khac | controller
  nhưng ko báo lỗi                   Cần validationResult(req) 
                                        res.status(400).json(err)

validate(validation(kết quả checkSchema)){
    return (req, res, next) =>{ Vừa khưi lỗi, bắn ra kiện hàng lun, trả ra middleware(vì có res)
          chạy checkSchema
          Cần validationResult(req) 
          res.status(400).json(err)
    
    }

      
}


*/
export default userRouter
/*Thực tế
      Handler
(req, res, next) => Request Handler (middler | control)
    .then()

(err, req, res, next) => Error Handler
    .catch()

trên thực tiễn errorHandler : chỉ phát sinh ở cuối

*/
