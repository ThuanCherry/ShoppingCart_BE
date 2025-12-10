// import { MongoClient } from 'mongodb'
// import dotenv from 'dotenv'
// dotenv.config()
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wqiwquk.mongodb.net/?appName=Cluster0`

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// class DatabaseServices {
//   private client: MongoClient //prop
//   constructor() {
//     this.client = new MongoClient(uri)
//   }
//   async connect() {
//     try {
//       await this.client.db('shopingCartBE').command({ ping: 1 }) //command: bắn tính hiệu
//       console.log('Pinged your deployment. You successfully connected to MongoDB!')
//     } catch (error) {
//       console.error(error) //.error cho màu đỏ nó đẹp
//       throw error
//       //tại sao? vì file có rất nhiều lỗi, rất khó fix bug,
//     }
//   }
//   //tại aso ko chạy run ở đây
// }

// // const client = new MongoClient(uri) //Người sử dụng Mongo,import { run } from './services/database.services'import { run } from './services/database.services'

// //client là mình, connect to admin

// //tạo instance ở đây và export intance đó ra
// const databaseServices = new DatabaseServices()
// export default databaseServices
//-----------------------------------------------

import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import User from '../models/User.schema'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wqiwquk.mongodb.net/?appName=Cluster0`

const client = new MongoClient(uri)

class DatabaseServices {
  private client: MongoClient //prop
  private db: Db //prop
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(`${process.env.DB_NAME}`)
  }
  async connect() {
    //nhiệm vụ connect đến database thôi, chưa đủ,
    //bắt buộc lấy collection luôn
    try {
      // Connect the client to the server	(optional starting in v4.7)
      // Send a ping to confirm a successful connection
      // await client.db('shopingCartBE').command({ ping: 1 })        //thằng này chưa đc cần setting 1 chút
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error(error) //error ngay sau console cho đẹp
      throw error //rất khó fix bug
    }
  }
  //get collection users
  //tại document,? là do ko biết kiểu data, nó chỉ lấy document, do nó chưa đc định nghĩa
  //chúng ta cần định nghĩa schema User trông như thế nào
  //ta vào folder Models
  get users(): Collection<User> {
    //                          thường thì bug ngay đây, chỉ cần nói nó là
    //                            DB_USERS_COLLECTION as string
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

//tạo instance
const databaseServices = new DatabaseServices()
/*
  method: connect database
  method: get user Collection
  method: get products Collection
  method: get orders Collection
*/
// databaseServices.user.insertOne()
export default databaseServices
