import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './auth/routes';
// Example of how to use auth middleware for protected routes
// import { authenticateUser } from './shared/middleware/authMiddleware';
// import listingRoutes from './listings/routes';

let app = express();
let PORT = process.env.PORT || 4500;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
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

// Example of protected domain routes (uncomment when implementing domains)
// app.use('/api/listings', authenticateUser, listingRoutes);
// app.use('/api/feed', authenticateUser, feedRoutes);
// app.use('/api/profile', authenticateUser, profileRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
