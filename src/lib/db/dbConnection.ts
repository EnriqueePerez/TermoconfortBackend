import { config } from '../../dotenv';
import admin from 'firebase-admin';

let connection: any;

export async function connectDB() {
  if (connection) return connection;

  try {
    //Connecting to db
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(config.firebaseCredentials as string)
      ),
    });

    connection = admin.firestore();
  } catch (error) {
    console.log(error);
  }
  return connection;
}
