const boom = require('@hapi/boom');
const { config } = require('../../config/index');

function withErrorStack(error, stack) {
  if (config.dev === 'development') {
    return { ...error, stack }; //destructuring error because it has multiple values
  }

  return error;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next(err); //logging error on console and pass it to the next middleware
}

function wrapErrors(err, req, res, next) {
  //If the error is not a boom type error, then pass 500 internal error status
  if (!err.isBoom) {
    next(boom.badImplementation(err)); //500
  }

  next(err); //If it is a boom error, pass to the error middlewares
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err; //Getting what we need from err body

  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack)); //Preparing the error depending on the enviroment
} //Check documentation to see the structure of a boom error

module.exports = { logErrors, wrapErrors, errorHandler };
