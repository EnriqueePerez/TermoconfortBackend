//Basic express server
const express = require('express');
const cors = require('cors');
const app = express();

//TODO:Env variables

//TODO:importing routes
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

//TODO:adding routes
api(app);

//TODO:Catching 404 error
//TODO:Error middlewares

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
