import React, { useState } from 'react';
import axios from 'axios';
import './ConsumoCliente.css';
import ReservationForm from './ReservationForm';
import hotelApi from '../../../api/hotelApi';

function ConsumoCliente() {
  const [rows, setRows] = useState([{ cantidad: 1, detalle: '', precio: 0 }]);
  const [total, setTotal] = useState(0);
  const [numeroHabitacion, setNumeroHabitacion] = useState('');
  const [nombrePax, setNombrePax] = useState('');
  const [recepcionista, setRecepcionista] = useState('');
  const [fechaActual, setFechaActual] = useState('');

  const handleAddRow = () => {
    setRows([...rows, { cantidad: 1, detalle: '', precio: 0 }]);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
    handleCalculateSubtotal();
  };

  const handleCalculateSubtotal = () => {
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
      const cantidad = Number(rows[i].cantidad);
      const precio = Number(rows[i].precio);
      if (!isNaN(cantidad) && !isNaN(precio)) {
        sum += cantidad * precio;
      }
    }
    setTotal(sum);
  };

  // const API_BASE_URL = 'http://localhost:4000/api';

  const getConsumoCliente = async () => {
    try {
      const response = await hotelApi.get('consumoCliente');
      // const response = await axios.get(`${API_BASE_URL}/consumoCliente`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      // Aquí se podría mostrar un mensaje de error al usuario
      return null;
    }
  };

  function handleDataFromChild(roomNumber, paxName, recepcionistaName, currentDate) {
    setNumeroHabitacion(roomNumber);
    setNombrePax(paxName);
    setRecepcionista(recepcionistaName);
    setFechaActual(currentDate);
  }
  
  const createConsumoCliente = async () => {
    const data = {
      numeroHabitacion: numeroHabitacion,
      fechaActual: fechaActual,
      nombrePax: nombrePax,
      recepcionista: recepcionista,
      totalConsumo: total,
      productos: rows.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      }))
    };
    try {
      const response = await hotelApi.post('consumoCliente', data);
      // const response = await axios.post(`${API_BASE_URL}/consumoCliente`, data);
      console.log(response);
    } catch (error) {
      console.error(error);
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  };


  return (
    <div className="container">
      <div className="inner-box">
        <h1 className="titleConsumo">CONSUMOS EXTRAS-MISCELANEOS</h1>
        <ReservationForm onData={handleDataFromChild} />
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
              {rows.map((row, index) => (
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
          </table>
          <button  className="button" onClick={handleAddRow}>Añadir fila</button>
          <button className="button" onClick={handleCalculateSubtotal}>Calcular Total</button>
          <button className="button" onClick={getConsumoCliente}>Obtener Registro</button>
          <button className="button" onClick={createConsumoCliente}>Crear Registro</button>
          <div className="total">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default ConsumoCliente;
