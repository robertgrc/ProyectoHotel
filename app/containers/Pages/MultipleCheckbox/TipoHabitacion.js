//import { habitaciones } from '../TablaCalendarioReservas/Habitaciones';


export const TypeOfRoomData = (habitaciones, habitacionesOcupadas) => {
    return habitaciones.reduce((acc, curr) => {
      const existingRoomType = acc.findIndex((room) => room.name === curr.nombre);
      if (existingRoomType !== -1) {
        acc[existingRoomType].checked = habitacionesOcupadas.includes(curr.nombre);
      } else {
        acc.push({
          name: curr.nombre,
          checked: habitacionesOcupadas.includes(curr.nombre),
          id: acc.length,
        });
      }
      return acc;
    }, []);
  };
