import { Request, Response, NextFunction } from 'express';
import { auth } from '../../lib/firebaseAdmin';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        displayName: string;
      };
    }
  }
}

export let authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let session = req.cookies?.session;
    
    if (!session) {
      return res.status(401).json({ 
        success: false, 
        error: { message: 'No session cookie provided' } 
      });
    }

    // Verify the session cookie (checkRevoked: true checks against revocation)
    let decodedToken = await auth.verifySessionCookie(session, true /* checkRevoked */);
    
    // Attach user info to request for controllers to use
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email ?? '',
      displayName: decodedToken.name ?? '',
      // Add any other fields you need from the token
    };
    
    next();
  } catch (error: any) {
    console.error('Session verification error:', error);
    return res.status(401).json({ 
      success: false, 
      error: { message: 'Invalid or expired session' } 
    });
  }
};