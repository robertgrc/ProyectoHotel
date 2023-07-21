import React, { useEffect, useState } from 'react';
import './TablaReservas.css';

import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
        <h1 className="title-tabla-registro">Hotel Ideal - Booking</h1>
        <div className="subtitle-tabla-registro">
          <h2>Planning de Reservaciones</h2>
          <div className="subtitle-tabla-registro-right">
            <h2>
              Año:
              { yearActual }
              {' '}
            </h2>
            <h2>
              Mes:
              { new Date(yearActual, mesActual - 1).toLocaleString('es-ES', { month: 'long' }) }
              {' '}
            </h2>
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
