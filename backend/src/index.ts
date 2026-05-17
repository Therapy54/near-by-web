import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './auth/routes';

let app = express();
let PORT = process.env.PORT || 4500;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: { 
      status: 'OK', 
      timestamp: new Date().toISOString() 
    } 
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: { 
      message: 'Near-By API is running' 
    } 
  });
});

app.use('/api/auth', authRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
