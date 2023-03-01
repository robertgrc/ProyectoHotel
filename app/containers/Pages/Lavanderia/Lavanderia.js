
import React, { useState } from 'react';
// import './ConsumoCliente.css';
import ReservationForm from './ReservationForm';

const opcionesRopaCaballeros = ['Corbatas', 'Pantalones', 'Abrigos', 'Sacos'];
const opcionesRopaDamas = ['Faldas', 'Blusas', 'Trajes'];

function Lavanderia() {
  const [rows, setRows] = useState([{ cantidad: 1, detalle: '', precio: 0 }]);
  const [total, setTotal] = useState(0);

  const handleAddRow = () => {
    setRows([...rows, { cantidad: 1, detalle: '', precio: 0 }]);
  };

  const handleInputChange = (event, index, tipo) => {
    const { value } = event.target;
    const newRows = [...rows];
    if (tipo === "hombres") {
      newRows[index].ropaHombre = value;
    } else {
      newRows[index].ropaMujer = value;
    }
    setRows(newRows);
  };    
  const handleCalculateSubtotal = () => {
    let sumaCaballeros = 0;
    let sumaDamas = 0; 
    for (let i = 0; i < rows.length; i++) {
      const cantidad = Number(rows[i].cantidad);
      const precio = Number(rows[i].precio);
      const detalle = rows[i].detalle.toLowerCase();
  
      if (!isNaN(cantidad) && !isNaN(precio)) {
        if (opcionesRopaCaballeros.some(opcion => detalle.includes(opcion.toLowerCase()))) {
          sumaCaballeros += cantidad * precio;
        }
        else if (opcionesRopaDamas.some(opcion => detalle.includes(opcion.toLowerCase()))) {
          sumaDamas += cantidad * precio;
        }
      }
    }
  
    setTotal(sumaCaballeros + sumaDamas);
  };

  return (
    <div className="container">
      <div className="inner-box">
        <h1 className="titleConsumo">CONSUMOS EXTRAS-MISCELANEOS</h1>
        {/* <ReservationForm /> */}
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
                    {index === 0 ? (
                    <select disabled>
                        <option>Seleccione un tipo de ropa</option>
                    </select>
                    ) : (
                    <select
                        value={row.ropaHombre}
                        onChange={(event) =>
                        handleInputChange(event, index, "hombres")
                        }
                    >
                        <option>Seleccione un tipo de ropa</option>
                        {opcionesHombres.map((opcion) => (
                        <option key={opcion}>{opcion}</option>
                        ))}
                    </select>
                    )}
                    {index === 0 ? (
                    <select disabled>
                        <option>Seleccione un tipo de ropa</option>
                    </select>
                    ) : (
                    <select
                        value={row.ropaMujer}
                        onChange={(event) =>
                        handleInputChange(event, index, "mujeres")
                        }
                    >
                        <option>Seleccione un tipo de ropa</option>
                        {opcionesMujeres.map((opcion) => (
                        <option key={opcion}>{opcion}</option>
                        ))}
                    </select>
                    )}
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

export default Lavanderia;
