import { ObjectId } from 'mongodb'
import { USER_ROLE, UserVerifyStatus } from '../constants/enums'

//interface dùng để định nghĩa 1 user cần những gì khi tạo ra user
/*interface dùng để mô tả User cần gì để hình thành ra
_id: sẽ tự động có, user ko cần cung cấp id, Optional
name: Optional lun (?)
email: là bắt buộc 
date_of_birth: ? optional

để tạo User chỉ cần 2 thông tin 
*/
interface UserType {
  _id?: ObjectId //optional là ?
  name: string
  email: string
  date_of_birth?: Date
  password: string
  created_at?: Date
  updated_at?: Date //lúc mới tạo chưa có gì thì nên cho bằng create_at
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus

  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional
  role?: USER_ROLE //đây là dạng Enum
}

//class sẽ sử dụng các định nghĩa của interface để tạo user đầy đủ
//thông tin thì mới gữi lên database
export default class User {
  /*Class là nhiệm vụ mô tả User khi lưu trên database
    - Để mà User lưu trên hê thống 
      -Cần mô tả

    --contructer: đổ data vào contructer  
  
  
  */
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus

  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string
  role: USER_ROLE
  //đổ data vào contructor liên quan DB

  constructor(user: UserType) {
    const date = new Date() //tạo này cho ngày created_at updated_at bằng nhau
    this._id = user._id || new ObjectId() // tự tạo id
    this.name = user.name || '' // nếu người dùng tạo mà k truyền ta sẽ để rỗng
    this.email = user.email
    this.date_of_birth = user.date_of_birth || date //nếu đưa date tao dùng date lun,mà ko thì New Date hiện tại
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || '' //Có lấy sài ko có thì để trống
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified

    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
    this.role = user.role || USER_ROLE.User //sao role báo lỗi?
  }
}
