// // import { NextFunction, Request, Response } from 'express-serve-static-core'

// import { NextFunction, Request, Response } from 'express'
// import { checkSchema } from 'express-validator'

// // export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
// //   const { email, password } = req.body
// //   if (!email || !password) {
// //     return res.status(400).json({
// //       msg: 'Email or Password is missing'
// //     })
// //   }
// //   next()
// //   //ở middleware ko ktr email or pass vì liên quan đến database rồi
// // }
// // // tại sao lỗi 500 là lỗi server chưa đọc đc

// export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body
//   if (!email || !password) {
//     return res.status(400).json({
//       msg: 'Email or password missing'
//     })
//   }
//   next()
// }
// export const registerValidator = checkSchema({
//   name: {
//     notEmpty: true,
//     isString: true,
//     trim: true,
//     isLength: {
//       options: {
//         min: 1,
//         max: 100
//       }
//       // errorMessage//: độ dài sai thì sẽ chửi, riêng độ dài
//     }
//   },
//   email: {
//     notEmpty: true,
//     isEmail: true,
//     trim: true
//   },
//   password: {
//     notEmpty: true,
//     isString: true,
//     isLength: {
//       options: {
//         min: 8,
//         max: 50
//       }
//     },
//     isStrongPassword: {
//       options: {
//         minLength: 8,
//         minLowercase: 1,
//         minUppercase: 1,
//         minNumbers: 1,
//         minSymbols: 1
//         // returnScore: false
//         // false : chỉ return true nếu password mạnh, false nếu k
//         // true : return về chất lượng password(trên thang điểm 10)
//       }
//     },
//     errorMessage:
//       'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
//   },
//   confirm_password: {
//     notEmpty: true,
//     isString: true,
//     isLength: {
//       options: {
//         min: 8,
//         max: 50
//       }
//     },
//     isStrongPassword: {
//       options: {
//         minLength: 8,
//         minLowercase: 1,
//         minUppercase: 1,
//         minNumbers: 1,
//         minSymbols: 1
//       }
//     },
//     errorMessage:
//       'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
//   },
//   date_of_birth: {
//     isISO8601: {
//       options: {
//         strict: true,
//         strictSeparator: true
//       }
//     }
//   }
// })
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { ErrorWithStatus } from '../models/Errors'
import HTTP_STATUS from '../constants/httpStatus'
import { USERS_MESSAGES } from '../constants/messages'
// export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
//   //1.nhận variable chứa giá trị từ req.body
//   const { email, password } = req.body
//   //2. xử lý đúng sai varibale ấy
//   if (!email || !password) {
//     return res.status(400).json({
//       msg: 'Email and passowrd is missing!!'
//     })
//   }
//   next()
// }
export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)

// export const registerValidator = validate(
//   checkSchema({
//     //riêng thằng này thì luôn 422, còn ngoài thì dung ErrorWtihStatus
//     name: {
//       notEmpty: true,
//       isString: true,
//       trim: true, //xóa dấu cách thừa
//       isLength: {
//         options: {
//           min: 1,
//           max: 100
//         }
//         // errorMessage//: độ dài sai thì sẽ chửi, riêng độ dài
//       }
//     },
//     email: {
//       notEmpty: true,
//       isEmail: true,
//       trim: true
//     },
//     password: {
//       notEmpty: true,
//       isString: true,
//       isLength: {
//         options: {
//           min: 8,
//           max: 50
//         }
//       },
//       isStrongPassword: {
//         options: {
//           minLength: 8,
//           minLowercase: 1,
//           minUppercase: 1,
//           minNumbers: 1,
//           minSymbols: 1
//           // returnScore: false
//           // false : chỉ return true nếu password mạnh, false nếu k
//           // true : return về chất lượng password(trên thang điểm 10)
//         }
//       },
//       errorMessage:
//         'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
//     },
//     confirm_password: {
//       notEmpty: true,
//       isString: true,
//       isLength: {
//         options: {
//           min: 8,
//           max: 50
//         }
//       },
//       isStrongPassword: {
//         options: {
//           minLength: 8,
//           minLowercase: 1,
//           minUppercase: 1,
//           minNumbers: 1,
//           minSymbols: 1
//         },
//         errorMessage:
//           'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
//       },
//       //tự code ktr confirm_password
//       // custom: {
//       //   options: (value, { req }) => {
//       //     //value là trường value cần ktr: confirm_password
//       //     if (value !== req.body.passoword) {
//       //       throw new Error('Password confirmation does not match passoword') //lưu vào Req
//       //     } else {
//       //       return true
//       //     }
//       //   }
//       // }
//       custom: {
//         options: (value, { req }) => {
//           //value là confirm_password
//           if (value !== req.body.password) {
//             throw new Error('Confirm password must be same password')
//           } else {
//             return true
//           }
//         }
//       }
//     },
//     date_of_birth: {
//       isISO8601: {
//         options: {
//           strict: true,
//           strictSeparator: true
//         }
//       }
//     }
//   })
// )

//registerValidator
export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            // returnScore: false
            // false : chỉ return true nếu password mạnh, false nếu k
            // true : return về chất lượng password(trên thang điểm 10)
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
            }
            return true
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          },
          errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_BE_ISO8601
        }
      }
    },
    ['body']
  )
)
