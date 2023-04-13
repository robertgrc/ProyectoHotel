
import React, { useState, useEffect } from 'react';
import DatosLavanderia from './DatosLavanderia';
import './Lavanderia.css';
import hotelApi from '../../../api/hotelApi';

const LavanderiaCopy = () => {
  const [rowsCaballeros, setRowsCaballeros] = useState([
    { cantidad: 0, detalle: 'Abrigos/Overcoats', precio: 30 },
    { cantidad: 0, detalle: 'Pantales cortos/ Shorts', precio: 20 },
    { cantidad: 0, detalle: 'Pantalones/Trousers', precio: 30 },
    { cantidad: 0, detalle: 'Corbatas/Ties', precio: 20 },
    { cantidad: 0, detalle: 'Sacos/Coats', precio: 30 },
    { cantidad: 0, detalle: 'Batas/Robers', precio: 30 },
    { cantidad: 0, detalle: 'Trajes/Suits', precio: 30 },
    { cantidad: 0, detalle: 'Chamarra/Jacket', precio: 30 },
  ]);

  const [rowsDamas, setRowsDamas] = useState([
    { cantidad: 0, detalle: 'Blusas/Blouses', precio: 25 },
    { cantidad: 0, detalle: 'Faldas/Skirts', precio: 35 },
    { cantidad: 0, detalle: 'Batas/Robers', precio: 35 },
    { cantidad: 0, detalle: 'Pantalones/Trousers', precio: 15 },
    { cantidad: 0, detalle: 'Trajes Sastres/Suits', precio: 35 },
    { cantidad: 0, detalle: 'Faldas Plizadas/Evenig gowns', precio: 35 },
    { cantidad: 0, detalle: 'Vestido sencillo/Dry Dresses', precio: 35 },
  ]);

  const [totalCaballeros, setTotalCaballeros] = useState(100);
  const [totalDamas, setTotalDamas] = useState(75);
  const [total, setTotal] = useState('');
  const [numeroHabitacion, setNumeroHabitacion] = useState('');
  const [guestName, setGuestName] = useState('');
  const [recepcionista, setRecepcionista] = useState('');
  const [fechaActual, setFechaActual] = useState('');

  useEffect(() => {
    setTotal(totalCaballeros + totalDamas);
  }, [totalCaballeros, totalDamas]);

  const handleInputChangeCaballeros = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...rowsCaballeros];
    newRows[index][name] = value;
    setRowsCaballeros(newRows);
  };

  const handleInputChangeDamas = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...rowsDamas];
    newRows[index][name] = value;
    setRowsDamas(newRows);
  };

  const handleCalculateSubtotalCaballeros = () => {
    let sum = 0;
    for (let i = 0; i < rowsCaballeros.length; i++) {
      const cantidad = Number(rowsCaballeros[i].cantidad);
      const precio = Number(rowsCaballeros[i].precio);
      if (!isNaN(cantidad) && !isNaN(precio)) {
        sum += cantidad * precio;
      }
    }
    setTotalCaballeros(sum);
  };

  const handleCalculateSubtotalDamas = () => {
    let sum = 0;
    for (let i = 0; i < rowsDamas.length; i++) {
      const cantidad = Number(rowsDamas[i].cantidad);
      const precio = Number(rowsDamas[i].precio);
      if (!isNaN(cantidad) && !isNaN(precio)) {
        sum += cantidad * precio;
      }
    }
    setTotalDamas(sum);
  };
    // Calculamos los subtotales cada vez que cambian los inputs de cantidad
  useEffect(() => {
    handleCalculateSubtotalCaballeros();
  }, [rowsCaballeros]);

  useEffect(() => {
    handleCalculateSubtotalDamas();
  }, [rowsDamas]);

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
    setNumeroHabitacion(roomNumber);
    setGuestName(guestName);
    setRecepcionista(recepcionistaName);
    setFechaActual(currentDate);
  }
  
  const createConsumoCliente = async () => {
    const data = {
      numeroHabitacion: numeroHabitacion,
      fechaActual: fechaActual,
      nombreHuesped: guestName,
      recepcionista: recepcionista,
      totalConsumo: total,
      ListaCaballeros: rowsCaballeros.map(row => ({
        item: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      })),
      ListaDamas: rowsDamas.map(row => ({
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
              {rowsCaballeros.map((row, index) => (
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
                <td>${totalCaballeros}</td>
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
              {rowsDamas.map((row, index) => (
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
                <td>${totalDamas}</td>
              </tr>
              <tr>
                <td colSpan="2">Total</td>
                <td>${totalCaballeros + totalDamas}</td>
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

export default LavanderiaCopy;
