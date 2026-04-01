import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import type { AdminLogin, AdminRegister, OtpVerify } from "../types/user.types.js";
import type { Request, Response } from "express";
import {createAccessToken,createRefreshToken} from '../utils/token.js'
import { sendMail } from "../utils/mailer.js";
// import { log } from "console";

const registerAdmin = async (
    req: Request<{}, {}, AdminRegister>,
    res: Response
) => {
    try {
        console.log(1);
        
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        console.log({name,email,password,role});
        
        const existing = await pool.query(
            "SELECT id FROM admins WHERE email = $1",
            [email]
        );
        console.log(2);
        
        
        if (existing.rows.length > 0) {
            return res.status(409).json({
                message: "Admin already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO admins (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
            [name, email, hashedPassword, role]
        );
        console.log(3);
        
        await sendMail({
            to: email,
            subject: "Admin Account Created",
            text: "Your account is ready",
            html: `<h3>Welcome ${name}</h3><p>Your admin account is created</p>`,
        });

        return res.status(201).json({
            success: true,
            message: "Admin created successfully",
            data: result.rows[0],
        });
    } catch (error) {
        console.error("registerAdmin error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const login = async (req: Request<{}, {}, AdminLogin>, res: Response) => {
    try {
        const { email, password } = req.body;

        const existing = await pool.query(
            "SELECT id, name, password_hash FROM admins WHERE email = $1",
            [email]
        );

        if (existing.rows.length === 0) {
            return res.status(409).json({
                message: "Admin Not exists",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            existing.rows[0].password_hash
        );

        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid Credentials" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        const saltRound = Number(process.env.SALT);
        const hashOtp = await bcrypt.hash(otp, saltRound);

        const result = await pool.query(
            `UPDATE admins 
   SET verify_otp = $1, verify_otp_expire_at = NOW() + INTERVAL '5 minutes'
   WHERE email = $2`,
            [hashOtp, email]
        );

        await sendMail({
            to: email,
            subject: "Your OTP from Madurai District Library",
            text: "Verify OTP",
            html: `<h5>Hii ${existing.rows[0].name}!!! </h5><p>Your One Time Password (OTP) is</p><h3>${otp}</h3><p>It will expires in 5 minutes .<br/> Thank you, <br/><strong>GROUP MUSIC</strong></p>`,
        }).catch(console.error);

        console.log("otp sent",otp);
        

        res.status(200).json({
            success: true,
            message: "otp sent to your email",
            email
        });
    } catch (error: any) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};



const verifyOtp=async (req:Request<{},{},OtpVerify>,res:Response)=>{
    try {
        const {otp,email}=req.body;

        const existing = await pool.query(
            "SELECT id, verify_otp, verify_otp_expire_at FROM admins WHERE email = $1 ",
            [email]
        );

        

   

   

        if (existing.rowCount === 0) {
            return res.status(400).json({
                success:false,
                message: "OTP expired or invalid",
            });
        }
        

        const isValid = await bcrypt.compare(otp,existing.rows[0].verify_otp);

        if(!isValid){
            return res.status(400).json({success:false,message:'OTP incorrect'});
        };

        const result = await pool.query(`UPDATE admins SET verify_otp=$1 , verify_otp_expire_at=$2, is_verified=$3 WHERE email = $4 RETURNING id`,[null,null,true,email]);

        const accessToken = createAccessToken({userId:result.rows[0].id});
        const refreshToken = createRefreshToken({userId:result.rows[0].id});

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production"?"none":"lax",
            maxAge:7*24*60*60*1000,
            path:'/api/admin'
        });

        res.status(200).json({success:true,message:'OTP Verified & logged in',token:accessToken})
    } catch (error:any) {
        res.status(500).json({error:'server error when otp check',message:error.message});

    }
}
interface JwtPayload {
    userId: string;
  }

const refresh = async (req: Request, res: Response)=>{
    try {
        const token = req.cookies.refreshToken;
        
        
        if (!token) {
            return res.status(401).json({ message: "No refresh token" });
        }
        
        const decoded = jwt.verify(
            token,
            process.env.REFRESH_SECRET as string
        ) as JwtPayload;
        
       
        if (!decoded?.userId) {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        
       
        
        const result = await pool.query(
            `SELECT id FROM admins WHERE id = $1`,
            [decoded.userId]
        );
        
       
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
       
        const user = result.rows[0];
        
        const newAccessToken = createAccessToken({userId:user.id});
       

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });

    } catch (error:any) {
        return res.status(401).json({
            message: "Invalid refresh token",
            error: error.message,
          });
    }
}

const logout = async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      });
  
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
  
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };


  export {registerAdmin,login,logout,verifyOtp,refresh}