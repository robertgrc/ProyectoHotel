import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import hotelApi from '../../../api/hotelApi';
import SimpleTable from './SimpleTable';
import TablaEditable from './TablaEditable';


const TablaEditableComandas = () => {
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


    const comandas = backendData.comandasRestaurante || [];
    // const comandas = [
    //     {
    //       id: 1,
    //       nombrePax: 'Juan Pérez',
    //       mesero: 'Adrian',
    //       detalle: 'Almuerzo',
    //       monto: 25.50
    //     },
    //     {
    //       id: 2,
    //       nombrePax: 'María Gómez',
    //       mesero: 'Carlos',
    //       detalle: 'Cena',
    //       monto: 35.20
    //     },
    //     // Puedes agregar más objetos de comandas aquí
    //   ];

    const handleEdit = (comanda) => {
        // Lógica para editar una comanda (puedes implementar tu propia lógica aquí)
        console.log('Editar comanda:', comanda);
      };

      const handleDelete = (comanda) => {
        // Lógica para borrar una comanda (puedes implementar tu propia lógica aquí)
        console.log('Borrar comanda:', comanda);
      };

    console.log(backendData);
  return (
    <>
      <Toolbar>
        <div>
          <Typography variant="h6">Tabla Editable de Comandas</Typography>
        </div>
      </Toolbar>
      <TablaEditable comandas={comandas} onEdit={handleEdit} onDelete={handleDelete} />
      <SimpleTable />
    </>
  );
};

export default TablaEditableComandas;
