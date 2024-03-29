/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AddBox } from '@material-ui/icons';
import { Button, Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ComandaConsumoDatos from './ComandaConsumoDatos';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';

const ComandaConsumoFrigobar = () => {
  const [initialComandaConsumoData, setInitialComandaConsumoData] = useState(null);
  const [comandaConsumoData, setComandaConsumoData] = useState({
    rows: [{ cantidad: 1, detalle: '', precio: 0 }],
    total: 0,
    numeroHabitacion: '',
    nombrePax: '',
    camarera: '',
    fechaActual: ''
  });

  // Estado para controlar qué botones se deben mostrar
  const [showButtons, setShowButtons] = useState({
    crearRegistro: true,
    actualizarRegistro: false,
    mostrarRegistros: true,
    borrarRegistro: false,
  });

  const history = useHistory();
  const formContext = useContext(FormContext);

  function generateUniqueKey(index) {
    return `row-${index}`;
  }

  const { reservaSeleccionada } = formContext;
  // console.log('reservaSeleccionada**--**', reservaSeleccionada);
    useEffect(() => {
      if (reservaSeleccionada) {
        setComandaConsumoData({
          ...comandaConsumoData,
          numeroHabitacion: reservaSeleccionada.numeroHabitacion,
          nombrePax: reservaSeleccionada.nombreCompleto
        });
      }
   }, [reservaSeleccionada]);


  const [errors, setErrors] = useState({});

  const handleAddRow = () => {
    setComandaConsumoData({
      ...comandaConsumoData,
      rows: [...comandaConsumoData.rows, { cantidad: 1, detalle: '', precio: 0 }]
    });
  };

  //* --------------------------------
  const validate = () => {
  let isValid = true;
  // eslint-disable-next-line no-shadow
  const errors = {};

  // validando numeroHabitacion
  if (!comandaConsumoData.numeroHabitacion) {
    errors.numeroHabitacion = 'Ingrese un número de habitación válido';
    isValid = false;
  }

  // validando nombrePax
  if (!comandaConsumoData.nombrePax) {
    errors.nombrePax = 'Ingrese un nombre de pax válido';
    isValid = false;
  }

  // validando camarera
  if (!comandaConsumoData.camarera) {
    errors.camarera = 'Ingrese una camarera válida';
    isValid = false;
  }

  // validando fechaActual
  if (!comandaConsumoData.fechaActual) {
    errors.fechaActual = 'Ingrese una fecha válida';
    isValid = false;
  }
  setErrors(errors);
  return isValid;
};

const [formErrors, setFormErrors] = useState({});

useEffect(() => {
  setFormErrors(errors);
}, [errors]);

//* -------------

  const handleCalculateSubtotal = () => {
    let sum = 0;
    for (let i = 0; i < comandaConsumoData.rows.length; i++) {
      const cantidad = Number(comandaConsumoData.rows[i].cantidad);
      const precio = Number(comandaConsumoData.rows[i].precio);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(cantidad) && !isNaN(precio)) {
        sum += cantidad * precio;
      }
    }
    setComandaConsumoData({
      ...comandaConsumoData,
      total: sum
    });
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...comandaConsumoData.rows];
    newRows[index][name] = value;
    setComandaConsumoData({
      ...comandaConsumoData,
      rows: newRows
    });
    handleCalculateSubtotal();
  };

  const getComandaConsumoFrigobar = async () => {
    try {
      const response = await hotelApi.get('/comandaConsumoFrigobar');
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      // Aquí se podría mostrar un mensaje de error al usuario
      return null;
    }
  };

  //*-----------------------------------------------

const { comandaFrigobarId } = useParams();
// console.log(comandaFrigobarId);
const getComandaConsumoFrigobarById = async (id) => {
  try {
    const response = await hotelApi.get(`comandaConsumoFrigobar/${id}`);
    // console.log(response.data);

    const { reserva } = response.data;
    const rows = reserva.productos.map((producto) => ({
      cantidad: producto.cantidad,
      detalle: producto.producto,
      precio: producto.precio
    }));

    setComandaConsumoData({
      rows,
      total: reserva.totalConsumo,
      numeroHabitacion: reserva.numeroHabitacion,
      nombrePax: reserva.nombrePax,
      camarera: reserva.camarera,
      fechaActual: reserva.fechaActual
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (comandaFrigobarId) {
    getComandaConsumoFrigobarById(comandaFrigobarId);
  }
}, [comandaFrigobarId]);
  //*-----------------------------------------------
    //* -------------------------------------------

useEffect(() => {
  // Verifica si comandaRestauranteId no es nulo o indefinido
  if (comandaFrigobarId) {
    setShowButtons({
      crearRegistro: false,
      actualizarRegistro: true,
      mostrarRegistros: false,
      borrarRegistro: true,
    });

    // Obtiene los datos para el comandaRestauranteId recibido y actualiza los datos del formulario en consecuencia.
    getComandaConsumoFrigobarById(comandaFrigobarId);
  }
}, [comandaFrigobarId]);
//* -------------------------------------------------

  const handleDataFromChild = (roomNumber, paxName, waiterName, currentDate) => {
    const comandaConsumoDataToSet = initialComandaConsumoData || comandaConsumoData;
  setComandaConsumoData(prevComandaConsumoData => ({
    ...prevComandaConsumoData,
    numeroHabitacion: roomNumber || comandaConsumoDataToSet.numeroHabitacion,
    nombrePax: paxName || comandaConsumoDataToSet.nombrePax,
    camarera: waiterName || comandaConsumoDataToSet.camarera,
    fechaActual: currentDate || comandaConsumoDataToSet.fechaActual
  }));
};

useEffect(() => {
  // console.log('comandaConsumoData***:', comandaConsumoData);
  if (comandaConsumoData) {
    setInitialComandaConsumoData(comandaConsumoData);
  }
}, [comandaConsumoData]);

//* -------------------------------------------------------------------
  const [errorMessage, setErrorMessage] = useState('');

  const createComandaConsumoFrigobar = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
    const data = {
      idReserva: reservaSeleccionada.id,
      numeroHabitacion: comandaConsumoData.numeroHabitacion,
      fechaActual: comandaConsumoData.fechaActual,
      nombrePax: comandaConsumoData.nombrePax,
      camarera: comandaConsumoData.camarera,
      totalConsumo: comandaConsumoData.total,
      productos: comandaConsumoData.rows.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      }))
    };
    try {
      const response = await hotelApi.post('comandaConsumoFrigobar', data);
      // console.log('response***********', response.data);
      showSuccessMessage('Formulario creado con Exito');
      history.push('TablaCalendarioReservas');
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al crear el formulario');
    }
    } else {
      console.log('Hay un error en el FormularioConsumoFrigobar');
    }
  };

//*--------------------------------------------------------------------
const handleUpdateComandaFrigobar = async () => {
  const data = {
    numeroHabitacion: comandaConsumoData.numeroHabitacion,
    fechaActual: comandaConsumoData.fechaActual,
    nombrePax: comandaConsumoData.nombrePax,
    camarera: comandaConsumoData.camarera,
    totalConsumo: comandaConsumoData.total,
    productos: comandaConsumoData.rows.map(row => ({
      producto: row.detalle,
      precio: row.precio,
      cantidad: row.cantidad
    }))
  };

  try {
    const response = await hotelApi.put(`comandaConsumoFrigobar/${comandaFrigobarId}`, data);
    // console.log(response.data);
    showSuccessMessage('Formulario Actualizado con exito');
    history.push({
      pathname: `/app/TablaEditableComandas/${reservaSeleccionada.id}`,
      state: { tipoComanda: 'editarComandasFrigobar' },
    });
  } catch (error) {
    console.error(error);
    showErrorMessage('Error al actualizar el formulario');
  }
};
//*--------------------------------------------------------------------

const deleteComandaFrigobar = async (comandaId) => {
  try {
    const response = await hotelApi.delete(`comandaConsumoFrigobar/${comandaFrigobarId}`);
    // console.log(response.data);
    showSuccessMessage('Formulario Eliminado con exito');
  } catch (error) {
    console.error(error);
    showErrorMessage('Error al eliminar el formulario');
  }
};

const mostrarRegistrosComandaFrigobar = () => {
  history.push({
    pathname: `/app/TablaEditableComandas/${reservaSeleccionada.id}`,
    state: { tipoComanda: 'editarComandasFrigobar' }
  });
};

  return (
    // <div className="container-comandas">
    //   <div className="inner-box-comandas">
    <div className="container-tarjeta-registro">
      <div className="inner-box-tarjeta-registro">
        <h1 className="title-comanda">Comanda Consumo Frigobar</h1>
        <ComandaConsumoDatos
          onData={handleDataFromChild}
          initialComandaData={initialComandaConsumoData || comandaConsumoData}
          errors={formErrors}
        />
        <div className="table-container">
          <table className="table-comanda">
            <thead className="thead-comanda">
              <tr className="tr-comanda">
                <th>Cantidad</th>
                <th>Detalle de consumo</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody className="tbody-comanda">
              {comandaConsumoData.rows.map((row, index) => (
                <tr key={generateUniqueKey(index)}>
                  <td>
                    <input
                      className="input"
                      type="number"
                      min="1"
                      value={row.cantidad}
                      name="cantidad"
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={row.detalle}
                      name="detalle"
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={row.precio}
                      name="precio"
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="container-addicon">
          </div> */}
          <Tooltip title="Agregar una fila" arrow>
            <Fab color="secondary" aria-label="add" onClick={handleAddRow}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <div className="total">Total: ${comandaConsumoData.total.toFixed(2)}</div>
          {/* <Button className="button" onClick={getComandaConsumoFrigobar}>Obtener Registro</Button> */}
          {/* <button className="button-comanda" onClick={createComandaConsumoFrigobar} style={{ display: showButtons.crearRegistro ? 'block' : 'none' }}>Crear Registro</button>
          <button className="button-comanda" onClick={handleUpdateComandaFrigobar} style={{ display: showButtons.actualizarRegistro ? 'block' : 'none' }}>Guardar Cambios</button>
          <button className="button-comanda" onClick={mostrarRegistrosComandaFrigobar} style={{ display: showButtons.mostrarRegistros ? 'block' : 'none' }}>Mostrar Registros</button>
          <button className="button-comanda" onClick={deleteComandaFrigobar} style={{ display: showButtons.borrarRegistro ? 'block' : 'none' }}>Borrar Registro</button> */}
          <div className="container-buttons-comandas" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={createComandaConsumoFrigobar}
              style={{
                display: showButtons.crearRegistro ? 'block' : 'none',
                width: '25%'
              }}
            >
                Enviar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={mostrarRegistrosComandaFrigobar}
              style={{
                display: showButtons.mostrarRegistros ? 'block' : 'none',
                width: '25%'
              }}
            >
              Mostrar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleUpdateComandaFrigobar}
              style={{
                display: showButtons.actualizarRegistro ? 'block' : 'none',
                width: '25%'
            }}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={deleteComandaFrigobar}
              style={{
                display: showButtons.borrarRegistro ? 'block' : 'none',
                width: '25%'
              }}
            >
              Borrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComandaConsumoFrigobar;
