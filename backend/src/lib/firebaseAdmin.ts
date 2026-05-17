import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import type { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../firebase-service-account.json';

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
});

// Initialize services
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();

// Verify ID token function
export const verifyIdToken = async (token: string) => {
  return await auth.verifyIdToken(token);
};

export default { db, storage, auth, verifyIdToken };
