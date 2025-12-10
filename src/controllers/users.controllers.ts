// // import { NextFunction, Request, Response } from 'express'

import { NextFunction, Request, Response } from 'express'
import userService from '../services/users.services'
import { validationResult } from 'express-validator'
import { LoginReqBody, RegisterReqBody } from '../models/request/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import { ErrorWithStatus } from '../models/Errors'
import HTTP_STATUS from '../constants/httpStatus'
import { USERS_MESSAGES } from '../constants/messages'
// import { NextFunction, Request, Response } from 'express'
// import databaseServices from '../services/database.services'

// // export const loginController = (req: Request, res: Response, next: NextFunction) => {
// //   //call services để lấy data kiểm tra
// //   const { email, password } = req.body
// //   if (email != 'giathuan@gmail.com' || password != 'WearepiedTeam') {
// //     return res.status(401).json({
// //       msg: 'Unauthenticated'
// //     })
// //   }
// //   //đóng gói kiện

// //   return res.status(200).json({
// //     msg: 'Login Successfull'
// //   })
// //   //request và response ở middleware và controller giống nhau, vì nó đi cùng trến 1 /login
// // }
// export const loginController = (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body
//   if (email != 'Giathuan@gmail.com' || password != '112233') {
//     return res.status(401).json({
//       msg: 'Unthorized'
//     })
//   }
//   return res.status(200).json({
//     msg: 'Login Success'
//   })
// }
//---------------------------------------------------------------
// export const loginController = (req: Request, res: Response, next: NextFunction) => {
//   //1.call services để dữ liệu ở database req.body
//   const { email, password } = req.body
//   //2.Kiểm tra email ở database, và passoword đúng sai
//   if (email != 'giathuan@gmail.com' || password != '12345') {
//     return res.status(400).json({
//       msg: 'Unthenticated'
//     })
//   }
//   //đóng gói kiện
//   return res.status(200).json({
//     msg: 'Login Successfull'
//   })
// }
export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>, //
  res: Response
) => {
  // throw new Error('ahihi')
  //code vào đc đây data truyền lên oke
  //body có email và passsword, chỉ cần check đúng hay không?
  const result = await userService.login(req.body) //hàm login chưa code
  //gữi result cho client
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result // access và refesh để nó truy cập
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  //cách lấy ParamsDictionary Ctrl Request: kiếm ParamsDictionary
  //Ctrl ParamsDictionary => Copy path: file đó rồi import ra giữ lại
  //express-serve-static-core
  res: Response,
  next: NextFunction
) => {
  // try {
  //   throw new Error('Lỗi chà bá')
  // } catch (error) {
  //   next(error)
  // }

  // == throw
  //mình . ko ra gì hết, là mình chưa định nghĩa => Mình muốn bấm tới đâu xổ tới đó, mới là kỹ sư mạnh
  //Tôi muốn định nghĩa req, thì vào models
  //Định nghĩa body, mún định nghĩa thằng thứ 3, ReqBody thì giữ thằng 1 và 2
  //----------------------------------------------------------------------------
  //Nó lưu lỗi vào trong Request
  //Mình phải khưi lỗi ra xem
  // const error = validationResult(req)
  // if (!error.isEmpty()) {
  //   return res.status(400).json({
  //     msg: 'register failer',
  //     error: error.mapped() //những cái cùng nhau nó nén lại đẹp hơn
  //   })
  // }

  try {
    //1.kiểm tra tính đúng của dữ liệu có liên quan đến database
    // ****ở controller, data đã sạch và đủ rồi****
    //-Kiểm tra email mà đã có người sử dụng chưa?
    const isExisted = await userService.checkEmailExist(req.body.email)
    if (isExisted) {
      // const errorCustom = new Error('Email has been used')
      // Object.defineProperty(errorCustom, 'message', {
      //   enumerable: true
      // })
      // throw errorCustom
      /*
      new Error {
        status: HTTP_STATUS
        message:
      }

      */

      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS
      })
    }
    //xuống catch(đóng gói error rồi)
    //Bộ cờ có error stack, name, message,
    //thuộc tính enumberable: false, ko hiện thị đc

    //-tạo user mới trên database(connect tới collection hay table users)
    const result = await userService.register(req.body) //cái này biết bên trong body có gì á
    //lấy thông tin cung cấp
    //trong quá trình bọc lại sẽ xãy ra bug, nên bọc try()catch
    //tai sao nhận result, vì userService có return result á, vậy hứng result
    //4.respone đóng gói kết quả

    return res.status(HTTP_STATUS.OK).json({
      msg: USERS_MESSAGES.REGISTER_SUCCESS,
      result
    })
  } catch (error) {
    // return res.status(400).json({
    //   msg: 'Register is failed',
    //   error
    // })
    next(error)
  }
} //Nó lưu lỗi vào trong Request

/*
  middleware, và controller là hacker sẽ nhìn thấy 
  database hacker ko thấy

  chúng ta cần tạo userService ngăn cách database 
  */
//milddreware: kiểm dúng ký tự đặc biệt ko, có @ ko,

//ISO8601 : lấy console trên Browser á
//new Date(date của bạn).toISOString()

/*
Client(khi bị hack, liên quan Client)          server                   database
userID: ahihi                                                            userID: ahihi
pass: iamgay                                 mã hóa password(dasdaf)     pass: iamgay(dasdaf)   
                    mã hóa 1 chiều                                 mã hóa 1 chiều  

hacker: 
userId: ahihi
password: dasdaf                       

 */
