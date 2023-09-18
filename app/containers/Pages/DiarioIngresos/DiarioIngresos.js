/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import DatosDiarioIngresosEgresos from './DatosDiarioIngresosEgresos';

const ingresos = [
    {
 numero: 1, nombre: 'Venta de producto A', detalle: 'Cliente X', ingresos: 500, egresos: 0
},
    {
 numero: 2, nombre: 'Pago de factura Y', detalle: 'Proveedor Z', ingresos: 0, egresos: 300
},
    {
 numero: 3, nombre: 'Venta de producto B', detalle: 'Cliente W', ingresos: 1000, egresos: 0
}
];

const sumIngresos = ingresos.reduce((acc, curr) => acc + curr.ingresos, 0);
const sumEgresos = ingresos.reduce((acc, curr) => acc + curr.egresos, 0);
const saldo = sumIngresos - sumEgresos;

function DiarioIngresos(props) {
  const [initialDiarioIngresosData, setInitialDiarioIngresosData] = useState(null);
  function generateUniqueKey(index) {
    return `row-${index}`;
  }

  return (
    <div className="container-abono">
      <div className="container-title-abono">
        <h1 className="title-abono">Diario de Ingresos y Egresos</h1>
      </div>
      <div className="table-container-abono-3">
        <DatosDiarioIngresosEgresos initialDiarioIngresosData={initialDiarioIngresosData} />
      </div>
      <div className="table-container-abono-3">
        <table className="table-abono-2">
          <thead className="thead-abono">
            <tr className="tr-abono-2">
              <th>Número</th>
              <th>Nombre</th>
              <th>Detalle</th>
              <th>Ingresos</th>
              <th>Egresos</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((ingreso, index) => (
              <tr key={generateUniqueKey(index)}>
                <td>{ingreso.numero}</td>
                <td>{ingreso.nombre}</td>
                <td>{ingreso.detalle}</td>
                <td>{ingreso.ingresos}</td>
                <td>{ingreso.egresos}</td>
                <td>{ingreso.ingresos - ingreso.egresos}</td>
              </tr>
            ))}
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td><strong>{saldo}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiarioIngresos;
