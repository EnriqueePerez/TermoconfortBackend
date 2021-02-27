const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../services/users');

passport.use(
  new BasicStrategy(async (email, password, done) => {
    //init an new user service
    const userService = new UserService();

    //verifying the user

    try {
      //looking for the user in the db
      await userService.getUser({ email }, (err, results) => {
        if (err) {
          console.log('hubo un error autenticando');
          throw err;
        } else {
          if (results[0] === undefined) {
            console.log('usuario no encontrado');
            return done(boom.unauthorized(), false); //not user found
          } else {
            bcrypt.compare(password, results[0].password).then((match) => {
              if (match) {
                console.log('contraseña correcta');
                delete results[0].password; //deleting the saved password for security
                return done(null, results[0]); //everything ok, send user back without the password
              } else {
                console.log('contraseña incorrecta');
                return done(boom.unauthorized(), false); //password incorrect
              }
            });
          }
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);

// async function Hashed() {
//   const hashedPassword = await bcrypt.hash('contraseñadeprueba', 10);
//   console.log(hashedPassword);
// }
// // $2b$10$OJsDppx.7PVROpdQOMCAS.9W26hu.qLbGQLsn4A5SZinEOOmvKS9q
// Hashed();
