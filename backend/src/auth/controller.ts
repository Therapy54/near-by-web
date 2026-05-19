import { Request, Response } from 'express';
import { verifyIdToken, auth } from '../lib/firebaseAdmin';
import { query } from '../lib/db';
import { requestId } from '../shared/utils/requestId';

export let register = async (req: Request, res: Response): Promise<void> => {
  try {
    let { email, password, displayName } = req.body;
    let rid = requestId();

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

    // Sync to PostgreSQL
    await query(
      `INSERT INTO "User" (id, firebaseuid, email, displayname, createdat, updatedat) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        user.uid,
        user.uid,
        user.email,
        user.displayName,
        new Date(user.createdAt),
        new Date(user.createdAt)
      ]
    );

    res.status(201).json({
      success: true,
      data: { user },
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    console.error('Register error:', error);

    if (error.code === 'auth/email-already-exists') {
      res.status(400).json({
        success: false,
        data: null,
        error: { code: 'auth/email-already-exists', message: 'Email already exists', details: {} },
        request_id: requestId()
      });
      return;
    } else if (error.code === 'auth/invalid-email') {
      res.status(400).json({
        success: false,
        data: null,
        error: { code: 'auth/invalid-email', message: 'Invalid email address', details: {} },
        request_id: requestId()
      });
      return;
    } else if (error.code === 'auth/weak-password') {
      res.status(400).json({
        success: false,
        data: null,
        error: { code: 'auth/weak-password', message: 'Password should be at least 6 characters', details: {} },
        request_id: requestId()
      });
      return;
    } else {
      res.status(500).json({
        success: false,
        data: null,
        error: { code: 'internal_error', message: 'Internal server error', details: {} },
        request_id: requestId()
      });
      return;
    }
  }
};

export let login = async (req: Request, res: Response): Promise<void> => {
  try {
    let { email, password, token } = req.body;
    let rid = requestId();

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
      },
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    console.error('Login error:', error);

    if (error.code === 'auth/invalid-id-token') {
      res.status(401).json({
        success: false,
        data: null,
        error: { code: 'auth/invalid-id-token', message: 'Invalid ID token', details: {} },
        request_id: requestId()
      });
      return;
    } else if (error.code === 'auth/id-token-expired') {
      res.status(401).json({
        success: false,
        data: null,
        error: { code: 'auth/id-token-expired', message: 'ID token has expired', details: {} },
        request_id: requestId()
      });
      return;
    } else {
      res.status(500).json({
        success: false,
        data: null,
        error: { code: 'internal_error', message: 'Internal server error', details: {} },
        request_id: requestId()
      });
      return;
    }
  }
};

export let logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    data: { message: 'Logged out successfully' },
    error: null,
    request_id: requestId()
  });
  return;
};

export let verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        data: null,
        error: { code: 'no_token_provided', message: 'No token provided', details: {} },
        request_id: rid
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
      },
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      data: null,
      error: { code: 'invalid_token', message: 'Invalid token', details: {} },
      request_id: requestId()
    });
  }
};

export let createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    let { idToken } = req.body;
    let rid = requestId();

    if (!idToken) {
      res.status(400).json({
        success: false,
        data: null,
        error: { code: 'no_id_token', message: 'No ID token provided', details: {} },
        request_id: rid
      });
      return;
    }

    let expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    let sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    let decodedToken = await verifyIdToken(idToken);

    // First try to find user by firebaseUid (from Google token)
    let existingUserResult = await query(
      `SELECT id FROM "User" WHERE firebaseuid = $1`,
      [decodedToken.uid]
    );

    let existingUser = existingUserResult.rows[0];

    // If not found by firebaseUid, try to find by email (in case user registered via email/password first)
    if (!existingUser) {
      let emailResult = await query(
        `SELECT id FROM "User" WHERE email = $1`,
        [decodedToken.email as string]
      );

      existingUser = emailResult.rows[0];

      // If found by email, update their firebaseUid to link the Google account
      if (existingUser) {
        await query(
          `UPDATE "User" SET firebaseuid = $1 WHERE id = $2`,
          [decodedToken.uid, existingUser.id]
        );
      } else {
        // No existing user found by either firebaseUid or email, create new user
        await query(
          `INSERT INTO "User" (id, firebaseuid, email, displayname, createdat, updatedat)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            decodedToken.uid,
            decodedToken.uid,
            decodedToken.email as string,
            decodedToken.name || (decodedToken.email as string).split('@')[0],
            new Date(),
            new Date()
          ]
        );
      }
    }

    res.setHeader('Set-Cookie', `session=${sessionCookie}; Max-Age=${5 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=Lax`);

    res.status(200).json({
      success: true,
      data: { message: 'Session created successfully' },
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    console.error('Session creation error:', error);
    res.status(401).json({
      success: false,
      data: null,
      error: { code: 'invalid_id_token', message: 'Failed to create session: invalid ID token', details: {} },
      request_id: requestId()
    });
  }
};

export let clearSession = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let sessionCookie = req.cookies?.session;

    if (sessionCookie) {
      await auth.revokeRefreshTokens(sessionCookie);
    }

    res.setHeader('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax');

    res.status(200).json({
      success: true,
      data: { message: 'Session cleared successfully' },
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    console.error('Session clear error:', error);
    res.status(400).json({
      success: false,
      data: null,
      error: { code: 'session_clear_failed', message: 'Failed to clear session', details: {} },
      request_id: requestId()
    });
  }
};
