//Adding time and date to the values
const dateFormat = require('../utils/dateFormat');

function parsingInsertedValues(values) {
  const dateAndTime = dateFormat(); //Getting the formatted date and time

  values.time = dateAndTime.time;
  values.date = dateAndTime.date;

  const onlyValues = Object.values(values); //Extracting the values from the object
  // console.log(onlyValues);
  const parsedValues = onlyValues.map((i) => i.toString()); //Parsing the values to string to avoid errors
  return parsedValues;
}

function parsingUpdatedValues(values) {
  const dateAndTime = dateFormat();

  const cr = values.CR;
  const unidad = values.unidad;
  // console.log(cr, unidad);

  delete values.CR;
  delete values.unidad;

  values.time = dateAndTime.time;
  values.date = dateAndTime.date;
  values.month = dateAndTime.month;
  values.year = dateAndTime.year;
  values.CR = cr;
  values.unidad = unidad;

  // console.log(values);

  const onlyValues = Object.values(values);
  // console.log(onlyValues);
  const parsedValues = onlyValues.map((i) => i.toString());
  return parsedValues;
}

module.exports = { parsingInsertedValues, parsingUpdatedValues };
