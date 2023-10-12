/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import './TablaReservas.css';

import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import TablaReservas from './TablaReservas';
import TablaEstatus from './TablaEstatus';
import hotelApi from '../../../api/hotelApi';
import { habitaciones } from './habitaciones';


function TablaCalendarioReservas() {
  const [reservas, setReservas] = useState([]);
  const [mesActual, setMesActual] = useState(new Date().getMonth() + 1);
  const [yearActual, setYearActual] = useState(new Date().getFullYear());
  const [diaActual, setDiaActual] = useState(new Date().getDate());

  const getRegistrosPorMesyAnio = async () => {
    try {
      // Formatear el mes actual con dos dígitos
      const mesFormateado = mesActual.toString().padStart(2, '0');
      const response = await hotelApi.get(`/registro/${yearActual}/${mesFormateado}`);
      // console.log(response);
      const { data } = response;
      const { registros } = data;
      setReservas(registros);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegistrosPorMesyAnio();
  }, [mesActual, yearActual]);
//*-------------

  const diasDelMes = new Date(yearActual, mesActual, 0).getDate();

  const incrementarMes = () => {
    if (mesActual === 12) {
      setMesActual(1);
      setYearActual(yearActual + 1);
    } else {
      setMesActual(mesActual + 1);
    }
  };

  const decrementarMes = () => {
    if (mesActual === 1) {
      setMesActual(12);
      setYearActual(yearActual - 1);
    } else {
      setMesActual(mesActual - 1);
    }
  };

  return (
    <div className="container-calendario-reservas">
      <div className="tabla-calendario-reservas">
        {/* <h1 className="title-tabla-registro">Hotel Ideal - Booking</h1> */}
        <div className="title-tabla-registro">
          <Typography variant="h2" className={Type.textInfo} gutterBottom>Hotel Ideal - Booking</Typography>
        </div>
        <div className="title-tabla-registro-v2">
          <Typography variant="h5" gutterBottom>Planning de Reservaciones</Typography>
        </div>
        <div className="subtitle-tabla-registro">
          <div className="subtitle-tabla-registro-right">
            <Typography variant="h6" gutterBottom>{ new Date(yearActual, mesActual - 1).toLocaleString('es-ES', { month: 'long' }).toUpperCase() } {yearActual}</Typography>
          </div>
          <div className="buttons-table-calendar">
            <Button
              variant="outlined"
              color="secondary"
              onClick={decrementarMes}
              className="combined-button"
              style={{ marginRight: '10px' }}
            >
              Anterior
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={incrementarMes}
              className="combined-button"
            >
              Siguiente
            </Button>
          </div>
        </div>

        <TablaReservas
          habitaciones={habitaciones}
          diasDelMes={diasDelMes}
          mesActualNumerico={mesActual}
          yearActual={yearActual}
          diaActual={diaActual}
          reservas={reservas}
        />
        <div>
          <TablaEstatus />
        </div>
      </div>
    </div>
  );
}

export default TablaCalendarioReservas;
