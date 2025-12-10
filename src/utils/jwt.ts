//jowt
//jwt.sign(payload, secretOrPrivateKey, [options, callback])
//                  signature           , header

//truyền oject{payload, privateKey, options}
import jwt from 'jsonwebtoken'
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET,
  options = { algorithm: 'HS256' }
}: {
  payload: any //
  privateKey?: string //thích thì lưu ko thì thôi
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey as string, options, function (err, token) {
      if (err) throw reject
      else resolve(token as string)
    })
  })
}

//jwt.sign(): cách kiếm jwt.SignOptions
