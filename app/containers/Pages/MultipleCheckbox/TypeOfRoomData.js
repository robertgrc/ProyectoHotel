import { habitaciones } from '../TablaCalendarioReservas/Habitaciones';
// export const TypeOfRoomData = [
//   {
//     name: 'SWB',
//     checked: false,
//     id: 0,
//   },
//   {
//     name: 'MAT',
//     checked: false,
//     id: 1,
//   },
//   {
//     name: 'DWB',
//     checked: false,
//     id: 2,
//   },
//   {
//     name: 'TWB',
//     checked: false,
//     id: 3,
//   },
//   {
//     name: 'SUITE',
//     checked: false,
//     id: 4,
//   },
//   {
//     name: 'SIMPLE',
//     checked: false,
//     id: 5,
//   },
//   {
//     name: 'DOBLE',
//     checked: false,
//     id: 6,
//   },
// ];

export const TypeOfRoomData = habitaciones.reduce((acc, curr) => {
    const existingRoomType = acc.findIndex((room) => room.name === curr.nombre);
    if (existingRoomType !== -1) {
      acc[existingRoomType].checked = false;
    } else {
      acc.push({
        name: curr.nombre,
        checked: false,
        id: acc.length,
      });
    }
    // console.log('acc:', acc);
    return acc;
  }, []);
