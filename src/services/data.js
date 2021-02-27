const { raw } = require('body-parser');
const mySqlLib = require('../db/mySqlLib');
const parser = require('../utils/preparingData');

class dataService {
  constructor() {
    this.table1 = 'data';
    this.table2 = 'dataSecondary';
    this.table3 = 'OperationData';
    this.mySQL = new mySqlLib();
  }

  async createData(data, callback) {
    //Preparing the data
    const rawValues = data;
    const parsedValues = parser.parsingInsertedValues(rawValues);

    const createdData = await this.mySQL.createWithValidation(
      this.table1,
      parsedValues,
      callback
    );
    return createdData;
  }

  async updateData(data, callback) {
    const rawValues = data;

    const parsedValues = parser.parsingUpdatedValues(rawValues);
    const updateData = await this.mySQL.updateData(
      //change the name to something more specific
      this.table1,
      parsedValues,
      callback
    );
    return updateData;
  }

  async createDataSecondary(data, callback) {
    //Preparing the data
    const rawValues = data;
    const parsedValues = parser.parsingInsertedValues(rawValues);

    const createdDataSecondary = await this.mySQL.createWithValidation(
      this.table2,
      parsedValues,
      callback
    );
    return createdDataSecondary;
  }

  async updateDataSecondary(data, callback) {
    const rawValues = data;

    const parsedValues = parser.parsingUpdatedValues(rawValues);
    const updateData = await this.mySQL.updateData(
      this.table2,
      parsedValues,
      callback
    );
    return updateData;
  }

  async createOperationData(data, callback) {
    const rawValues = data;
    const parsedValues = parser.parsingInsertedValues(rawValues);
    // console.log('estos son los parsedValues', parsedValues);

    const createdData = await this.mySQL.createOperationData(
      this.table3,
      parsedValues,
      callback
    );
    return createdData;
  }

  async updateOperationData(data, callback) {
    const rawValues = data;
    const parsedValues = parser.parsingUpdatedValues(rawValues);
    // console.log('estos son los raw', rawValues);

    const createdData = await this.mySQL.updateOperationData(
      this.table3,
      parsedValues,
      callback
    );
    return createdData;
  }

  //updateData
}

module.exports = dataService;
