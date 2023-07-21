/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ComandaDatos from './ComandaDatos';
import './ComandaRestaurante.css';
import hotelApi from '../../../api/hotelApi';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';
// import { Button } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
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

  const formContext = useContext(FormContext);

  const { reservaSeleccionada } = formContext;
  console.log(reservaSeleccionada);
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

//* --------------------------------
const validate = () => {
  let isValid = true;
  let errors = {};

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
      console.log(response.data);
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
    console.log(response.data);

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
      console.log('response***********', response.data);
      showSuccessMessage('Formulario creado con exito');
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
      console.log(response.data);
      showSuccessMessage('Formulario Actualizado con Exito');
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


  return (
    <div className="container">
      <div className="inner-box">
        <h1 className="titleConsumo">Comanda de Restaurante y Room Service</h1>
        <ComandaDatos
          onData={handleDataFromChild}
          initialComandaData={initialcomandaRestauranteData || comandaRestauranteData}
          errors={formErrors}
        />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Detalle de consumo</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {comandaRestauranteData.rows.map((row, index) => (
                <tr key={index}>
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
            <AddBox color="primary" fontSize="large" onClick={handleAddRow} />
          </table>
          {/* <button className="button" onClick={handleAddRow}>Añadir fila</button> */}
          <button className="button" onClick={getComandaRestaurante}>Obtener Registro</button>
          <button className="button" onClick={createComandaRestaurante}>Crear Registro</button>
          <button className="button" onClick={handleUpdateComandaRestaurante}>Actualizar Registro</button>
          <button className="button" onClick={deleteComandaRestaurante}>Borrar Registro</button>
          <div className="total">Total: ${comandaRestauranteData.total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default ComandaRestaurante;
