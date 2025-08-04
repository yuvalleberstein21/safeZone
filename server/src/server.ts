import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import pool from './db/db';
import authRoutes from './routes/auth';
import reportRoutes from './routes/reports';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Test route
pool
  .query('SELECT NOW()')
  .then((res) => console.log('📦 DB connected! Time:', res.rows[0].now))
  .catch((err) => console.error('❌ DB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/admin', adminRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
