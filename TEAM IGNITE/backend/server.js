import express from 'express'
import colors from "colors"
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/CategoryRoute.js"
import productRoutes from "./routes/ProductRoutes.js"
import cors from "cors"
import bargainRouter from './routes/bargainRoutes.js';

dotenv.config();


//database config
connectDB()

//middle wares
const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
app.use('/api/v1/bargain', bargainRouter);



app.get('/',(req,res)=>{
    res.send("<h1>welcome to your server</h1>")
})

const port = process.env.PORT||8080;

app.listen(port, () =>{
    console.log(`server running on ${port}`.bgCyan.white);
})