import { Request, Response } from 'express';
import { verifyIdToken, auth } from '../lib/firebaseAdmin';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, displayName } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ 
        success: false, 
        error: { message: 'Email and password are required' } 
      });
      return;
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: displayName || undefined,
      emailVerified: false
    });

    // Return user data (without sensitive info)
    const user = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || email.split('@')[0],
      createdAt: userRecord.metadata.creationTime
    };

    res.status(201).json({ 
      success: true, 
      data: { user } 
    });
    return;
  } catch (error: any) {
    console.error('Register error:', error);
    
    // Handle Firebase-specific errors
    if (error.code === 'auth/email-already-exists') {
      res.status(400).json({ 
        success: false, 
        error: { message: 'Email already exists' } 
      });
      return;
    } else if (error.code === 'auth/invalid-email') {
      res.status(400).json({ 
        success: false, 
        error: { message: 'Invalid email address' } 
      });
      return;
    } else if (error.code === 'auth/weak-password') {
      res.status(400).json({ 
        success: false, 
        error: { message: 'Password should be at least 6 characters' } 
      });
      return;
    } else {
      res.status(500).json({ 
        success: false, 
        error: { message: 'Internal server error' } 
      });
      return;
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ 
        success: false, 
        error: { message: 'Email and password are required' } 
      });
      return;
    }

    // Note: With Firebase Auth, we don't verify passwords on the server directly
    // Instead, the client should sign in with Firebase and send the ID token
    // For this implementation, we'll expect the client to handle Firebase sign-in
    // and send us the ID token to verify
    
    // In a production app, you would:
    // 1. Have the client sign in with Firebase SDK (client-side)
    // 2. Send the ID token to your backend
    // 3. Verify the ID token with Firebase Admin SDK
    // 4. Return any additional user data from your database if needed
    
    // For now, we'll simulate by expecting a token in the body (not ideal for production)
    // But to demonstrate the flow, let's check if we have a token to verify
    const { token } = req.body;
    
    if (!token) {
      // If no token provided, return error asking client to use Firebase SDK
      res.status(400).json({ 
        success: false, 
        error: { message: 'Please use Firebase client SDK to sign in and send ID token' } 
      });
      return;
    }

    // Verify the ID token
    const decodedToken = await verifyIdToken(token);
    
    // Get additional user data if needed from your database
    // For now, we'll return the decoded token data
    const user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name || decodedToken.email?.split('@')[0] || '',
      // Add other fields as needed
    };

    res.status(200).json({ 
      success: true, 
      data: { 
        user,
        // In a real app, you might generate your own session token or just use the Firebase token
        firebaseToken: token 
      } 
    });
    return;
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.code === 'auth/invalid-id-token') {
      res.status(401).json({ 
        success: false, 
        error: { message: 'Invalid ID token' } 
      });
      return;
    } else if (error.code === 'auth/id-token-expired') {
      res.status(401).json({ 
        success: false, 
        error: { message: 'ID token has expired' } 
      });
      return;
    } else {
      res.status(500).json({ 
        success: false, 
        error: { message: 'Internal server error' } 
      });
      return;
    }
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // With Firebase Auth, logout is primarily handled client-side
  // You could implement token revocation or blacklisting if needed
  res.status(200).json({ 
    success: true, 
    data: { message: 'Logged out successfully' } 
  });
  return;
};

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
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
    
    res.status(200).json({ 
      success: true, 
      data: { 
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        // Add any other claims you need
      } 
    });
    return;
  } catch (error: any) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      success: false, 
      error: { message: 'Invalid token' } 
    });
    return;
  }
};
