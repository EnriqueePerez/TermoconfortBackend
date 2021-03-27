import { connectDB } from '../db/dbConnection';
import firebase from 'firebase-admin';
const { GeoPoint, Timestamp } = firebase.firestore;

export = {
  addSobrecalentamiento: async (root: any, { input, collection }) => {
    //default data since some params are optional
    const now = Timestamp.fromDate(new Date());
    const defaults = {
      comentarios: '',
      fecha_hora: now,
    };
    // if comentarios is not in input, then add a empty string
    let newSobrecalentamiento = Object.assign(defaults, input);
    let id = { id: 'sinId' };

    try {
      //connecting to db and adding the data
      const db = await connectDB();
      const newData = await db
        .collection(collection)
        .add(newSobrecalentamiento);

      //saving the data id
      id.id = newData.id;
    } catch (error) {
      console.log('error en addSobrecalentamiento', error);
    }
    //returning the introduced data with its id
    return { ...newSobrecalentamiento, ...id };
  },
  updateSobrecalentamiento: async (root: any, { input, collection, id }) => {
    //default data since some params are optional
    const now = Timestamp.fromDate(new Date());
    const defaults = {
      comentarios: '',
      fecha_hora: now,
    };
    // if comentarios is not in input, then add a empty string
    let updatedSobrecalentamiento = Object.assign(defaults, input);

    try {
      //connecting to db and adding the data
      const db = await connectDB();
      const newData = await db
        .collection(collection)
        .doc(id)
        .update(updatedSobrecalentamiento);
    } catch (error) {
      console.log('error en updateSobrecalentamiento', error);
    }
    //returning the introduced data with its id
    return { ...updatedSobrecalentamiento, id };
  },
  addEficienciaDeTrabajo: async (root: any, { input }) => {
    const now = Timestamp.fromDate(new Date());
    const defaults = {
      comentarios: '',
      fecha_hora: now,
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
  updateEficienciaDeTrabajo: async (root: any, { input, collection, id }) => {
    //default data since some params are optional
    const now = Timestamp.fromDate(new Date());
    const defaults = {
      comentarios: '',
      fecha_hora: now,
    };
    // if comentarios is not in input, then add a empty string
    let updatedEficienciaDeTrabajo = Object.assign(defaults, input);

    try {
      //connecting to db and adding the data
      const db = await connectDB();
      const newData = await db
        .collection('EficienciaDeTrabajo')
        .doc(id)
        .update(updatedEficienciaDeTrabajo);
    } catch (error) {
      console.log('error en updateEficienciaDeTrabajo', error);
    }
    //returning the introduced data with its id
    return { ...updatedEficienciaDeTrabajo, id };
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
