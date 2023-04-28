import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { FormProvider } from '../../../context/FormProvider';
import './TablaReservas.css';

function TablaReservas({ habitaciones, diasDelMes, mesActualNumerico, yearActual, reservas }) {
  const history = useHistory();

  const handleCeldaClick = (habitacion, fecha, reservaDia, numeroHabitacion) => {

    if (reservaDia) {
      const { id } = reservaDia;
      history.push(`FormularioTarjetaRegistro/${id}`);
    } else {
      console.log('no hay reserva');
      history.push('FormularioTarjetaRegistro');
      console.log('fecha:', fecha);
      console.log('habitacion:*****', habitacion);
      console.log('numeroHabitacion:', habitacion.numero);
      // console.log('numeroHabitacion:', numeroHabitacion);
    }
  };


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
          const reservasHabitacion = reservas.filter(reserva => reserva.numeroHabitacion === habitacion.numero);
          return (
            <tr key={habitacion.id}>
              <td>{habitacion.nombre}</td>
              {[...Array(diasDelMes)].map((_, i) => {
                const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1);
                const reservaDia = reservasHabitacion.find(reserva => fecha.getTime() >= new Date(reserva.fechaIngreso).getTime() && fecha.getTime() <= new Date(reserva.fechaSalida).getTime());
                let color = 'white';
                let texto = '';
                if (reservaDia) {
                  switch (reservaDia.estadoHabitacion) {
                    case 'alquilado':
                      color = 'red';
                      texto = reservaDia.nombreCompleto;
                      break;
                    case 'confirmado':
                      color = 'green';
                      texto = reservaDia.nombreCompleto;
                      break;
                    case 'provisional':
                      color = 'yellow';
                      texto = reservaDia.nombreCompleto;
                      break;
                      case 'cancelado':
                        color = 'grey';
                        texto = reservaDia.nombreCompleto;
                        break;
                        default:
                      color = 'white';
                  }
                }
                return (
                  <td
                    key={i}
                    style={{ backgroundColor: color }}
                    className={reservaDia ? 'celda-reservada' : 'celda-vacia'}
                    onClick={() => handleCeldaClick(habitacion, fecha.toISOString().substring(0, 10), reservaDia)}
                  >
                    {texto}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default TablaReservas;
