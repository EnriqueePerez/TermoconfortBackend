require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV,
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  clientIp: process.env.CLIENT_IP,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = { config };
