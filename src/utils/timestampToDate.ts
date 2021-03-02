const firebase = require('firebase-admin');
const { Timestamp } = firebase.firestore;

export default function timestampToDate({ fecha_hora }): String {
  //getting the properties of the timestamp
  const { _seconds, _nanoseconds } = fecha_hora;

  //parsing the timestamp to Date
  const parsedDate: Date = new Timestamp(_seconds, _nanoseconds).toDate();

  //parsing the Date into a string
  const stringDate: String = parsedDate.toJSON();

  return stringDate;
}
