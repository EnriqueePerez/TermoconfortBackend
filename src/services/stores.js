const mySqlLib = require('../db/mySqlLib');

class StoresService {
  constructor() {
    this.table = 'stores';
    this.mySQL = new mySqlLib();
  }

  async getStores(details, callback) {
    const stores = await this.mySQL.getAll(this.table, details, callback);
    return stores;
  }

  //CreateStore?
  //DeleteStore?
}

module.exports = StoresService;
