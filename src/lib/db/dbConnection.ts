import { config } from '../../dotenv';
import admin from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';

let dbConnection: Firestore;
let authConnection: admin.auth.Auth;

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(config.firebaseCredentials as string)
  ),
});

export async function connectDB() {
  if (dbConnection) return dbConnection;

  try {
    //Connecting to db
    dbConnection = admin.firestore();
  } catch (error) {
    console.log('error en connectDB', error);
  }
  return dbConnection;
}

export async function connectAuth() {
  if (authConnection) return authConnection;

  try {
    //Connecting to auth admin
    authConnection = admin.auth();
  } catch (error) {
    console.log('error en connectAuth', error);
  }
  return authConnection;
}
