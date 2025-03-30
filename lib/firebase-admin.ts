import admin from "firebase-admin";

let adminAuth: any;
let adminDb: any;

async function initializeAdminSDK() {
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      const serviceAccount = require('../firebase-service-account.json');
      
      const adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://bitebase-3d5f9.firebaseio.com"
      });

      adminAuth = admin.auth(adminApp);
      adminDb = admin.firestore(adminApp);
      console.log("Firebase Admin SDK initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Firebase Admin SDK:", error);
    }
  }
}

initializeAdminSDK();

export const serverAdminAuth = adminAuth;
export const serverAdminDb = adminDb;
