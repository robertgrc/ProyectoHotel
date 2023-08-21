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

  const getRegistro = async () => {
    try {
      const response = await hotelApi.get('/registro');
      const { data } = response;
      const { registros } = data;
      setReservas(registros);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegistro();
  }, []);
//*-------------
  const [mesActual, setMesActual] = useState(new Date().getMonth() + 1);
  const [yearActual, setYearActual] = useState(new Date().getFullYear());

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
        <div className="subtitle-tabla-registro">
          <Typography variant="h5" gutterBottom>Planning de Reservaciones</Typography>
          <div className="subtitle-tabla-registro-right">
            <Typography variant="h5" gutterBottom>Año:{yearActual}</Typography>
          </div>
          <div className="subtitle-tabla-registro-right">
            <Typography variant="h5" gutterBottom>Mes:{ new Date(yearActual, mesActual - 1).toLocaleString('es-ES', { month: 'long' }) }</Typography>
          </div>
        </div>
        <div className="buttons-table-calendar">
          <Button
            variant="contained"
            color="secondary"
            onClick={decrementarMes}
            startIcon={<ArrowBackIosIcon />}
            style={{ marginRight: '10px' }}
          >
            anterior
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={incrementarMes}
            startIcon={<ArrowForwardIosIcon />}
          >
            siguiente
          </Button>
        </div>
        <TablaReservas
          habitaciones={habitaciones}
          diasDelMes={diasDelMes}
          mesActualNumerico={mesActual}
          yearActual={yearActual}
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
