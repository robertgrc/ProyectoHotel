import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ComandaDatos from '../ComandaRestaurante/ComandaDatos';
import hotelApi from '../../../api/hotelApi';

const Pruebas = () => {
  const [initialcomandaRestauranteData, setInitialcomandaRestauranteData] = useState(null);
  const [comandaRestauranteData, setcomandaRestauranteData] = useState({
    rows: [{ cantidad: 1, detalle: '', precio: 0 }],
    total: 0,
    numeroHabitacion: '',
  });

  const [errorLocations, setErrorLocations] = useState({});
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
  let errorLocations = {};

  // Validating rows
  if (comandaRestauranteData.rows.length === 0) {
    errors.rows = 'Debe agregar al menos una fila';
    errorLocations.rows = 'rows';
    isValid = false;
  } else {
    comandaRestauranteData.rows.forEach((row, index) => {
      if (!row.cantidad || isNaN(row.cantidad) || row.cantidad < 1) {
        errors[`cantidad-${index}`] = 'Ingrese una cantidad válida';
        errorLocations[`cantidad-${index}`] = 'rows';
        isValid = false;
      }
      if (!row.detalle) {
        errors[`detalle-${index}`] = 'Ingrese un detalle válido';
        errorLocations[`detalle-${index}`] = 'rows';
        isValid = false;
      }
      if (isNaN(row.precio) || row.precio < 0) {
        errors[`precio-${index}`] = 'Ingrese un precio válido';
        errorLocations[`precio-${index}`] = 'rows';
        isValid = false;
      }
    });
  }

  // Validating numeroHabitacion
  if (!comandaRestauranteData.numeroHabitacion) {
    errors.numeroHabitacion = 'Ingrese un número de habitación válido';
    errorLocations.numeroHabitacion = 'numeroHabitacion';
    isValid = false;
  }
  setErrors(errors);
  setErrorLocations(errorLocations);
  return isValid;
};

  //* -------------------------------------------
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

  //* -------------------------------------------


  const handleDataFromChild = (roomNumber, paxName, meseroName, currentDate) => {
    const comandaRestauranteDataToSet = initialcomandaRestauranteData || comandaRestauranteData;
  setcomandaRestauranteData(prevcomandaRestauranteData => ({
    ...prevcomandaRestauranteData,
    numeroHabitacion: roomNumber || comandaRestauranteDataToSet.numeroHabitacion,
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
      numeroHabitacion: comandaRestauranteData.numeroHabitacion,
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
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al enviar el formulario');
    }
    } else {
    console.log('Hay un error en el Formulario');
    setErrorMessage('Hay un error en el formulario');
  }
  };

  //* ----------------------------------------------


  return (
    <div className="container">
      <div className="inner-box">
        <h1 className="titleConsumo">COMANDA DE RESTAURANTE Y ROOM SERVICE</h1>
        <ComandaDatos
          onData={handleDataFromChild}
          initialComandaData={initialcomandaRestauranteData || comandaRestauranteData}
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
          </table>
          <button  className="button" onClick={handleAddRow}>Añadir fila</button>
          <button className="button" onClick={handleCalculateSubtotal}>Calcular Total</button>
          <button className="button" onClick={createComandaRestaurante}>Crear Registro</button> 
          <div className="total">Total: ${comandaRestauranteData.total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
export default Pruebas;
