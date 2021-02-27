const express = require('express');
const DataService = require('../services/data');

function addInfo(app) {
  const router = express.Router();

  app.use('/api/data', router); //using the route /api/data by default, like a prefix

  const dataServices = new DataService();

  router.post('/', async (req, res, next) => {
    try {
      console.log(req.body);
      const creatingData = await dataServices.createData(
        req.body,
        (err, results) => {
          if (err) {
            next(err);
          } else {
            // console.log(results.affectedRows);
            // console.log(results.length);
            if (!results.affectedRows) {
              res.status(409).send('dato repetido');
              // console.log('dato repetido');
            } else {
              console.log(results);
              res.status(201).send('dato insertado correctamente');
              // console.log('dato insertado correctamente');
            }
          }
        }
      );
    } catch (err) {
      console.log('Pasando a errorMiddleware...');
      next(err);
    }
  });

  router.put('/', async (req, res, next) => {
    try {
      console.log(req.body);
      const updatingData = await dataServices.updateData(
        req.body,
        (err, results) => {
          if (err) {
            next(err);
          } else {
            // console.log(results);
            res.status(202).send('tabla 1 actualizada correctamente');
          }
        }
      );
    } catch (err) {
      next(err);
    }
  });

  router.post('/secondary', async (req, res, next) => {
    try {
      const creatingDataSecondary = await dataServices.createDataSecondary(
        req.body,
        (err, results) => {
          if (err) {
            next(err);
          } else {
            // console.log(results.affectedRows);
            // console.log(results.length);
            if (!results.affectedRows) {
              res.status(409).send('dato repetido');
              // console.log('dato repetido');
            } else {
              console.log(results);
              res.status(201).send('dato insertado correctamente');
              // console.log('dato insertado en tabla 2 correctamente');
            }
          }
        }
      );
    } catch (err) {
      next(err);
    }
  });

  router.put('/secondary', async (req, res, next) => {
    try {
      const updatingDataSecondary = await dataServices.updateDataSecondary(
        req.body,
        (err, results) => {
          if (err) {
            next(err);
          } else {
            // console.log(results);
            res.status(202).send('tabla 2 actualizada correctamente');
          }
        }
      );
    } catch (err) {
      next(err);
    }
  });
}

module.exports = addInfo;
