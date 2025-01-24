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
connectDB();

const app = express();

const corsOptions = {
  origin: ['https://ieee-megaproject-24.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.options('*', cors(corsOptions));

// Root route to print "hello"
app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/bargain', bargainRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on ${port}`.bgCyan.white);
});

export default app;