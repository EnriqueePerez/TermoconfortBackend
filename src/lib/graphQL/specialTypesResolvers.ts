import { GeoPoint } from '@google-cloud/firestore';

export = {
  Tienda: {
    ubicacion: async ({ ubicacion }) => {
      const latitude = ubicacion.latitude;
      const longitude = ubicacion.longitude;

      const parsedGeoPoint = new GeoPoint(latitude, longitude);
      console.log(parsedGeoPoint);
      //parsing GeoPoint to stringify
      // const stringGeoPoint: String = JSON.stringify(ubicacion);
      return parsedGeoPoint;
    },
  },
};
