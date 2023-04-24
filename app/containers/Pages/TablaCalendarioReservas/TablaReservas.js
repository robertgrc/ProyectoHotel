import React, { useState, useEffect } from 'react';
import './TablaReservas.css';

function TablaReservas({
 habitaciones, diasDelMes, mesActualNumerico, yearActual, reservas
}) {
  return (
    <table className="tabla-reservas">
      <thead>
        <tr>
          <th>Habitación</th>
          {[...Array(diasDelMes)].map((_, i) => {
            const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1);
            const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
            return <th key={i}>{`${diaSemana} ${i + 1}`}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {habitaciones.map((habitacion) => {
          const reservasHabitacion = reservas.filter(reserva => reserva.habitacion === habitacion.numero);
          return (
            <tr key={habitacion.id}>
              <td>{habitacion.nombre}</td>
              {[...Array(diasDelMes)].map((_, i) => {
                const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1);
                const reservaDia = reservasHabitacion.find(reserva => fecha.getTime() >= new Date(reserva.fechaInicio).getTime() && fecha.getTime() <= new Date(reserva.fechaFin).getTime());
                let color = 'white';
                let texto = '';
                if (reservaDia) {
                  switch (reservaDia.estado) {
                    case 'alquilado':
                      color = 'red';
                      texto = reservaDia.nombre;
                      break;
                    case 'confirmado':
                      color = 'green';
                      texto = reservaDia.nombre;
                      break;
                    case 'provisional':
                      color = 'yellow';
                      texto = reservaDia.nombre;
                      break;
                    case 'cancelado':
                      color = 'grey';
                      texto = reservaDia.nombre;
                      break;
                    default:
                      color = 'white';
                  }
                }
                return <td key={i} style={{ backgroundColor: color }}>{texto}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default TablaReservas;
