import React from 'react';
import './TablaReservas.css';

function TablaReservas({ habitaciones, diasDelMes, mesActualNumerico, yearActual }) {
  return (
    <table className="tabla-reservas">
      <thead>
        <tr>
          <th>Habitación</th>
          {[...Array(diasDelMes)].map((_, i) => {
            const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1); // La fecha empieza en abril (mes 3)
            const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
            return <th key={i}>{`${diaSemana} ${i + 1}`}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {habitaciones.map((habitacion) => (
          <tr key={habitacion.id}>
            <td>{habitacion.nombre}</td>
            {[...Array(diasDelMes)].map((_, i) => {
              const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1); // La fecha empieza en abril (mes 3)
              const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
              const letraDia = diaSemana.charAt(0);
              return <td key={i}>{letraDia}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaReservas;
