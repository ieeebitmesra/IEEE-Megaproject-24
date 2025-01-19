
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';

import cors from "cors";
import codeRoutes from './routes/code.route.js';

import path from 'path';

dotenv.config();
  
mongoose.connect(process.env.MONGO).then((m)=>{
    console.log('DataBase Connected');
}).catch((e)=>{
    console.log(e);
})

const ___dirname = path.resolve();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors()); 

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/code',codeRoutes);

app.use(express.static(path.join(___dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
  
app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
})

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,message
    }); 
})