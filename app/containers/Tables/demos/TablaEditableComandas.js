import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import hotelApi from '../../../api/hotelApi';
import SimpleTable from './SimpleTable';


const TablaEditableComandas = ({ comandas, onEdit, onDelete }) => {
    const location = useLocation();
    const reservaSeleccionadaId = location.pathname.split('/').pop();
    const tipoComanda = location.state && location.state.tipoComanda ? location.state.tipoComanda : '';
    console.log('reservaSeleccionadaId', reservaSeleccionadaId);
    console.log('Tipo de comanda:', tipoComanda);

    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
      // Make the API call to the appropriate endpoint based on `tipoComanda`
      if (reservaSeleccionadaId) {
        hotelApi.get(`/${tipoComanda}/${reservaSeleccionadaId}`)
          .then((response) => {
            setBackendData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data from the backend:', error);
          });
      }
    }, [reservaSeleccionadaId, tipoComanda]);

    console.log(backendData);
  return (
    <>
      <h1>TablaEditableComandas</h1>
      <SimpleTable />
    </>
  );
};

export default TablaEditableComandas;
