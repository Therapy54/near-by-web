import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './auth/routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: { 
      status: 'OK', 
      timestamp: new Date().toISOString() 
    } 
  });
});

// Basic API route structure
app.get('/api', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: { 
      message: 'Near-By API is running' 
    } 
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
