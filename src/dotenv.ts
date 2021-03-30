require('dotenv').config();

export const config = {
  port: process.env.PORT,
  firebaseCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  frontendUrl: process.env.FRONTEND_URL,
};
