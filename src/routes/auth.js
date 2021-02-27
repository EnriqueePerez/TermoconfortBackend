const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const cookieParser = require('cookie-parser');
const UserService = require('../services/users');

const { config } = require('../config');

require('../utils/auth/basicStrategy');
require('../utils/auth/jwt');

function auth(app) {
  const router = express.Router();

  app.use(cookieParser());
  app.use(express.json());
  app.use('/auth', router);

  const userServices = new UserService();

  router.post(
    '/login',
    passport.authenticate('basic', { session: false }),
    function (req, res, next) {
      if (!req.user) {
        next(boom.unauthorized());
      }

      const { id_usuario, nombre, email, scopes } = req.user;

      //Preparing token with the scope
      const payload = {
        id: id_usuario,
        name: nombre,
        email: email,
        scopes,
      };

      // Signing token
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: '60m',
      });

      // res.setHeader('Access-Control-Allow-Credentials', 'true');

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: 3600000,
          sameSite: 'none',
        })
        .status(202)
        .json({ user: { id: id_usuario, name: nombre } });
    }
  );

  router.post(
    '/verify',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
      console.log(req.user);
      const { id_usuario, nombre } = req.user;
      // console.log(req.headers);
      // console.log(req.cookies);
      res.status(202).json({ user: { id: id_usuario, name: nombre } });
    }
  );

  router.post(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
      // console.log(req.cookies);
      res.clearCookie('token').status(200).end();
    }
  );

  router.post(
    '/changePass',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { email } = req.user;
      const { newPass } = req.body;

      try {
        const changePass = await userServices.changePass(
          email,
          newPass,
          (err, results) => {
            if (err) {
              next(err);
            } else {
              if (results.affectedRows) {
                console.log(results.affectedRows);
                res.status(200).send('done');
              }
            }
          }
        );
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = auth;
