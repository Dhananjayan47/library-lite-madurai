import jwt from "jsonwebtoken"

const ACCESS_SECRET= process.env.ACCESS_SECRET as string;
const REFRESH_SECRET= process.env.REFRESH_SECRET as string;



export const createAccessToken=(payload:{userId:string})=>{
    return jwt.sign(payload,ACCESS_SECRET,{expiresIn:'1h'});
}

export const createRefreshToken = (payload:{userId:string})=>{
    return jwt.sign(payload,REFRESH_SECRET,{expiresIn:'7d'});
}
