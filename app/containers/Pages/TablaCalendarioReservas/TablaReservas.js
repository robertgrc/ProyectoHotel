import React, {
 useState, useEffect, useContext, useReducer
} from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormContext from '../../../context/FormProvider';
import './TablaReservas.css';

function TablaReservas({
 habitaciones, diasDelMes, mesActualNumerico, yearActual, reservas
}) {
 const { dispatch, habitacionSeleccionada, fechaSeleccionada } = useContext(FormContext);
 const history = useHistory();

 const [modalOpen, setModalOpen] = useState(false);
 const [selectedOption, setSelectedOption] = useState('');
 const [selectedReservaDia, setSelectedReservaDia] = useState(null);

 const openModal = (reservaDia) => {
  setSelectedReservaDia(reservaDia);
  setModalOpen(true);
};

const handleOptionSelect = (option) => {
  setSelectedOption(option);
  setModalOpen(false);

  switch (option) {
    case 'formularioTarjetaRegistro':
      if (selectedReservaDia) {
        const { id } = selectedReservaDia;
        history.push(`FormularioTarjetaRegistro/${id}`);
      }
      break;
    case 'comandaRestaurante':
      if (selectedReservaDia) {
        history.push('ComandaRestaurante');
      }
    break;
    case 'comandaFrigobar':
      if (selectedReservaDia) {
        // const { id } = selectedReservaDia;
        history.push('ComandaConsumoFrigobar');
      }
      break;
    case 'consumoExtras':
      if (selectedReservaDia) {
        // const { id } = selectedReservaDia;
        history.push('ConsumoCliente');
      }
      break;
    case 'gastosLavanderia':
      if (selectedReservaDia) {
       // const { id } = selectedReservaDia;
        history.push('Lavanderia');
      }
      break;
    case 'controlCuentaCliente':
        if (selectedReservaDia) {
          // console.log('ReservaSeleccionada*^*:', selectedReservaDia);
          dispatch({ type: 'ACTUALIZAR_RESERVA_SELECCIONADA', payload: selectedReservaDia });
          const { id } = selectedReservaDia;
          history.push(`ControlCuentaCliente/${id}`);
        }
        break;
    case 'cerrarModal':
      history.push('TablaCalendarioReservas');
      break;
    default:
      // Opción inválida
      break;
  }
};

const handleCeldaClick = (habitacion, fecha, reservaDia) => {
  if (reservaDia) {
    setSelectedReservaDia(reservaDia);
    // console.log('reservadia***:', reservaDia);
    dispatch({ type: 'ACTUALIZAR_RESERVA_SELECCIONADA', payload: reservaDia });
    setModalOpen(true);
  } else {
    setSelectedReservaDia(null);
    dispatch({ type: 'SELECCIONAR_HABITACION', payload: habitacion });
    dispatch({ type: 'SELECCIONAR_FECHA', payload: fecha });
    // window.location.href = 'FormularioTarjetaRegistro';
    history.push('FormularioTarjetaRegistro');
  }
};

  return (
    <>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Selecciona una opción:</h2>
            <Button onClick={() => handleOptionSelect('formularioTarjetaRegistro')}>Entrar al FormularioTarjetaRegistro</Button>
            <Button onClick={() => handleOptionSelect('comandaRestaurante')}>Añadir Comanda Restaurante</Button>
            <Button onClick={() => handleOptionSelect('comandaFrigobar')}>Añadir Comanda Frigobar</Button>
            <Button onClick={() => handleOptionSelect('consumoExtras')}>Añadir Consumos Extras</Button>
            <Button onClick={() => handleOptionSelect('gastosLavanderia')}>Añadir Gastos Lavanderia</Button>
            <Button onClick={() => handleOptionSelect('controlCuentaCliente')}>Cargar control cuenta del cliente</Button>
            <Button onClick={() => handleOptionSelect('cerrarModal')}>Cerrar Modal</Button>
          </div>
        </div>
      )}
      <table className="tabla-reservas">
        <thead>
          <tr>
            <th className="Tabla-calendar-habitaciones">Habitación</th>
            {[...Array(diasDelMes)].map((_, i) => {
              const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1);
              // const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
              const diasSemanaAbreviados = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
              const diaSemana = diasSemanaAbreviados[fecha.getDay()];
              const key = `dia_${i}_${fecha.toISOString()}`;
              return (
                <th key={key}>
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
                <td className="tabla-calendar-td">
                  {habitacion.numero}
                  {' '}
                  {habitacion.nombre}
                </td>
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

                    // Generar una clave única para cada celda
                  const cellKey = `cell_${habitacion.id}_${i}_${fecha.toISOString()}`;

                  return (
                    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
                    <td
                      key={cellKey}
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
    </>
  );
}
export default TablaReservas;
