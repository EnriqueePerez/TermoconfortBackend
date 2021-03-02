import timestampToDate from '../../utils/timestampToDate';

module.exports = {
  Sobrecalentamiento: {
    //here you place the parameters of the query in order to parse it
    horaFecha: async ({ fecha_hora }) => {
      //parsing timestamp to date and to string
      const stringDate: String = timestampToDate({ fecha_hora });
      //   console.log('probando que lleguen parametros', fecha_hora);
      return stringDate;
    },
  },
  EficienciaDeTrabajo: {
    horaFecha: async ({ fecha_hora }) => {
      //parsing timestamp to date and to string
      const stringDate: String = timestampToDate({ fecha_hora });
      return stringDate;
    },
  },
  Tiendas: {
    ubicacion: async ({ ubicacion }) => {
      //parsing GeoPoint to stringify
      const stringGeoPoint: String = JSON.stringify(ubicacion);
      return stringGeoPoint;
    },
  },
};
