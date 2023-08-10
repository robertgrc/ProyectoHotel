/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import DatosLavanderia from './DatosLavanderia';
import './Lavanderia.css';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';

const Lavanderia = () => {
  const [initialLavanderiaData, setInitialLavanderiaData] = useState(null);
  const [lavanderiaData, setLavanderiaData] = useState({
    rowsCaballeros: [
      { cantidad: 0, detalle: 'Abrigos/Overcoats', precio: 30 },
      { cantidad: 0, detalle: 'Pantales cortos/ Shorts', precio: 20 },
      { cantidad: 0, detalle: 'Pantalones/Trousers', precio: 30 },
      { cantidad: 0, detalle: 'Corbatas/Ties', precio: 20 },
      { cantidad: 0, detalle: 'Sacos/Coats', precio: 30 },
      { cantidad: 0, detalle: 'Batas/Robers', precio: 30 },
      { cantidad: 0, detalle: 'Trajes/Suits', precio: 30 },
      { cantidad: 0, detalle: 'Chamarra/Jacket', precio: 30 },
    ],
    rowsDamas: [
      { cantidad: 0, detalle: 'Blusas/Blouses', precio: 25 },
      { cantidad: 0, detalle: 'Faldas/Skirts', precio: 35 },
      { cantidad: 0, detalle: 'Batas/Robers', precio: 35 },
      { cantidad: 0, detalle: 'Pantalones/Trousers', precio: 15 },
      { cantidad: 0, detalle: 'Trajes Sastres/Suits', precio: 35 },
      { cantidad: 0, detalle: 'Faldas Plizadas/Evenig gowns', precio: 35 },
      { cantidad: 0, detalle: 'Vestido sencillo/Dry Dresses', precio: 35 },
    ],
      totalCaballeros: '',
      totalDamas: '',
      totalConsumo: '',
      numeroHabitacion: '',
      nombreHuesped: '',
      recepcionista: '',
      fechaActual: ''
  });
  const history = useHistory();
  const formContext = useContext(FormContext);

  const { reservaSeleccionada } = formContext;

  const [errors, setErrors] = useState({});

  function generateUniqueKey(index) {
    return `row-${index}`;
  }

  // Estado para controlar qué botones se deben mostrar
  const [showButtons, setShowButtons] = useState({
    crearRegistro: true,
    actualizarRegistro: false,
    mostrarRegistros: true,
    borrarRegistro: false,
  });

  useEffect(() => {
    setLavanderiaData((prevData) => ({
      ...prevData,
      totalConsumo: prevData.totalCaballeros + prevData.totalDamas,
    }));
  }, [lavanderiaData.totalCaballeros, lavanderiaData.totalDamas]);

  const handleInputChangeCaballeros = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...lavanderiaData.rowsCaballeros];
    newRows[index] = { ...newRows[index], [name]: value }; // Clonación profunda del objeto modificado
    setLavanderiaData((prevData) => ({
      ...prevData,
      rowsCaballeros: newRows,
    }));
  };

  const handleCalculateSubtotalCaballeros = () => {
    const sum = lavanderiaData.rowsCaballeros.reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);
    setLavanderiaData({
      ...lavanderiaData,
      totalCaballeros: sum
    });
  };

  const handleCalculateSubtotalDamas = () => {
    const sum = lavanderiaData.rowsDamas.reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);
    setLavanderiaData({
      ...lavanderiaData,
      totalDamas: sum
    });
  };

  const handleInputChangeDamas = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...lavanderiaData.rowsDamas];
    newRows[index] = { ...newRows[index], [name]: value }; // Clonación profunda del objeto modificado
    setLavanderiaData((prevData) => ({
      ...prevData,
      rowsDamas: newRows,
    }));
  };

  useEffect(() => {
    handleCalculateSubtotalCaballeros();
  }, [lavanderiaData.rowsCaballeros]);

  useEffect(() => {
    handleCalculateSubtotalDamas();
  }, [lavanderiaData.rowsDamas]);

  //* --------------------------------
const validate = () => {
  let isValid = true;
  // eslint-disable-next-line no-shadow
  const errors = {};

  // validando numeroHabitacion
  if (!lavanderiaData.numeroHabitacion) {
    errors.numeroHabitacion = 'Ingrese un número de habitación válido';
    isValid = false;
  }

  // validando nombreHuesped
  if (!lavanderiaData.nombreHuesped) {
    errors.nombreHuesped = 'Ingrese un nombre de huesped válido';
    isValid = false;
  }

  // validando recepcionista
  if (!lavanderiaData.recepcionista) {
    errors.recepcionista = 'Ingrese un recepcionista válido';
    isValid = false;
  }

  // validando fechaActual
  if (!lavanderiaData.fechaActual) {
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


  //*-------------------------------
  const getRegistroGastosLavanderia = async () => {
    try {
      const response = await hotelApi.get('lavanderia');
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  function handleDataFromChild(roomNumber, paxName, recepcionista, currentDate) {
    setLavanderiaData(prevLavanderiaData => ({
      ...prevLavanderiaData,
      numeroHabitacion: roomNumber || prevLavanderiaData.numeroHabitacion,
      nombreHuesped: paxName || prevLavanderiaData.nombreHuesped,
      recepcionista: recepcionista || prevLavanderiaData.recepcionista,
      fechaActual: currentDate || prevLavanderiaData.fechaActual
    }));
  }

  useEffect(() => {
    // console.log('dataLavanderia***:', lavanderiaData);
    if (lavanderiaData) {
      setInitialLavanderiaData(lavanderiaData);
    }
  }, [lavanderiaData]);

  //*-------------------------------------------------------------
  const [errorMessage, setErrorMessage] = useState('');
  const { registroLavanderiaId } = useParams();

  const createRegistroGastosLavanderia = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
    const rowsCaballerosFiltrados = lavanderiaData.rowsCaballeros.filter(row => row.cantidad > 0);
    // console.log(rowsCaballerosFiltrados);
    const rowsDamasFiltrados = lavanderiaData.rowsDamas.filter(row => row.cantidad > 0);
    // console.log(rowsDamasFiltrados);
    const data = {
      idReserva: reservaSeleccionada.id,
      numeroHabitacion: lavanderiaData.numeroHabitacion,
      fechaActual: lavanderiaData.fechaActual,
      nombreHuesped: lavanderiaData.nombreHuesped,
      recepcionista: lavanderiaData.recepcionista,
      totalConsumo: lavanderiaData.totalConsumo,
      totalCaballeros: lavanderiaData.totalCaballeros,
      totalDamas: lavanderiaData.totalDamas,
      ListaCaballeros: rowsCaballerosFiltrados.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      })),
      ListaDamas: rowsDamasFiltrados.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      }))
    };
    try {
      const response = await hotelApi.post('/lavanderia', data);
      // console.log(response);
      showSuccessMessage('Formulario creado con Exito');
      history.push('TablaCalendarioReservas');
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al crear el formulario');
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  } else {
    console.log('Hay un error en el Formulario de Lavanderia');
    setErrorMessage('Hay un error en el formulario');
  }
  };
//*---------------------------------------------------------------
const getRegistroLavanderiaById = async (id) => {
  try {
    const response = await hotelApi.get(`lavanderia/${id}`);
    // console.log('responseRegistroLavanderia', response);
    // console.log('responseRegistroLavanderia.data', response.data);
    const { reserva } = response.data;

    const rowsCaballeros = reserva.ListaCaballeros.map((producto) => ({
      cantidad: producto.cantidad,
      detalle: producto.producto,
      precio: producto.precio,
    }));

    const rowsDamas = reserva.ListaDamas.map((producto) => ({
      cantidad: producto.cantidad,
      detalle: producto.producto,
      precio: producto.precio,
    }));

    setLavanderiaData({
      rowsCaballeros,
      rowsDamas,
      totalCaballeros: reserva.totalCaballeros,
      totalDamas: reserva.totalDamas,
      totalConsumo: reserva.totalConsumo,
      numeroHabitacion: reserva.numeroHabitacion,
      nombreHuesped: reserva.nombreHuesped,
      recepcionista: reserva.recepcionista,
      fechaActual: reserva.fechaActual,
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (registroLavanderiaId) {
    getRegistroLavanderiaById(registroLavanderiaId);
  }
}, [registroLavanderiaId]);

//* ---------------------------------------------------------------

useEffect(() => {
  // Verifica si comandaRestauranteId no es nulo o indefinido
  if (registroLavanderiaId) {
    setShowButtons({
      crearRegistro: false,
      actualizarRegistro: true,
      mostrarRegistros: false,
      borrarRegistro: true,
    });

    // Obtiene los datos para el comandaRestauranteId recibido y actualiza los datos del formulario en consecuencia.
    getRegistroLavanderiaById(registroLavanderiaId);
  }
}, [registroLavanderiaId]);
//* -------------------------------------------------
  const handleUpdateRegistroLavanderia = async () => {
    const data = {
      numeroHabitacion: lavanderiaData.numeroHabitacion,
      fechaActual: lavanderiaData.fechaActual,
      nombreHuesped: lavanderiaData.nombreHuesped,
      recepcionista: lavanderiaData.recepcionista,
      totalConsumo: lavanderiaData.totalConsumo,
      totalCaballeros: lavanderiaData.totalCaballeros,
      totalDamas: lavanderiaData.totalDamas,
      listaCaballeros: lavanderiaData.rowsCaballeros.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      })),
      listaDamas: lavanderiaData.rowsDamas.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      }))
    };
    try {
      const response = await hotelApi.put(`lavanderia/${registroLavanderiaId}`, data);
      // console.log(response.data);
      showSuccessMessage('Registro de Lavanderia Actualizado con Exito');
      history.push({
        pathname: `/app/TablaEditableComandas/${reservaSeleccionada.id}`,
        state: { tipoComanda: 'editarComandasLavanderia' },
      });
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al Actualizar el registro de Lavanderia');
    }
  };

//* ---------------------------------------------------------------
const deleteRegistroLavanderia = async (lavanderiaId) => {
  try {
    const response = await hotelApi.delete(`lavanderia/${registroLavanderiaId}`);
    // console.log(response.data);
    showSuccessMessage('Registro de Lavanderia Eliminado con Exito');
  } catch (error) {
    console.error(error);
    showErrorMessage('Error al eliminar el Registro de Lavanderia');
  }
};

const mostrarRegistrosComandasLavanderia = () => {
  history.push({
    pathname: `/app/TablaEditableComandas/${reservaSeleccionada.id}`,
    state: { tipoComanda: 'editarComandasLavanderia' }
  });
};

  return (
    <div className="container-lavanderia">
      <div className="inner-container-lavanderia">
        <h1 className="title-comanda-lavanderia">Lista para Lavanderia</h1>
        <DatosLavanderia
          onData={handleDataFromChild}
          initialComandaData={initialLavanderiaData}
          errors={formErrors}
        />
        <div>
          {/* <table>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Caballeros / Gentlemen</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {lavanderiaData.rowsCaballeros.map((row, index) => (
                <tr key={generateUniqueKey(index)}>
                  <td>
                    <input
                      className="input-lavanderia"
                      type="number"
                      min="1"
                      value={row.cantidad}
                      name="cantidad"
                      onChange={(event) => handleInputChangeCaballeros(event, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-lavanderia"
                      type="text"
                      value={row.detalle}
                      name="detalle"
                      readOnly
                    />
                  </td>
                  <td className="input-precio">${row.precio}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">Subtotal Caballeros</td>
                <td>${lavanderiaData.totalCaballeros}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Damas / Ladies</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {lavanderiaData.rowsDamas.map((row, index) => (
                <tr key={generateUniqueKey(index)}>
                  <td>
                    <input
                      className="input-lavanderia"
                      type="number"
                      min="1"
                      value={row.cantidad}
                      name="cantidad"
                      onChange={(event) => handleInputChangeDamas(event, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-lavanderia"
                      type="text"
                      value={row.detalle}
                      name="detalle"
                      readOnly
                    />
                  </td>
                  <td>${row.precio}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">Subtotal Damas</td>
                <td>${lavanderiaData.totalDamas}</td>
              </tr>
              <tr>
                <td colSpan="2">Total</td>
                <td>${lavanderiaData.totalCaballeros + lavanderiaData.totalDamas}</td>
              </tr>
            </tbody>
          </table> */}
          <table className="tabla-lavanderia">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Caballeros</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Damas</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {lavanderiaData.rowsCaballeros.map((rowCaballero, index) => (
                <tr key={generateUniqueKey(index)}>
                  <td>
                    <input
                      className="input-lavanderia"
                      type="number"
                      min="1"
                      value={rowCaballero.cantidad}
                      name="cantidad"
                      onChange={(event) => handleInputChangeCaballeros(event, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-lavanderia"
                      type="text"
                      value={rowCaballero.detalle}
                      name="detalle"
                      readOnly
                    />
                  </td>
                  <td className="input-precio">${rowCaballero.precio}</td>
                  {lavanderiaData.rowsDamas[index] && (
                    <>
                      <td>
                        <input
                          className="input-lavanderia"
                          type="number"
                          min="1"
                          value={lavanderiaData.rowsDamas[index].cantidad}
                          name="cantidad"
                          onChange={(event) => handleInputChangeDamas(event, index)}
                        />
                      </td>
                      <td>
                        <input
                          className="input-lavanderia"
                          type="text"
                          value={lavanderiaData.rowsDamas[index].detalle}
                          name="detalle"
                          readOnly
                        />
                      </td>
                      <td>${lavanderiaData.rowsDamas[index].precio}</td>
                    </>
                  )}
                </tr>
              ))}
              <tr>
                <td colSpan="3">Subtotal Caballeros</td>
                <td colSpan="3">${lavanderiaData.totalCaballeros}</td>
              </tr>
              <tr>
                <td colSpan="3">Subtotal Damas</td>
                <td colSpan="3">${lavanderiaData.totalDamas}</td>
              </tr>
              <tr>
                <td colSpan="3">Total</td>
                <td colSpan="3">${lavanderiaData.totalCaballeros + lavanderiaData.totalDamas}</td>
              </tr>
            </tbody>
          </table>
          {/* <Button className="button" onClick={getRegistroGastosLavanderia}>Obtener Registro</Button> */}
          <button className="button-comanda-lavanderia" onClick={createRegistroGastosLavanderia} style={{ display: showButtons.crearRegistro ? 'block' : 'none' }}>Crear Registro</button>
          <button className="button-comanda-lavanderia" onClick={handleUpdateRegistroLavanderia} style={{ display: showButtons.actualizarRegistro ? 'block' : 'none' }}>Guardar Cambios</button>
          <button className="button-comanda-lavanderia" onClick={mostrarRegistrosComandasLavanderia} style={{ display: showButtons.mostrarRegistros ? 'block' : 'none' }}>Mostrar Registros</button>
          <button className="button-comanda-lavanderia" onClick={deleteRegistroLavanderia} style={{ display: showButtons.borrarRegistro ? 'block' : 'none' }}>Borrar Registro</button>
        </div>
      </div>
    </div>
  );
};

export default Lavanderia;
