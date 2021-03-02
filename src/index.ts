//Basic express server
const express = require('express');
const cors = require('cors');
const app = express();

//Env variables
const { config } = require('./dotenv');
//importing routes
import { api } from './routes/api';

//TODO:importing errorHandlelers

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
