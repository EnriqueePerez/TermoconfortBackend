import timestampToDate from '../../utils/timestampToDate';

module.exports = {
  Sobrecalentamiento: {
    //here you place the parameters of the query in order to parse it
    fecha_hora: async ({ fecha_hora }) => {
      //parsing timestamp to date and to string
      const stringDate: String = timestampToDate({ fecha_hora });
      //   console.log('probando que lleguen parametros', fecha_hora);
      return stringDate;
    },
  },
  EficienciaDeTrabajo: {
    fecha_hora: async ({ fecha_hora }) => {
      //parsing timestamp to date and to string
      const stringDate: String = timestampToDate({ fecha_hora });
      return stringDate;
    },
  },
  Tienda: {
    ubicacion: async ({ ubicacion }) => {
      //parsing GeoPoint to stringify
      const stringGeoPoint: String = JSON.stringify(ubicacion);
      return stringGeoPoint;
    },
  },
};
