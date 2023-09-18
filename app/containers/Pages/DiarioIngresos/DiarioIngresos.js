/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import hotelApi from '../../../api/hotelApi';
import DatosDiarioIngresosEgresos from './DatosDiarioIngresosEgresos';

function DiarioIngresos(props) {
  const [initialDiarioIngresosData, setInitialDiarioIngresosData] = useState(null);
  const [abonos, setAbonos] = useState([]);

  const subtotalIngresos = 0;
  const subtotalEgresos = 0;
  const saldo = subtotalIngresos - subtotalEgresos;

  function generateUniqueKey(index) {
    return `row-${index}`;
  }

  const idRecepcionista = localStorage.getItem('UidUsuarioLogueado'); // Reemplaza con el ID deseado

  useEffect(() => {
    hotelApi.get(`editarAbono/recepcionista/${idRecepcionista}`)
      .then((response) => {
        console.log('Resultado de la consulta:', response.data);
        setAbonos(response.data.abonos);
      })
      .catch((error) => {
        console.error('Error en la consulta:', error);
      });
  }, [idRecepcionista]);

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
            {abonos.map((abono, index) => (
              <tr key={generateUniqueKey(index)}>
                <td>{index + 1}</td>
                <td>{abono.detalleAbono}</td>
                <td>{abono.fechaActual}</td>
                <td>{abono.abono}</td>
                <td>0</td>
                <td>{abono.abono - 0}</td>
              </tr>
            ))}
            <tr>
              <td />
              <td />
              <td><strong>Subtotales de Ingresos y Egresos </strong></td>
              <td><strong>{abonos.reduce((acc, curr) => acc + curr.abono, 0)}</strong></td>
              <td><strong>{abonos.reduce((acc, curr) => acc + 0, 0)}</strong></td>
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td><strong>Saldo de Cierre de caja</strong></td>
              <td />
              <td />
              <td><strong>{abonos.reduce((acc, curr) => acc + curr.abono, 0)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiarioIngresos;
