import { connectDB } from '../db/dbConnection';

export = {
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
    console.log(sobrecalentamientos);
    return sobrecalentamientos;
  },
  getSobrecalentamientoForValidation: async (
    root,
    { storeCR, unit, collection }
  ) => {
    let sobrecalentamiento = {};
    const getStartAndEndDate = () => {
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 1);
      console.log('today', today);
      console.log('month', month);
      console.log('year', year);
      console.log('start', start);
      console.log('end', end);
      return { start, end };
    };
    try {
      const db = await connectDB();
      //filtering the search by CR, unit and date
      const data = await db
        .collection(collection)
        .where('CR', '==', storeCR)
        .where('unidad', '==', unit)
        .where('fecha_hora', '>=', getStartAndEndDate().start)
        .where('fecha_hora', '<', getStartAndEndDate().end)
        .get();
      //validating if data is not empty
      if (data.empty) {
        throw new Error('SOBRECALENTAMIENTO_NOT_FOUND');
      } else {
        data.forEach((doc: any) => {
          let id = doc.id;
          let info = doc.data();

          sobrecalentamiento = { ...info, id };
          // console.log('sobrecalntamiento', sobrecalentamiento);
        });
      }
    } catch (error) {
      console.log('error en getSobrecalentamientoForValidation', error);
    }
    return sobrecalentamiento;
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
  getUsuario: async (root, { email }) => {
    let usuario = {};
    try {
      const db = await connectDB();
      //searching user by email
      const data = await db
        .collection('Usuarios')
        .where('email', '==', email)
        .get();

      if (data.empty) {
        throw new Error('USER_NOT_FOUND');
      } else {
        data.forEach((doc: any) => {
          let id = doc.id;
          let info = doc.data();

          usuario = { ...info, id };
        });
      }
    } catch (error) {
      console.error('error en getUsuario', error);
    }
    return usuario;
  },
};
