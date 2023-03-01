import React, { useState } from 'react';
import './ConsumoCliente.css';
import ReservationForm from './ReservationForm';

function ConsumoCliente() {
  const [rows, setRows] = useState([{ cantidad: 1, detalle: '', precio: 0 }]);
  const [total, setTotal] = useState(0);

  const handleAddRow = () => {
    setRows([...rows, { cantidad: 1, detalle: '', precio: 0 }]);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
    console.log(newRows);
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

  return (
    <div className="container">
      <div className="inner-box">
        <h1 className="titleConsumo">CONSUMOS EXTRAS-MISCELANEOS</h1>
        <ReservationForm />
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
          <div className="total">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default ConsumoCliente;
