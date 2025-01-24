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
import path from 'path';

dotenv.config();

// Database configuration
connectDB();

// Express app and CORS configuration
const app = express();

// Specific CORS configuration
const corsOptions = {
  origin: 'https://ieee-megaproject-24.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/bargain', bargainRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

// Default route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to your unrestricted server</h1>');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Port and Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on ${port}`.bgCyan.white);
});

export default app;