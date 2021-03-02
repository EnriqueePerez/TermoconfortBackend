const queries = require('./queries');
const specialTypes = require('./specialTypesResolvers');

module.exports = {
  Query: queries,
  ...specialTypes,
};
