const express = require('express');
const DataService = require('../services/data');

function operationInfo(app) {
  const router = express.Router();

  app.use('/api/operation', router); // using the route /api/operation by default

  const dataServices = new DataService();

  router.post('/', async (req, res, next) => {
    try {
      console.log('este es el request', req.body);

      const creatingData = await dataServices.createOperationData(
        req.body,
        (err, results) => {
          if (err) {
            next(err);
          } else {
            if (!results.affectedRows) {
              res.status(409).send('dato repetido');
            } else {
              console.log(results);
              res.status(201).send('dato insertado correctamente');
            }
          }
        }
      );
    } catch (err) {
      next(err);
    }
  });

  router.put('/', async (req, res, next) => {
    try {
      //   console.log(req.body);
      const updatingData = await dataServices.updateOperationData(
        req.body,
        (err, results) => {
          if (err) {
            next(err);
          } else {
            res.status(202).send('dato actualizado correctamente');
          }
        }
      );
    } catch (err) {
      next(err);
    }
  });
}

module.exports = operationInfo;
