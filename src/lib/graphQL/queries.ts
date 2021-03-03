const { connectDB } = require('../db/dbConnection');

module.exports = {
  getSobrecalentamientos: async () => {
    let sobrecalentamientos: String[] = [];
    try {
      //connecting to the db
      const db = await connectDB();
      //getting all the collection and saving it in the array
      const data = await db.collection('sobrecalentamientos').get();
      data.forEach((doc: any) => {
        let id = doc.id;
        let info = doc.data();

        //saving the actual data in the array
        sobrecalentamientos.push({ id, ...info });
        // console.log(doc.id, '=>', doc.data());
      });
    } catch (error) {
      console.log('error en getSobrecalentamientos', error);
    }
    return sobrecalentamientos;
  },
  getEficienciasDeTrabajo: async () => {
    let eficienciasDeTrabajo: String[] = [];
    try {
      const db = await connectDB();
      const data = await db.collection('EficienciaDeTrabajo').get();
      data.forEach((doc: any) => {
        let id = doc.id;
        let info = doc.data();
        //Saving the data in the array
        eficienciasDeTrabajo.push({ id, ...info });
      });
    } catch (error) {
      console.log('error en getEficienciasDeTrabajo', error);
    }
    return eficienciasDeTrabajo;
  },
  getTiendas: async () => {
    let tiendas: String[] = [];
    try {
      const db = await connectDB();
      const data = await db.collection('Tiendas').get();
      data.forEach((doc: any) => {
        let id = doc.id;
        let info = doc.data();
        //Saving the actual data in the array
        tiendas.push({ id, ...info });
        // console.log(tiendas);
      });
    } catch (error) {
      console.log('error en getTiendas', error);
    }
    return tiendas;
  },
  getUsuarios: async () => {
    let usuarios: String[] = [];
    try {
      const db = await connectDB();
      const data = await db.collection('Usuarios').get();
      data.forEach((doc: any) => {
        // console.log('logeando la data', doc.data());
        let id = doc.id;
        let info = doc.data();
        //saving the actual data into the array
        usuarios.push({ id, ...info });
        // console.log('logeando usuarios', usuarios);
      });
    } catch (error) {
      console.log('error en getUsuarios', error);
    }
    return usuarios;
  },
};
