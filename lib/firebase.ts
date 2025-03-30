import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

// Firebase configuration - Client SDK
const firebaseConfig = {
  apiKey: "AIzaSyBoVa7LlMV9WZkS4TVgMx7SXTn_E2gjt0Q",
  authDomain: "bitebase-3d5f9.firebaseapp.com",
  projectId: "bitebase-3d5f9",
  storageBucket: "bitebase-3d5f9.firebasestorage.app",
  messagingSenderId: "869869191395",
  appId: "1:869869191395:web:0bb2821dfc368800e305d6",
  measurementId: "G-CB8TNELCRL",
}

// Initialize Firebase Client SDK
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Initialize Analytics only in browser environment
let analytics = null
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

// Connect to emulators in development
if (process.env.NODE_ENV === "development") {
  // Uncomment these lines to connect to Firebase emulators during development
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

// Firebase Admin SDK has been moved to firebase-admin.ts to prevent client-side bundling
// of Node.js dependencies. Import serverAdminAuth/serverAdminDb from './firebase-admin' 
// in server-side code only.

export { app, auth, db, storage, analytics }
