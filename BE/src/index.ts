import e from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import bookRoutes from "./routes/book.routes.js";
import borrowRoutes from "./routes/borrow.routes.js"
// import { Request,Response } from "express";
import reportRoutes from './routes/report.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app= e()


// cookieParser
app.use(cors({
    origin:process.env.FE_URL,
    credentials:true,
}))

app.use(cookieParser());


app.use(e.json());
app.use('/api/books',bookRoutes);
app.use('/api/borrow',borrowRoutes);
app.use('/api/reports',reportRoutes);
app.use('/api/admin',userRoutes);


app.listen(process.env.PORT,()=>{
    console.log('Server runs successfully');
    
})