import React from 'react';
const habitaciones = [
    { id: 1, nombre: 'Habitación 1' },
    { id: 2, nombre: 'Habitación 2' },
    { id: 3, nombre: 'Habitación 3' }
  ];
  const diasDelMes = 30;

function Calendario() {
  return (
    <table>
      <thead>
        <tr>
          <th>Habitacion</th>
          {[...Array(diasDelMes)].map((_, i) => {
            const fecha = new Date(2023, 3, i + 1); // La fecha empieza en abril (mes 3)
            const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
            return <th key={i}>{`${diaSemana} ${i + 1}`}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {habitaciones.map((habitacion) => (
          <tr key={habitacion.id}>
            <td>{habitacion.id} ({habitacion.tipo})</td>
            {[...Array(diasDelMes)].map((_, i) => {
              const fecha = new Date(2023, 3, i + 1); // La fecha empieza en abril (mes 3)
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

export default Calendario;
