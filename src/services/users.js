const mySqlLib = require('../db/mySqlLib');
const generatePassword = require('password-generator');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

class UserService {
  constructor() {
    this.table = 'users';
    this.mySQL = new mySqlLib();
  }

  //looking for the user in the db
  async getUser({ email }, callback) {
    const user = await this.mySQL.getAll(
      this.table,
      `WHERE email='${email}'`,
      callback
    );
    return user;
  }

  async createUser({ user }, callback) {
    let { name, email } = user;
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.mySQL.create(
      this.table,
      { name, email, password: hashedPassword },
      callback
    );

    return { createdUser, password };
  }

  async changePass(email, newPass, callback) {
    const hashedPassword = await bcrypt.hash(newPass, 10);
    const changedPass = this.mySQL.updatePassword(
      this.table,
      hashedPassword,
      email,
      callback
    );
    return changedPass;
  }

  //deleteUser??
}

module.exports = UserService;
