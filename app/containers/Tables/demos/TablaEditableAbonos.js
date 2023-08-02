import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/BorderColor';
import hotelApi from '../../../api/hotelApi';
import { showErrorMessage, ShowQuestionSureDelete, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';


const TablaEditableAbonos = () => {
  const [abonosData, setAbonosData] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const reservaSeleccionadaId = location.pathname.split('/').pop();
  useEffect(() => {
    // Make the API call to fetch abonos data based on `reservaSeleccionadaId`
    if (reservaSeleccionadaId) {
        hotelApi.get(`editarAbono/${reservaSeleccionadaId}`)
          .then((response) => {
            setAbonosData(response.data.abono || []);
          })
          .catch((error) => {
            console.error('Error al obtener datos del backend:', error);
          });
      }
  }, [reservaSeleccionadaId]);

  console.log(abonosData);

  const updateTableData = (comandaId) => {
    window.location.reload();
};


  const handleEditAbono = (abono) => {
      console.log('Editar abono:', abono);
    };

  const handleDeleteAbono = async (abono) => {
    console.log('borrarAbono', abono);
    try {
      // Mostrar el mensaje de confirmación y esperar la respuesta del usuario
      const result = await ShowQuestionSureDelete(
        '¿Está seguro que desea borrar el registro de abono?',
        async () => {
          // Si el usuario confirma, proceder con la eliminación
          const response = await hotelApi.delete(`controlCuenta/${abono.id}`);
          console.log(response.data);
          // Actualizar la tabla después de eliminar el elemento
          updateTableData(abono.id);
        }
      );
      console.log(result);
      if (!result.isConfirmed) {
        console.log('Borrado cancelado por el usuario');
      }
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al eliminar el registro de abono');
    }
  };

  return (
    <div>
      <h2>Tabla de Abonos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre Pax</th>
            <th>Abono</th>
            <th>Detalle Abono</th>
            <th>Fecha Actual</th>
            <th>ID Reserva</th>
            <th>Recepcionista</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {abonosData.map((abono) => (
            <tr key={abono.id}>
              <td>{abono.nombrePax}</td>
              <td>{abono.abono}</td>
              <td>{abono.detalleAbono}</td>
              <td>{abono.fechaActual}</td>
              <td>{abono.idReserva}</td>
              <td>{abono.recepcionista}</td>
              <td>
                <IconButton onClick={() => handleEditAbono(abono)} aria-label="Done" color="secondary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteAbono(abono)} aria-label="Delete" color="secondary">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEditableAbonos;
