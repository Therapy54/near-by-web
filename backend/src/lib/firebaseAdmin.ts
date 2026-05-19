import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import type { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../firebase-service-account.json';
let adminApp: any;

if (process.env.FIREBASE_USE_EMULATORS === 'true') {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:4200';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:4100';
  adminApp = initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  });
}
else {
  adminApp = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  });
}

export let db = getFirestore();
export let storage = getStorage();
export let auth = getAuth();

if (process.env.FIREBASE_USE_EMULATORS === 'true') {
  db.settings({ host: 'localhost:4200', ssl: false });
}

export let verifyIdToken = async (token: string) => {
  return await auth.verifyIdToken(token);
};

export default { db, storage, auth, verifyIdToken };
