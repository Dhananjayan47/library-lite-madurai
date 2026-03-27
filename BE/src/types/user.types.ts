export type AdminRegister={
    name:string
    email:string
    password:string
    role:string
}

export type AdminLogin={
    email:string
    password:string
}

export type OtpVerify={
    otp:string,
    email:string
}