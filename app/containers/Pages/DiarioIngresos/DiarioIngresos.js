import React from 'react';

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
  return (
    <div className="container-controlcuenta">
      <div>
        <h1 className="title-controlcuenta">Diario de Ingresos y Egresos de Recepción</h1>
      </div>
      <div className="container-control">
        <table id="tabla-componente">
          <thead>
            <tr>
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
              <tr key={index}>
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
