/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import { AddBox } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useParams, useHistory } from 'react-router-dom';
import ComandaDatos from './ComandaDatos';
import './ComandaRestaurante.css';
import hotelApi from '../../../api/hotelApi';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';
import FormContext from '../../../context/FormProvider';

function ComandaRestaurante() {
  const [initialcomandaRestauranteData, setInitialcomandaRestauranteData] = useState(null);
  const [comandaRestauranteData, setcomandaRestauranteData] = useState({
    rows: [{ cantidad: 1, detalle: '', precio: 0 }],
    total: 0,
    numeroHabitacion: '',
    nombrePax: '',
    mesero: '',
    fechaActual: '',
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
    useEffect(() => {
      if (reservaSeleccionada) {
        setcomandaRestauranteData({
          ...comandaRestauranteData,
          numeroHabitacion: reservaSeleccionada.numeroHabitacion,
          nombrePax: reservaSeleccionada.nombreCompleto
        });
      }
   }, [reservaSeleccionada]);

  const [errors, setErrors] = useState({});

  const handleAddRow = () => {
    setcomandaRestauranteData({
      ...comandaRestauranteData,
      rows: [...comandaRestauranteData.rows, { cantidad: 1, detalle: '', precio: 0 }]
    });
  };


const validate = () => {
  let isValid = true;
  // eslint-disable-next-line no-shadow
  const errors = {};

  // validando numeroHabitacion
  if (!comandaRestauranteData.numeroHabitacion) {
    errors.numeroHabitacion = 'Ingrese un número de habitación válido';
    isValid = false;
  }

  // validando nombrePax
  if (!comandaRestauranteData.nombrePax) {
    errors.nombrePax = 'Ingrese un nombre de pax válido';
    isValid = false;
  }

  // validando mesero
  if (!comandaRestauranteData.mesero) {
    errors.mesero = 'Ingrese un mesero válido';
    isValid = false;
  }

  // validando fechaActual
  if (!comandaRestauranteData.fechaActual) {
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
    for (let i = 0; i < comandaRestauranteData.rows.length; i++) {
      const cantidad = Number(comandaRestauranteData.rows[i].cantidad);
      const precio = Number(comandaRestauranteData.rows[i].precio);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(cantidad) && !isNaN(precio)) {
        sum += cantidad * precio;
      }
    }
    setcomandaRestauranteData({
      ...comandaRestauranteData,
      total: sum
    });
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...comandaRestauranteData.rows];
    newRows[index][name] = value;
    setcomandaRestauranteData({
      ...comandaRestauranteData,
      rows: newRows
    });
    handleCalculateSubtotal();
  };

  const getComandaRestaurante = async () => {
    try {
      const response = await hotelApi.get('/comandaRestaurante');
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  //* -------------------------------------------
  const { comandaRestauranteId } = useParams();
// console.log(comandaRestauranteId);
const getComandaRestauranteById = async (id) => {
  try {
    const response = await hotelApi.get(`comandaRestaurante/${id}`);
    // console.log(response.data);

    const { reserva } = response.data;
    const rows = reserva.productos.map((producto) => ({
      cantidad: producto.cantidad,
      detalle: producto.producto,
      precio: producto.precio
    }));

    setcomandaRestauranteData({
      rows,
      total: reserva.totalConsumo,
      numeroHabitacion: reserva.numeroHabitacion,
      nombrePax: reserva.nombrePax,
      mesero: reserva.mesero,
      fechaActual: reserva.fechaActual
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (comandaRestauranteId) {
    getComandaRestauranteById(comandaRestauranteId);
  }
}, [comandaRestauranteId]);
  //* -------------------------------------------

useEffect(() => {
  // Verifica si comandaRestauranteId no es nulo o indefinido
  if (comandaRestauranteId) {
    setShowButtons({
      crearRegistro: false,
      actualizarRegistro: true,
      mostrarRegistros: false,
      borrarRegistro: true,
    });

    // Obtiene los datos para el comandaRestauranteId recibido y actualiza los datos del formulario en consecuencia.
    getComandaRestauranteById(comandaRestauranteId);
  }
}, [comandaRestauranteId]);
//* -------------------------------------------------

  const handleDataFromChild = (roomNumber, paxName, meseroName, currentDate) => {
    const comandaRestauranteDataToSet = initialcomandaRestauranteData || comandaRestauranteData;
  setcomandaRestauranteData(prevcomandaRestauranteData => ({
    ...prevcomandaRestauranteData,
    numeroHabitacion: roomNumber || comandaRestauranteDataToSet.numeroHabitacion,
    nombrePax: paxName || comandaRestauranteDataToSet.nombrePax,
    mesero: meseroName || comandaRestauranteDataToSet.mesero,
    fechaActual: currentDate || comandaRestauranteDataToSet.fechaActual
  }));
};

useEffect(() => {
  if (comandaRestauranteData) {
    setInitialcomandaRestauranteData(comandaRestauranteData);
  }
}, [comandaRestauranteData]);

//* --------------------------------------------------------
  const [errorMessage, setErrorMessage] = useState('');

  const createComandaRestaurante = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
    const data = {
      idReserva: reservaSeleccionada.id,
      numeroHabitacion: comandaRestauranteData.numeroHabitacion,
      fechaActual: comandaRestauranteData.fechaActual,
      nombrePax: comandaRestauranteData.nombrePax,
      mesero: comandaRestauranteData.mesero,
      totalConsumo: comandaRestauranteData.total,
      productos: comandaRestauranteData.rows.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      }))
    };
    try {
      const response = await hotelApi.post('/comandaRestaurante', data);
      // console.log('response***********', response.data);
      showSuccessMessage('Formulario creado con exito');
      history.push('TablaCalendarioReservas');
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al enviar el formulario');
    }
    } else {
    console.log('Hay un error en el Formulario');
    showErrorMessage('Hay un error en el formulario');
  }
  };

  //* ----------------------------------------------
  const handleUpdateComandaRestaurante = async () => {
    const data = {
      numeroHabitacion: comandaRestauranteData.numeroHabitacion,
      fechaActual: comandaRestauranteData.fechaActual,
      nombrePax: comandaRestauranteData.nombrePax,
      mesero: comandaRestauranteData.mesero,
      totalConsumo: comandaRestauranteData.total,
      productos: comandaRestauranteData.rows.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      }))
    };

    try {
      const response = await hotelApi.put(`comandaRestaurante/${comandaRestauranteId}`, data);
      // console.log(response.data);
      showSuccessMessage('Formulario Actualizado con Exito');
      history.push({
        pathname: `/app/TablaEditableComandas/${reservaSeleccionada.id}`,
        state: { tipoComanda: 'editarComandasRestaurante' },
      });
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al Actualizar el Formulario');
    }
  };

  //*-------------------------------------------------
  const deleteComandaRestaurante = async (comandaId) => {
    try {
      const response = await hotelApi.delete(`comandaRestaurante/${comandaRestauranteId}`);
      console.log(response.data);
      showSuccessMessage('Formulario Eliminado con Exito');
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al eliminar el Formulario');
    }
  };

  const mostrarRegistrosComandasRestaurante = () => {
    history.push({
      pathname: `/app/TablaEditableComandas/${reservaSeleccionada.id}`,
      state: { tipoComanda: 'editarComandasRestaurante' }
    });
  };

  return (
    <div className="container-tarjeta-registro">
      <div className="inner-box-tarjeta-registro">
        <h1 className="title-comanda">Comanda de Restaurante</h1>
        <ComandaDatos
          onData={handleDataFromChild}
          initialComandaData={initialcomandaRestauranteData || comandaRestauranteData}
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
              {comandaRestauranteData.rows.map((row, index) => (

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
          <Fab color="primary" aria-label="add" onClick={handleAddRow}>
            <AddIcon />
          </Fab>
          <div className="total">Total: ${comandaRestauranteData.total.toFixed(2)}</div>
          {/* <button className="button" onClick={getComandaRestaurante}>Obtener Registro</button> */}
          {/* <button className="button-comanda" onClick={createComandaRestaurante} style={{ display: showButtons.crearRegistro ? 'block' : 'none' }}>Crear Registro</button>
          <button className="button-comanda" onClick={handleUpdateComandaRestaurante} style={{ display: showButtons.actualizarRegistro ? 'block' : 'none' }}>Guardar Cambios</button>
          <button className="button-comanda" onClick={mostrarRegistrosComandasRestaurante} style={{ display: showButtons.mostrarRegistros ? 'block' : 'none' }}>Mostrar Registros</button>
          <button className="button-comanda" onClick={deleteComandaRestaurante} style={{ display: showButtons.borrarRegistro ? 'block' : 'none' }}>Borrar Registro</button> */}
          <div className="container-buttons-comandas">
            <Button variant="contained" color="secondary" onClick={createComandaRestaurante} style={{ display: showButtons.crearRegistro ? 'block' : 'none' }}>Enviar</Button>
            <Button variant="contained" color="secondary" onClick={mostrarRegistrosComandasRestaurante} style={{ display: showButtons.mostrarRegistros ? 'block' : 'none' }}>Mostrar </Button>
            <Button variant="contained" color="secondary" onClick={handleUpdateComandaRestaurante} style={{ display: showButtons.actualizarRegistro ? 'block' : 'none' }}>Guardar</Button>
            <Button variant="contained" color="secondary" onClick={deleteComandaRestaurante} style={{ display: showButtons.borrarRegistro ? 'block' : 'none' }}>Borrar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComandaRestaurante;
