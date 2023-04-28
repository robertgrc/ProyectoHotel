import React, { useEffect, useState } from 'react';
import './TablaReservas.css';

import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TablaReservas from './TablaReservas';
import TablaEstatus from './TablaEstatus';
import hotelApi from '../../../api/hotelApi';


function TablaCalendarioReservas() {
  const habitaciones = [
      { id: 1, nombre: '01 SWB', numero: '101' },
      { id: 2, nombre: '02 TWB', numero: '102' },
      { id: 3, nombre: '03 DWB', numero: '103' },
      { id: 4, nombre: '04 SWB', numero: '104' },
      { id: 5, nombre: '05 TWB', numero: '105' },
      { id: 6, nombre: '06 SWB', numero: '106' },
      { id: 7, nombre: '07 TWB', numero: '107' },
      { id: 8, nombre: '08 TWB', numero: '108' },
      { id: 9, nombre: '09 TWB', numero: '109' },
      { id: 10, nombre: '10 SWB', numero: '110' },
      { id: 11, nombre: '11 TWB', numero: '111' },
      { id: 12, nombre: '12 DWB', numero: '112' },
      { id: 13, nombre: '13 SWB', numero: '113' },
      { id: 14, nombre: '14 TWB', numero: '114' },
      { id: 15, nombre: '15 TWB', numero: '115' },
  ];

  const [reservas, setReservas] = useState([]);

  const getRegistro = async () => {
    try {
      const response = await hotelApi.get('/registro');
      const { data } = response;
      const { registros } = data;
      console.log(registros);
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
          <button onClick={getRegistro}>+</button>
          <TablaEstatus />
        </div>
      </div>
    </div>
  );
}

export default TablaCalendarioReservas;
