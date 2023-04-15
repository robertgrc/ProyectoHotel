import React from 'react';
import TablaEstatus from './TablaEstatus';
import TablaReservas from './TablaReservas';
import './TablaReservas.css';

function TablaCalendarioReservas() {
  const habitaciones = [
    { id: 1, nombre: '01 SWB' },
    { id: 2, nombre: '02 TWB' },
    { id: 3, nombre: '03 DWB' },
    { id: 4, nombre: '04 SWB' },
    { id: 5, nombre: '05 TWB' },
    { id: 6, nombre: '06 SWB' },
    { id: 7, nombre: '07 TWB' },
  ];

  const fechaActual = new Date();
  const mesActual = fechaActual.toLocaleString('es-ES', { month: 'long' });
  const mesActualNumerico = fechaActual.getMonth() + 1;
  const yearActual = fechaActual.getFullYear();
  const diasDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate(); // Obtiene el último día del mes actual
  // console.log(yearActual);
  // console.log(mesActualNumerico);
  return (
    <div className="container-calendario-reservas">
      <div className="tabla-calendario-reservas">
        <h1 className="title-tabla-registro">Hotel Ideal - Booking</h1>
        <div className="subtitle-tabla-registro">
          <h2>Planning de Reservaciones</h2>
          <div className="subtitle-tabla-registro-right">
            <h2>Mes:{ mesActual } </h2>
            <h2>Año:{ yearActual} </h2>
          </div>
        </div>
        <TablaReservas
          habitaciones={habitaciones}
          diasDelMes={diasDelMes}
          mesActualNumerico={mesActualNumerico}
          yearActual={yearActual} 
        />
        <TablaEstatus />
      </div>
    </div>
  );
}

export default TablaCalendarioReservas;
