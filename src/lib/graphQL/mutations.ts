import { connectDB } from '../db/dbConnection';

export = {
  addSobrecalentamiento: async (root: any, { input }) => {
    //default data since some params are optional
    const defaults = {
      comentarios: '',
    };
    // if comentarios is not in input, then add a empty string
    let newSobrecalentamiento = Object.assign(defaults, input);
    let id = { id: 'sinId' };

    try {
      //connecting to db and adding the data
      const db = await connectDB();
      const newData = await db
        .collection('sobrecalentamientos')
        .add(newSobrecalentamiento);

      //saving the data id
      id.id = newData.id;
    } catch (error) {
      console.log('error en addSobrecalentamiento', error);
    }
    //returning the introduced data with its id
    return { ...input, ...id };
  },
  addEficienciaDeTrabajo: async (root: any, { input }) => {
    const defaults = {
      comentarios: '',
    };

    let newEficienciaDeTrabajo = Object.assign(defaults, input);
    let id = { id: 'sinId' };

    try {
      const db = await connectDB();
      const newData = await db
        .collection('EficienciaDeTrabajo')
        .add(newEficienciaDeTrabajo);

      id.id = newData.id;
    } catch (error) {
      console.log('error en addEficienciaDeTrabajo', error);
    }
    return { ...input, ...id };
  },
  addTienda: async (root: any, { input }) => {},
};
