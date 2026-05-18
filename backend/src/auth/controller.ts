import { Request, Response } from 'express';
import { verifyIdToken, auth } from '../lib/firebaseAdmin';

export let register = async (req: Request, res: Response): Promise<void> => {
  try {
    let { email, password, displayName } = req.body;

    let userRecord = await auth.createUser({
      email,
      password,
      displayName: displayName,
      emailVerified: false
    });

    let user = {
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
    
    if (error.code === 'auth/email-already-exists') {
      res.status(400).json({ 
        success: false, 
        error: { message: 'Email already exists' } 
      });
      return;
    }
    else if (error.code === 'auth/invalid-email') {
      res.status(400).json({ 
        success: false, 
        error: { message: 'Invalid email address' } 
      });
      return;
    }
    else if (error.code === 'auth/weak-password') {
      res.status(400).json({ 
        success: false, 
        error: { message: 'Password should be at least 6 characters' } 
      });
      return;
    }
    else {
      res.status(500).json({ 
        success: false, 
        error: { message: 'Internal server error' } 
      });
      return;
    }
  }
};

export let login = async (req: Request, res: Response): Promise<void> => {
  try {
    let { email, password, token } = req.body;

    let decodedToken = await verifyIdToken(token);
    
    let user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name || decodedToken.email?.split('@')[0] || '',
    };

    res.status(200).json({ 
      success: true, 
      data: { 
        user,
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
    }
    else if (error.code === 'auth/id-token-expired') {
      res.status(401).json({ 
        success: false, 
        error: { message: 'ID token has expired' } 
      });
      return;
    }
    else {
      res.status(500).json({ 
        success: false, 
        error: { message: 'Internal server error' } 
      });
      return;
    }
  }
};

export let logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ 
    success: true, 
    data: { message: 'Logged out successfully' } 
  });
  return;
};

export let verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    let token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ 
        success: false, 
        error: { message: 'No token provided' } 
      });
      return;
    }

    let decodedToken = await verifyIdToken(token);
    
    res.status(200).json({ 
      success: true, 
      data: { 
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      } 
    });
    return;
  } catch (error: any) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      success: false, 
      error: { message: 'Invalid token' } 
    });
  }
};

export let createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    let { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({
        success: false,
        error: { message: 'No ID token provided' }
      });
      return;
    }

    let expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    let sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    res.setHeader('Set-Cookie', `session=${sessionCookie}; Max-Age=${5 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=Lax`);

    res.status(200).json({ 
      success: true, 
      data: { message: 'Session created successfully' } 
    });
    return;
  } catch (error: any) {
    console.error('Session creation error:', error);
    res.status(401).json({
      success: false,
      error: { message: 'Failed to create session: invalid ID token' }
    });
  }
};

export let clearSession = async (req: Request, res: Response): Promise<void> => {
  try {
    let sessionCookie = req.cookies?.session;

    if (sessionCookie) {
      await auth.revokeRefreshTokens(sessionCookie);
    }

    res.setHeader('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax');

    res.status(200).json({
      success: true,
      data: { message: 'Session cleared successfully' }
    });
    return;
  } catch (error: any) {
    console.error('Session clear error:', error);
    res.status(400).json({
      success: false,
      error: { message: 'Failed to clear session' }
    });
  }
};