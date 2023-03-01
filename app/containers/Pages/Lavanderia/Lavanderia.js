
import React, { useState, useEffect } from 'react';
import DatosLavanderia from './DatosLavanderia';
import './Lavanderia.css';

const Lavanderia = () => {
  const [rowsCaballeros, setRowsCaballeros] = useState([
    { cantidad: 1, detalle: 'Corbatas/Ties', precio: 20 },
    { cantidad: 1, detalle: 'Pantales cortos/ Shorts', precio: 20 },
    { cantidad: 1, detalle: 'Abrigos/Overcoats', precio: 30 },
    { cantidad: 1, detalle: 'Pantalones/Trousers', precio: 30 },
    { cantidad: 1, detalle: 'Sacos/Coats', precio: 30 },
    { cantidad: 1, detalle: 'Batas/Robers', precio: 30 },
    { cantidad: 1, detalle: 'Trajes/Suits', precio: 30 },
    { cantidad: 1, detalle: 'Chamarra/Jacket', precio: 30 },
  ]);

  const [rowsDamas, setRowsDamas] = useState([
    { cantidad: 1, detalle: 'Pantalones/Trousers', precio: 15 },
    { cantidad: 1, detalle: 'Blusas/Blouses', precio: 25 },
    { cantidad: 1, detalle: 'Faldas/Skirts', precio: 35 },
    { cantidad: 1, detalle: 'Batas/Robers', precio: 35 },
    { cantidad: 1, detalle: 'Trajes Sastres/Suits', precio: 35 },
    { cantidad: 1, detalle: 'Faldas Plizadas/Evenig gowns', precio: 35 },
    { cantidad: 1, detalle: 'Vestido sencillo/Dry Dresses', precio: 35 },
  ]);

  const [totalCaballeros, setTotalCaballeros] = useState(100);
  const [totalDamas, setTotalDamas] = useState(75);

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

  return (
    <div className="container-lavanderia">
      <div className="inner-container-lavanderia">
        <h1 className="titleLavanderia">Lista para Lavanderia</h1>
        <DatosLavanderia />
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
        </div>
      </div>
    </div>
  );
};

export default Lavanderia;
