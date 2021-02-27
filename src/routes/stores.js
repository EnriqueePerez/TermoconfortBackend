const express = require('express');
const StoresService = require('../services/stores');

// Schemas

//Validation data

function storeApi(app) {
  const router = express.Router();

  app.use('/api/stores', router); //using the route /api/stores by default, like a prefix

  const storesServices = new StoresService();

  router.get('/', async (req, res, next) => {
    try {
      const details = 'ORDER by nombre'; //extra info for query
      await storesServices.getStores(details, (err, results) => {
        if (err) {
          return err;
        }
        res.status(200).send(results);
        console.log('tiendas enviadas');
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = storeApi;
