/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable key-spacing */
import React, {
  useState, useEffect, useContext, useReducer
} from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Type from 'dan-styles/Typography.scss';
import FormContext from '../../../context/FormProvider';
import './TablaReservas.css';
import FormularioTarjetaRegistro from '../FormularioTarjetaRegistro/FormularioTarjetaRegistro';

function TablaReservas({
  habitaciones, diasDelMes, mesActualNumerico, yearActual, diaActual, reservas, props
}) {
  //  console.log('diaActual', diaActual);
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
      case 'registroHuespedes':
        if (selectedReservaDia) {
          const { id } = selectedReservaDia;
          history.push({
            pathname: `FormularioTarjetaRegistro/${id}`,
            state: { toggleMostrarRegistroCliente: true }, // Pasa el estado en la ubicación
          });
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
      case 'checkout':
        if (selectedReservaDia) {
          // console.log('ReservaSeleccionada*^*:', selectedReservaDia);
          dispatch({ type: 'ACTUALIZAR_RESERVA_SELECCIONADA', payload: selectedReservaDia });
          const { id } = selectedReservaDia;
          history.push({
            pathname: `ControlCuentaCliente/${id}`,
            state: { toggleMostrarCheckout: true }, // Pasa el estado en la ubicación
          });
        }
        break;
      case 'diarioIngresosEgresos':
        if (selectedReservaDia) {
          // const { id } = selectedReservaDia;
          history.push('DiarioIngresos');
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
            <div className="modal-icon">
              <Icon className="close-icon" onClick={() => handleOptionSelect('cerrarModal')}>close</Icon>
            </div>
            <div className="modal-header">
              <Typography variant="h5" className={Type.textInfo} gutterBottom>Menú de Opciones:</Typography>
            </div>
            <div className="modal-buttons">
              <Button
                onClick={() => handleOptionSelect('formularioTarjetaRegistro')}
                style={{ width: '80%' }}
              >
                <Typography
                  variant="h11"
                  component="h7"
                >
                  FORMULARIO DE RESERVA
                </Typography>
              </Button>
              <Button style={{ width: '80%' }} onClick={() => handleOptionSelect('registroHuespedes')}><Typography variant="h11" component="h7">REGISTRO DE HUESPEDES</Typography></Button>
              <Button style={{ width: '80%' }} onClick={() => handleOptionSelect('comandaRestaurante')}><Typography variant="h11" component="h7">CONSUMO RESTAURANTE/BAR</Typography></Button>
              <Button style={{ width: '80%' }} onClick={() => handleOptionSelect('comandaFrigobar')}><Typography variant="h11" component="h7">CONSUMO FRIGOBAR</Typography></Button>
              <Button style={{ width: '80%' }} onClick={() => handleOptionSelect('consumoExtras')}><Typography variant="h11" component="h7">CONSUMOS MISCELANEOS</Typography></Button>
              <Button style={{ width: '80%' }} onClick={() => handleOptionSelect('gastosLavanderia')}><Typography variant="h11" component="h7">CONSUMO DE LAVANDERIA</Typography></Button>
              <Button style={{ width: '80%' }} onClick={() => handleOptionSelect('controlCuentaCliente')}><Typography variant="h11" component="h7">CUENTA DEL CLIENTE</Typography></Button>
              <Button style={{ width: '80%' }} onClick={() => handleOptionSelect('checkout')}><Typography variant="h11" component="h7">CHECK OUT</Typography></Button>
              <Button style={{ width: '80%' }} onClick={() => handleOptionSelect('diarioIngresosEgresos')}><Typography variant="h11" component="h7">REPORTE DIARIO DE INGRESOS</Typography></Button>
              <Button style={{ width: '80%' }}><Typography variant="h11" component="h7">TARJETA DE ALMACEN - INVENTARIO</Typography></Button>
            </div>
          </div>
        </div>
      )}
      <table className="tabla-reservas">
        <thead>
          <tr>
            <th className="Tabla-calendar-dia">
              <Typography variant="subtitle2" className={Type.textLeft} gutterBottom>Habitación</Typography>
            </th>
            {[...Array(diasDelMes)].map((_, i) => {
              const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1);
              const diasSemanaAbreviados = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
              const diaSemana = diasSemanaAbreviados[fecha.getDay()];
              const key = `dia_${i}_${fecha.toISOString()}`;
              const esDiaActual = diaActual === i + 1;
              // const esMesActual = mesActualNumerico === fecha.getMonth() + 1;
              const fechaActual = new Date();
              const mesActual = fechaActual.getMonth() + 1;
              // Usa mesActual como referencia para hacer la comparacion devuelve un booleano true o false para mostrar el estilo;
              const esMesActual = mesActualNumerico === mesActual;
              // Combine las condiciones para aplicar la clase
              const claseHeader = esDiaActual && esMesActual ? 'highlighted-header' : '';
              return (
                <th key={key} className={claseHeader}>
                  <div>
                    <Typography variant="subtitle2" className={Type.textCenter} gutterBottom>{diaSemana}</Typography>
                  </div>
                  <div>
                    <Typography variant="body2" className={Type.textCenter} gutterBottom>{i + 1}</Typography>
                  </div>
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
                  <Typography variant="subtitle2" className={Type.textLeft} gutterBottom>
                    {habitacion.numero} - {habitacion.nombre}
                  </Typography>
                </td>
                {[...Array(diasDelMes)].map((_, i) => {
                  const fecha = new Date(yearActual, mesActualNumerico - 1, i + 1);
                  const reservaDia = reservasHabitacion.find(reserva => fecha.getTime() >= new Date(reserva.fechaIngreso).getTime() && fecha.getTime() <= new Date(reserva.fechaSalida).getTime());
                  let color = 'white';
                  let texto = reservaDia ? reservaDia.nombreCompleto : '';
                  // console.log(reservaDia);
                  if (reservaDia) {
                    switch (reservaDia.estadoHabitacion) {
                      case 'alquilado':
                        color = '#ff5f7c';
                        texto = reservaDia.nombreCompleto;
                        break;
                      case 'confirmado':
                        color = '#20c67a';
                        texto = reservaDia.nombreCompleto;
                        break;
                      case 'provisional':
                        color = '#f6a04a';
                        texto = reservaDia.nombreCompleto;
                        break;
                      case 'cancelado':
                        color = '#847877';
                        texto = reservaDia.nombreCompleto;
                        break;
                      case 'checkout':
                        color = '#7783db';
                        texto = reservaDia.nombreCompleto;
                        break;
                      default:
                        color = 'unset';
                    }
                  }

                  // Generar una clave única para cada celda
                  const cellKey = `cell_${habitacion.id}_${i}_${fecha.toISOString()}`;

                  return (
                    <td
                      key={cellKey}
                      style={{
                        backgroundColor: reservaDia ? color : 'unset',
                        borderRadius: '7px',
                        height: '30px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        padding: '5px',
                        textAlign: 'center',
                        position: 'relative',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        border: '1px solid #ddd',
                        verticalAlign: 'middle',
                      }}
                      className={reservaDia ? 'celda-reservada' : 'celda-vacia'}
                      onMouseOver={(e) => {
                        if (reservaDia) {
                          e.currentTarget.style.overflow = 'visible';
                          // e.currentTarget.style.backgroundColor = 'MidnightBlue;'; // Cambia el color de fondo al pasar el cursor
                          e.currentTarget.querySelector('.nombre-completo').style.display = 'block';
                          // e.currentTarget.querySelector('.nombre-completo').style.backgroundColor = 'MidnightBlue;'; // Cambia el color de fondo de la caja abierta
                          e.currentTarget.querySelector('.nombre-completo').style.color = 'white'; // Cambia el color del texto
                        }
                      }}
                      onMouseOut={(e) => {
                        if (reservaDia) { // Aplicar el efecto solo si hay una reserva
                          e.currentTarget.style.overflow = 'hidden'; // Vuelve a ocultar el contenido excedente
                          e.currentTarget.style.backgroundColor = color; // Restaura el color de fondo original
                          e.currentTarget.querySelector('.nombre-completo').style.display = 'none';
                          e.currentTarget.querySelector('.nombre-completo').style.backgroundColor = color; // Restaura el color de fondo de la caja abierta
                        }
                      }}
                      onClick={() => handleCeldaClick(habitacion, fecha.toISOString().substring(0, 10), reservaDia)}
                    >
                      <span className="nombre-abreviado">{texto.substring(0, 3)}</span>
                      <span className="nombre-completo">{texto}</span>
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
