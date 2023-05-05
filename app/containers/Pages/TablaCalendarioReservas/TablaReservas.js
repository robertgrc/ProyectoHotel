import React, { useState, useEffect, useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import FormContext from '../../../context/FormProvider';
import './TablaReservas.css';


function TablaReservas({ habitaciones, diasDelMes, mesActualNumerico, yearActual, reservas }) {
  const { dispatch, habitacionSeleccionada, fechaSeleccionada  } = useContext(FormContext);
  const history = useHistory();

  const handleCeldaClick = async (habitacion, fecha, reservaDia, numeroHabitacion) => {
    if (reservaDia) {
      const { id } = reservaDia;
      history.push(`FormularioTarjetaRegistro/${id}`);
    } else {
      dispatch({ type: 'SELECCIONAR_HABITACION', payload: habitacion });
      dispatch({ type: 'SELECCIONAR_FECHA', payload: fecha });
      history.push('FormularioTarjetaRegistro');
    }
  };

  return (
    <table className="tabla-reservas">
      <thead>
        <tr>
          <th className="Tabla-calendar-habitaciones">Habitación</th>
          {[...Array(diasDelMes)].map((_, i) => {
            const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1);
            const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
            return (
              <th key={i}>
                <div>{diaSemana}</div>
                <div>{i + 1}</div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {habitaciones.map((habitacion) => {
          const reservasHabitacion = reservas.filter(reserva => reserva.numeroHabitacion === habitacion.numero);
          return (
            <tr className="tabla-calendar-tr" key={habitacion.id}>
              <td className="tabla-calendar-td">{habitacion.nombre}</td>
              {[...Array(diasDelMes)].map((_, i) => {
                const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1);
                const reservaDia = reservasHabitacion.find(reserva => fecha.getTime() >= new Date(reserva.fechaIngreso).getTime() && fecha.getTime() <= new Date(reserva.fechaSalida).getTime());
                let color = 'white';
                let texto = '';
                if (reservaDia) {
                  switch (reservaDia.estadoHabitacion) {
                    case 'alquilado':
                      color = 'rgb(249,43,35)';
                      texto = reservaDia.nombreCompleto;
                      break;
                      case 'confirmado':
                      color = 'rgb(47,154,59)';
                      texto = reservaDia.nombreCompleto;
                      break;
                      case 'provisional':
                        color = 'rgb(251, 185, 46)';
                        texto = reservaDia.nombreCompleto;
                        break;
                        case 'cancelado':
                        color = 'rgb(89,78,77)';
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
