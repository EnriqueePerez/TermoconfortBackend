const { connectDB } = require('../db/dbConnection');

module.exports = {
  getSobrecalentamientos: async () => {
    let sobrecalentamientos: object = {};
    try {
      //connecting to the db
      const db = await connectDB();
      //getting all the collection and saving it in the variable
      const data = await db.collection('sobrecalentamientos').get();
      data.forEach((doc: any) => {
        sobrecalentamientos = doc.data();
        // console.log(doc.id, '=>', doc.data());
      });
    } catch (error) {
      console.log('error en getSobrecalentamientos', error);
    }
    return sobrecalentamientos;
  },
  getEficienciasDeTrabajo: async () => {
    let eficienciasDeTrabajo: object = {};
    try {
      const db = await connectDB();
      const data = await db.collection('EficienciaDeTrabajo').get();
      data.forEach((doc: any) => {
        eficienciasDeTrabajo = doc.data();
      });
    } catch (error) {
      console.log('error en getEficienciasDeTrabajo', error);
    }
    return eficienciasDeTrabajo;
  },
  getTiendas: async () => {
    let tiendas: object = {};
    try {
      const db = await connectDB();
      const data = await db.collection('Tiendas').get();
      data.forEach((doc: any) => {
        let id = doc.id;
        let info = doc.data();
        console.log(typeof JSON.stringify(doc.data().ubicacion));
        tiendas = { id, ...info };
        console.log(tiendas);
      });
    } catch (error) {
      console.log('error en getTiendas', error);
    }
    return tiendas;
  },
};
