import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import hotelApi from '../../../api/hotelApi';
import TablaEditable from './TablaEditable';
import { showErrorMessage, ShowQuestionSureDelete, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';


const TablaEditableComandas = () => {
    const history = useHistory();
    const location = useLocation();
    const reservaSeleccionadaId = location.pathname.split('/').pop();
    const tipoComanda = location.state && location.state.tipoComanda ? location.state.tipoComanda : '';
    console.log('reservaSeleccionadaId', reservaSeleccionadaId);
    console.log('Tipo de comanda:', tipoComanda);

    const [backendData, setBackendData] = useState([]);
    const [hasCaballeros, setHasCaballeros] = useState(false);
    const [hasDamas, setHasDamas] = useState(false);

    // const [comandasData, setComandasData] = useState([]);
    useEffect(() => {
      // Make the API call to the appropriate endpoint based on `tipoComanda`
      if (reservaSeleccionadaId) {
        hotelApi.get(`/${tipoComanda}/${reservaSeleccionadaId}`)
          .then((response) => {
            setBackendData(response.data || []);
          })
          .catch((error) => {
            console.error('Error fetching data from the backend:', error);
          });
      }
    }, [reservaSeleccionadaId, tipoComanda]);

    const updateTableData = (comandaId) => {
        window.location.reload();
    };
        const comandas = (backendData.comandasRestaurante || backendData.comandaFrigobar || backendData.comandaConsumoCliente || backendData.comandaLavanderia || []).map((comanda) => {
          const { numeroHabitacion, id } = comanda;
          const nombrePax = comanda.nombrePax || comanda.nombreHuesped;
          const mesero = comanda.mesero || comanda.camarera || comanda.recepcionista;
          const fechaCreacion = comanda.fechaActual;
          const monto = comanda.totalConsumo;
          // Comprueba si la comanda es de tipo 'comandaLavanderia' y maneja la estructura anidada
          let detalle = '';
          if (comanda.ListaCaballeros && comanda.ListaCaballeros.length > 0) {
            detalle += 'Ropa caballeros, ';
          }
          if (comanda.ListaDamas && comanda.ListaDamas.length > 0) {
            detalle += 'Ropa damas, ';
          }
          if (detalle === '') {
            detalle = comanda.productos && comanda.productos.length > 0 ? comanda.productos[0].producto : '';
          } else {
            detalle = detalle.slice(0, -2); // Eliminar la última coma y espacio
          }

          return {
            nombrePax,
            mesero,
            detalle,
            monto,
            id,
            numeroHabitacion,
            fechaCreacion
          };
        });

    const handleEditComanda = (comanda) => {
        console.log('Editar comanda:', comanda);
        console.log('Tipo de comanda:', tipoComanda);
        // Redirigir a la ruta correspondiente según el tipo de comanda
        switch (tipoComanda) {
          case 'editarComandasFrigobar':
            history.push(`/app/ComandaConsumoFrigobar/${comanda.id}`);
            break;
          case 'editarComandasRestaurante':
            history.push(`/app/ComandaRestaurante/${comanda.id}`);
            break;
          case 'editarComandasConsumoCliente':
            history.push(`/app/ConsumoCliente/${comanda.id}`);
            break;
          case 'editarComandasLavanderia':
            history.push(`/app/Lavanderia/${comanda.id}`);
            break;
          default:
            break;
        }
      };

      const deleteComandaFrigobar = async (comandaId) => {
        try {
          // Mostrar el mensaje de confirmación y esperar la respuesta del usuario
          const result = await ShowQuestionSureDelete(
            '¿Está seguro que desea borrar la ComandaConsumoFrigobar?',
            async () => {
              // Si el usuario confirma, proceder con la eliminación
              const response = await hotelApi.delete(`comandaConsumoFrigobar/${comandaId}`);
              console.log(response.data);
              // Actualizar la tabla después de eliminar el elemento
              updateTableData(comandaId);
            }
          );
          console.log(result);
          if (!result.isConfirmed) {
            console.log('Borrado cancelado por el usuario');
          }
        } catch (error) {
          console.error(error);
          showErrorMessage('Error al eliminar el formulario de comandaConsumoFrigobar');
        }
      };

      const deleteComandaRestaurante = async (comandaId) => {
        try {
          // Mostrar el mensaje de confirmación y esperar la respuesta del usuario
          const result = await ShowQuestionSureDelete(
            '¿Está seguro que desea borrar la ComandaRestaurante?',
            async () => {
              // Si el usuario confirma, proceder con la eliminación
              const response = await hotelApi.delete(`comandaRestaurante/${comandaId}`);
              console.log(response.data);
              // Actualizar la tabla después de eliminar el elemento
              updateTableData(comandaId);
            }
          );
          console.log(result);
          if (!result.isConfirmed) {
            console.log('Borrado cancelado por el usuario');
          }
        } catch (error) {
          console.error(error);
          showErrorMessage('Error al eliminar el formulario de ComandaRestaurante');
        }
      };

      const deleteComandaConsumoExtra = async (comandaId) => {
        try {
          // Mostrar el mensaje de confirmación y esperar la respuesta del usuario
          const result = await ShowQuestionSureDelete(
            '¿Está seguro que desea borrar la ComandaConsumoExtra?',
            async () => {
              // Si el usuario confirma, proceder con la eliminación
              const response = await hotelApi.delete(`consumoCliente/${comandaId}`);
              console.log(response.data);
              // Actualizar la tabla después de eliminar el elemento
              updateTableData(comandaId);
            }
          );
          console.log(result);
          if (!result.isConfirmed) {
            console.log('Borrado cancelado por el usuario');
          }
        } catch (error) {
          console.error(error);
          showErrorMessage('Error al eliminar el formulario de comandaConsumoExtra');
        }
      };
      const deleteComandaLavanderia = async (comandaId) => {
        try {
          // Mostrar el mensaje de confirmación y esperar la respuesta del usuario
          const result = await ShowQuestionSureDelete(
            '¿Está seguro que desea borrar la ComandaLavanderia?',
            async () => {
              // Si el usuario confirma, proceder con la eliminación
              const response = await hotelApi.delete(`Lavanderia/${comandaId}`);
              console.log(response.data);
              // Actualizar la tabla después de eliminar el elemento
              updateTableData(comandaId);
            }
          );
          console.log(result);
          if (!result.isConfirmed) {
            console.log('Borrado cancelado por el usuario');
          }
        } catch (error) {
          console.error(error);
          showErrorMessage('Error al eliminar el formulario de comandaLavanderia');
        }
      };

      const handleDeleteComanda = (comanda) => {
        console.log('Borrar comanda:', comanda);
        console.log('Tipo de comanda:', tipoComanda);

        switch (tipoComanda) {
          case 'editarComandasFrigobar':
            deleteComandaFrigobar(comanda.id);
            break;
          case 'editarComandasRestaurante':
            deleteComandaRestaurante(comanda.id);
            break;
          case 'editarComandasConsumoCliente':
            deleteComandaConsumoExtra(comanda.id);
            break;
          case 'editarComandasLavanderia':
            deleteComandaLavanderia(comanda.id);
            break;
          default:
            break;
        }
      };

    console.log(backendData);
  return (
    <>
      <Toolbar>
        <div>
          <Typography variant="h6">Tabla Editable de Comandas</Typography>
        </div>
      </Toolbar>
      <TablaEditable comandas={comandas} onEdit={handleEditComanda} onDelete={handleDeleteComanda} />
    </>
  );
};

export default TablaEditableComandas;
