const { config } = require('../../dotenv');
const admin = require('firebase-admin');

let connection: any;

export async function connectDB() {
  if (connection) return connection;

  try {
    //Connecting to db
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(config.firebaseCredentials)),
    });

    connection = admin.firestore();
  } catch (error) {
    console.log(error);
  }
  return connection;
}
