import e from "express";
import dotenv from "dotenv"
import cors from "cors"
import { pool } from "./config/db.js";
import bookRoutes from "./routes/book.routes.js";
// import { Request,Response } from "express";

dotenv.config()

const app= e()


// cookieParser
app.use(cors({
    origin:process.env.FE_URL,
    credentials:true,
}))
app.use(e.json());
app.use('/api/books',bookRoutes);
app.listen(process.env.PORT,()=>{
    console.log('Server runs successfully');
    
})