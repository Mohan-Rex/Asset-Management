import jwt from "jsonwebtoken"

let secretKey = "151515234"

export const generateToken = (payload,optional= {}) =>{
    return jwt.sign(payload,secretKey, optional)
}

export const verifyToken = (token)=> {
    return jwt.verify(token,secretKey)

}
