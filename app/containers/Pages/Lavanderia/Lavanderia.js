
import React, { useState, useEffect } from 'react';
import DatosLavanderia from './DatosLavanderia';
import './Lavanderia.css';
import hotelApi from '../../../api/hotelApi';

// eslint-disable-next-line padded-blocks
const Lavanderia = () => {
  const [initialValues, setInitialValues] = useState(null);
  const [values, setValues] = useState({
    rows: [{ cantidad: 1, detalle: '', precio: 0 }],
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
      totalCaballeros: 100,
      totalDamas: 75,
      total: '',
      numeroHabitacion: '',
      guestName: '',
      recepcionista: '',
      fechaActual: ''
  });

  useEffect(() => {
    const sum = values.rowsCaballeros.reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
            + values.rowsDamas.reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);
    setValues({
      ...values,
      total: sum
    });
  }, [values.rowsCaballeros, values.rowsDamas]);

  const handleInputChangeCaballeros = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...values.rowsCaballeros];
    newRows[index][name] = value;
    setValues({
      ...values,
      rowsCaballeros: newRows
    });
  };
  const handleInputChangeDamas = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...values.rowsDamas];
    newRows[index][name] = value;
    setValues({
      ...values,
      rowsDamas: newRows
    });
  };

  const handleCalculateSubtotalCaballeros = () => {
    const sum = values.rowsCaballeros.reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);
    setValues({
      ...values,
      totalCaballeros: sum
    });
  };

  const handleCalculateSubtotalDamas = () => {
    const sum = values.rowsDamas.reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);
    setValues({
      ...values,
      totalDamas: sum
    });
  };

  useEffect(() => {
    handleCalculateSubtotalCaballeros();
  }, [values.rowsCaballeros]);

  useEffect(() => {
    handleCalculateSubtotalDamas();
  }, [values.rowsDamas]);

  //*-------------------------------
  // const API_BASE_URL = 'http://localhost:4000/api';
  const getConsumoCliente = async () => {
    try {
      const response = await hotelApi.get('lavanderia');
      // const response = await axios.get(`${API_BASE_URL}/lavanderia`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      // Aquí se podría mostrar un mensaje de error al usuario
      return null;
    }
  };

  function handleDataFromChild(roomNumber, guestName, recepcionistaName, currentDate) {
    const valuesToSet = initialValues || values;
    setValues(prevValues => ({
      ...prevValues,
      numeroHabitacion: roomNumber || valuesToSet.numeroHabitacion,
      nombrePax: guestName || valuesToSet.nombrePax,
      recepcionista: recepcionistaName || valuesToSet.recepcionista,
      fechaActual: currentDate || valuesToSet.fechaActual
    }));
  }

  const createConsumoCliente = async () => {
    const data = {
      numeroHabitacion: values.numeroHabitacion,
      fechaActual: values.fechaActual,
      nombreHuesped: values.guestName,
      recepcionista: values.recepcionista,
      totalConsumo: values.total,
      ListaCaballeros: values.rowsCaballeros.map(row => ({
        item: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      })),
      ListaDamas: values.rowsDamas.map(row => ({
        item: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      }))
    };
    try {
      const response = await hotelApi.post('/lavanderia', data);
      console.log(response);
    } catch (error) {
      console.error(error);
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  };


  return (
    <div className="container-lavanderia">
      <div className="inner-container-lavanderia">
        <h1 className="titleLavanderia">Lista para Lavanderia</h1>
        <DatosLavanderia onData={handleDataFromChild} />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Caballeros / Gentlemen</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {values.rowsCaballeros.map((row, index) => (
                <tr key={index}>
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
                  <td className='input-precio'>${row.precio}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">Subtotal Caballeros</td>
                <td>${values.totalCaballeros}</td>
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
              {values.rowsDamas.map((row, index) => (
                <tr key={index}>
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
                <td>${values.totalDamas}</td>
              </tr>
              <tr>
                <td colSpan="2">Total</td>
                <td>${values.totalCaballeros + values.totalDamas}</td>
              </tr>
            </tbody>
          </table>
          <button className="button" onClick={getConsumoCliente}>Obtener Registro</button>
          <button className="button" onClick={createConsumoCliente}>Crear Registro</button>
        </div>
      </div>
    </div>
  );
};

export default Lavanderia;
