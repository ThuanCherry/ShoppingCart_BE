export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}

//enum:thay thế bộ số
export enum USER_ROLE {
  Admin, //0
  Staff, //1
  User //2
}

export enum TokenType {
  //tại sao cần
  //dùng hàm signToken tạo mã màu đen or trắng
  AccessToken, //0
  RefeshToken, //1
  ForgotPasswordToken, //2
  EmailVerificationToken //3
}
