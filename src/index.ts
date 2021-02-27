//Basic express server
const express = require('express');
const cors = require('cors');
const app = express();

// env variables
const { config } = require('./src/config/index');

// importing routes
const storeApi = require('./src/routes/stores');
const addInfo = require('./src/routes/addInfo');
const auth = require('./src/routes/auth');
const operationInfo = require('./src/routes/operationInfo');

//importing error handler
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./src/utils/middlewares/errorHandlers');
const notFoundHandler = require('./src/utils/middlewares/notFoundHandler');

//configuring cors
app.use(
  cors({
    origin: config.clientIp,
    credentials: true,
  })
);

//body parser
app.use(express.json());

//routes
storeApi(app);
addInfo(app);
operationInfo(app);
auth(app);

// Catching 404 error
app.use(notFoundHandler);

// error middlewares
app.use(logErrors); //log error on console
app.use(wrapErrors); // managing if it is a boom error or not
app.use(errorHandler); //Sending the error to client

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});

// const app = require('./src/config/server');
// require('./src/routes/router')(app);

// app.listen(app.get('port'), () => {
//   console.log('App corriendo en puerto', app.get('port'));
// });
