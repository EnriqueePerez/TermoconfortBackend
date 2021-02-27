const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const boom = require('@hapi/boom');

const UserService = require('../../services/users');
const { config } = require('../../config/index');

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: cookieExtractor,
    },
    async (tokenPayload, done) => {
      const usersService = new UserService();

      try {
        await usersService.getUser(
          { email: tokenPayload.email },
          (err, results) => {
            if (err) {
              boom.internal(err);
            } else {
            }
            if (results[0] === undefined) {
              //user not found
              return done(boom.unauthorized(), false);
            } else {
              delete results[0].password; //deleting the saved password for security
              return done(null, results[0]); //everything ok, send user back without the password
            }
          }
        );
      } catch (err) {
        return done(err);
      }
    }
  )
);
