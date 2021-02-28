//Basic express server
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();

//Env variables
const { config } = require('./dotenv');
//importing routes
import { api } from './routes/api';

//TODO:importing errorHandlelers

//Connecting to db
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(config.firebaseCredentials)),
});
const db = admin.firestore();

//config cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    // credentials: true //enable when auth is ready
  })
);

// body-parser json
app.use(express.json());

//adding routes
api(app);

//TODO:Catching 404 error
//TODO:Error middlewares

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});

async function getData(): Promise<void> {
  try {
    const tiendas = await db.collection('Tiendas').get();
    tiendas.forEach((doc: any) => {
      console.log(doc.data());
      // console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.log(error);
  }
}
getData();
