import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/CategoryRoute.js';
import productRoutes from './routes/ProductRoutes.js';
import cors from 'cors';
import bargainRouter from './routes/bargainRoutes.js';

dotenv.config();

// Database configuration
connectDB();

// Middlewares
const app = express();

// Configure CORS
const corsOptions = {
  origin: ['https://ieee-megaproject-24.vercel.app'], 
    credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/bargain', bargainRouter);

// Default route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to your server</h1>');
});

// Port and Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on ${port}`.bgCyan.white);
});
