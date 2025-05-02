import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import authRoutes from './routes/auth';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection on startup
testConnection()
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);

// Basic welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Employee Management System API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 