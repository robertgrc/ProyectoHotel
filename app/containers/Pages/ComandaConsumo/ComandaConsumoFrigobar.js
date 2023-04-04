
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ComandaConsumoDatos from './ComandaConsumoDatos';
import hotelApi from '../../../api/hotelApi';


const ComandaConsumoFrigobar = () => {
  const [initialValues, setInitialValues] = useState(null);
  const [values, setValues] = useState({
    rows: [{ cantidad: 1, detalle: '', precio: 0 }],
    total: 0,
    numeroHabitacion: '',
    nombrePax: '',
    camarera: '',
    fechaActual: ''
  });

  const handleAddRow = () => {
    setValues({
      ...values,
      rows: [...values.rows, { cantidad: 1, detalle: '', precio: 0 }]
    });
  };

  const handleCalculateSubtotal = () => {
    let sum = 0;
    for (let i = 0; i < values.rows.length; i++) {
      const cantidad = Number(values.rows[i].cantidad);
      const precio = Number(values.rows[i].precio);
      if (!isNaN(cantidad) && !isNaN(precio)) {
        sum += cantidad * precio;
      }
    }
    setValues({
      ...values,
      total: sum
    });
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...values.rows];
    newRows[index][name] = value;
    setValues({
      ...values,
      rows: newRows
    });
    handleCalculateSubtotal();
  };

  const getComandaConsumoFrigobar = async () => {
    try {
      const response = await hotelApi.get('/comandaConsumoFrigobar');
      console.log(response.data);
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
    console.log(response.data);

    const { reserva } = response.data;
    const rows = reserva.productos.map((producto) => ({
      cantidad: producto.cantidad,
      detalle: producto.producto,
      precio: producto.precio
    }));

    setValues({
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

  const handleDataFromChild = (roomNumber, paxName, waiterName, currentDate) => {
    const valuesToSet = initialValues || values;
  setValues(prevValues => ({
    ...prevValues,
    numeroHabitacion: roomNumber || valuesToSet.numeroHabitacion,
    nombrePax: paxName || valuesToSet.nombrePax,
    camarera: waiterName || valuesToSet.camarera,
    fechaActual: currentDate || valuesToSet.fechaActual
  }));
};

useEffect(() => {
  console.log('values***:', values);
  if (values) {
    setInitialValues(values);
  }
}, [values]);

  const createComandaConsumoFrigobar = async () => {
    const data = {
      numeroHabitacion: values.numeroHabitacion,
      fechaActual: values.fechaActual,
      nombrePax: values.nombrePax,
      camarera: values.camarera,
      totalConsumo: values.total,
      productos: values.rows.map(row => ({
        producto: row.detalle,
        precio: row.precio,
        cantidad: row.cantidad
      }))
    };
    try {
      const response = await hotelApi.post('comandaConsumoFrigobar', data);
      // console.log(response);
    } catch (error) {
      console.error(error);
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="container">
      <div className="inner-box">
        <h1 className="titleConsumo">COMANDA CONSUMO FRIGOBAR - MINIBAR</h1>
        <ComandaConsumoDatos
          onData={handleDataFromChild}
          initialComandaData={initialValues || values}
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
              {values.rows.map((row, index) => (
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
          <button className="button" onClick={getComandaConsumoFrigobar}>Obtener Registro</button>
          <button className="button" onClick={createComandaConsumoFrigobar}>Crear Registro</button>
          <div className="total">Total: ${values.total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ComandaConsumoFrigobar;
