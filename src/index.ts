// import express from 'express'
// import usersRoutes from './routes/users.routes'
// const app = express() //Create server
// const PORT = 3000
// //nếu ai đó truy cập //localhost:3000/ thì vào đây
// // app.get('/', (req, res) => {
// //   res.send('Hello World')
// // })
// //truy cập vào routers
// app.use(express.json())
// app.use('/users', usersRoutes)
// //xài middleware cho toàn bộ usersRoutes, bước vào /users là chạy

// //cho app mở cổng đón khách
// app.listen(PORT, () => {
//   console.log(`Project này đang chạy trên localhost: ${PORT}`)
// })
// import express from 'express'
// import userRoutes from './routes/users.routes'
// import databaseServices from './services/database.services'
// // import databaseServices, { run } from './services/database.services'
// const app = express() //Create Server
// const PORT = 4000
// // run() //khi export bên services, thì cái nãy bug, => cần import
// // //Lỡi chào khách hàng

// //tạo ra instance
// databaseServices.connect()
// app.get('/', (req, res) => {
//   res.send('Hello world')
// })
// //
// app.use(express.json())
// app.use('/users', userRoutes)

// //Mở cổng nè
// app.listen(PORT, () => {
//   console.log(`Server đang chạy ở PORT ${PORT}`)
// })
//---------------------------------------------------------------
import express, { Request } from 'express'
import userRouter from './routes/users.routes'
import databaseServices from './services/database.services'
import { query, validationResult } from 'express-validator'
import { error } from 'console'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const app = express() //Create Server
const PORT = 3000
//connect dabase luôn đạt ở đây trước khi
databaseServices.connect()
//test chào khách hàng
app.use(express.json())
// app.get('/hello', query('person').notEmpty().withMessage('Person quey ko đc bỏ trống nha'), (req: Request, res) => {
//   const error = validationResult(req)
//   if (error.isEmpty()) {
//     return res.send(`Hello, ${req.query.person}!!`)
//   }
//   return res.status(400).json({ error: error.array() })
// })
app.get('/', (req, res) => {
  res.send('Hell world')
})
app.use('/users', userRouter) //chia nhỏ các routes //dùng chia các routes cho dễ dùng

//Nơi xử lý lỗi ở đây(ErrorHandler)
app.use(defaultErrorHandler)

//Mỡ cổng
app.listen(PORT, () => {
  console.log(`Server đang chạy ở http://localhost:${PORT}`)
})
