import { connectDB } from '../db/dbConnection';
import firebase from 'firebase-admin';
const { GeoPoint } = firebase.firestore;

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
  addTienda: async (root: any, { input }) => {
    let newTienda = {
      nombre: input.nombre,
      ciudad: input.ciudad,
      ubicacion: input.ubicacion,
    };
    let id = { id: 'sinId' };

    //parsing ubicacion to a Geopoint object
    const parsedUbicacion = new GeoPoint(
      newTienda.ubicacion.latitude,
      newTienda.ubicacion.longitude
    );
    //replacing ubicacion for the new Geopoint object
    newTienda.ubicacion = parsedUbicacion;

    try {
      const db = await connectDB();
      await db.collection('Tiendas').doc(`${input.id}`).set(newTienda);
      // console.log('imprimiendo newTienda', newTienda);
      id.id = input.id;
    } catch (error) {
      console.error('error en addTienda', error);
    }
    //returning the id and the info with the Geopoint object
    return { ...newTienda, ...id };
  },
  addUsuario: async (root: any, { input }) => {
    let newUsuario = {
      nombre: input.nombre,
      apellido: input.apellido,
      email: input.email,
      permisos: input.permisos,
    };
    //adding default data in case it is not existant
    let id = { id: 'sinId' };

    try {
      const db = await connectDB();
      await db.collection('Usuarios').doc(`${input.id}`).set(newUsuario);

      id.id = input.id;
    } catch (error) {
      console.error('error en addUsuario', error);
    }
    return { ...newUsuario, ...id };
  },
};
