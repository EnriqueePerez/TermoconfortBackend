const mysql = require('mysql');
const { config } = require('../config/index');
const parsingValues = require('../utils/preparingData');

// const errorHandler = require('../utils/middlewares/errorHandlers');

// const connection = mysql.createConnection({
//   host: config.dbHost,
//   user: config.dbUser,
//   password: config.dbPassword,
//   database: config.dbName,
// });

class mySqlLib {
  constructor() {
    this.client = mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
    }); //Creating the connection to db
    this.dbName = config.dbName; //Passing the dbName to the class
  }

  connect() {
    if (!mySqlLib.connection) {
      //Check if there is an active connection already
      mySqlLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err); //If error in connection, then reject promise
          } else {
            console.log('Connected succesfully to MySQL');
            // console.log(this.client);
            resolve(this.client);
          }
        });
      });
    }
    return mySqlLib.connection; //If a connection exists, return it
  }

  //Setting general functions
  getAll(table, details, callback) {
    return this.connect()
      .then((db) => {
        return db.query(`SELECT * FROM ${table} ${details}`, callback);
      })
      .catch((err) => {
        throw err;
      });
  }

  async create(table, data, callback) {
    const query = await this.connect()
      .then((db) => {
        return db.query(`INSERT INTO ${table} VALUES (?);`, data, callback);
      })
      .catch((err) => {
        throw err;
      });
    return query;
  }

  async createWithValidation(table, data, callback) {
    //Establishing connection with db
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `CALL validating${table}(${'?, '.repeat(15).concat('?')});`,
          data,
          callback
        );
      })
      .catch((err) => {
        throw err;
      });
    return query;
  }

  async createOperationData(table, data, callback) {
    //Establishing connection with db
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `CALL validating${table}(${'?, '.repeat(15).concat('?')});`,
          data,
          callback
        );
      })
      .catch((err) => {
        throw err;
      });
    return query;
  }

  async updateData(table, data, callback) {
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `UPDATE ${table} 
      SET comentarios = ?, aprobado= ?, presion_arranque= ?, presion_paro = ?, presion_succion = ?, resistencia_pt1000 = ?, temp_saturacion = ?, temp_tubo = ?, temp_sobrecalentamiento = ?, refrigerante = ?, id_usuario = ?, temp_ambiente = ?, hora_de_registro = ?, fecha_de_registro = ?
      WHERE MONTH(fecha_de_registro) = ? AND YEAR(fecha_de_registro) = ? AND CR = ? AND unidad = ? LIMIT 1`,
          data,
          callback
        );
      })
      .catch((err) => {
        throw err;
      });
    return query;
  }

  async updateOperationData(table, data, callback) {
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `UPDATE ${table} 
      SET comentarios = ?, aprobado= ?, retorno = ?, inyeccion = ?, retorno2 = ?, inyeccion2 = ?, porcentaje_evaporador = ?, ciclos_evaporador = ?, porcentaje_condensador = ?, ciclos_condensador = ?, delta = ?, id_usuario = ?, hora_de_registro = ?, fecha_de_registro = ?
      WHERE MONTH(fecha_de_registro) = ? AND YEAR(fecha_de_registro) = ? AND CR = ? AND unidad = ? LIMIT 1`,
          data,
          callback
        );
      })
      .catch((err) => {
        throw err;
      });
    return query;
  }

  async updatePassword(table, pass, email, callback) {
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `UPDATE ${table}
        SET password = '${pass}' WHERE email='${email}'`,
          callback
        );
      })
      .catch((err) => {
        throw err;
      });
    return query;
  }

  //get?
  //create?
  //update?
  //delete?
}

module.exports = mySqlLib;
