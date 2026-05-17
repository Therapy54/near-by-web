import { Request, Response, NextFunction } from 'express';
import { verifyIdToken } from '../lib/firebaseAdmin';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ 
        success: false, 
        error: { message: 'No token provided' } 
      });
      return;
    }

    const decodedToken = await verifyIdToken(token);
    // Attach user info to request
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      success: false, 
      error: { message: 'Invalid token' } 
    });
  }
};

export default { authenticate };
