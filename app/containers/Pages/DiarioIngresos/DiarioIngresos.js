import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import AddEgreso from './AddEgreso';
import DatosDiarioIngresosEgresos from './DatosDiarioIngresosEgresos';

function DiarioIngresos(props) {
  const [initialDiarioIngresosData, setInitialDiarioIngresosData] = useState(null);
  const [abonos, setAbonos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const history = useHistory();

  const subtotalIngresos = abonos.reduce((acc, curr) => acc + curr.abono, 0);
  const subtotalEgresos = egresos.reduce((acc, curr) => acc + curr.egreso, 0);
  const saldo = subtotalIngresos - subtotalEgresos;

  function generateUniqueKey(index) {
    return `row-${index}`;
  }

  const idRecepcionista = localStorage.getItem('UidUsuarioLogueado'); // Reemplaza con el ID deseado

  useEffect(() => {
    // Obtener abonos
    hotelApi.get(`editarAbono/recepcionista/${idRecepcionista}`)
      .then((response) => {
        console.log('Resultado de la consulta de abonos:', response.data);
        setAbonos(response.data.abonos);
      })
      .catch((error) => {
        console.error('Error en la consulta de abonos:', error);
      });

    // Obtener egresos
    hotelApi.get(`agregarEgreso/recepcionista/${idRecepcionista}`)
      .then((response) => {
        console.log('Resultado de la consulta de egresos:', response.data);
        setEgresos(response.data.egresos);
      })
      .catch((error) => {
        console.error('Error en la consulta de egresos:', error);
      });
  }, [idRecepcionista]);

  const handleAgregarEgresoClick = () => {
    history.push('/app/AddEgreso');
  };

  return (
    <div className="container-abono">
      <div className="container-title-abono">
        <h1 className="title-abono">Diario de Ingresos y Egresos</h1>
      </div>
      <div className="table-container-abono-3">
        <DatosDiarioIngresosEgresos initialDiarioIngresosData={initialDiarioIngresosData} />
      </div>
      <div className="container-title-abono2">
        <Button variant="contained" color="secondary" onClick={handleAgregarEgresoClick}>Agregar Egreso</Button>
      </div>
      <div className="table-container-abono-4">
        <table className="table-abono-3">
          <thead className="thead-abono">
            <tr className="tr-abono-2">
              <th>Habitación</th>
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
                <td>{abono.habitacion}</td>
                <td>{abono.nombreHuesped}</td>
                <td>{abono.detalleAbono}</td>
                <td>{abono.abono}</td>
                <td>0</td>
                <td>{abono.abono}</td>
              </tr>
            ))}
            {egresos.map((egreso, index) => (
              <tr key={generateUniqueKey(index)}>
                <td>{egreso.habitacion}</td>
                <td>{egreso.recepcionista}</td>
                <td>{egreso.detalleabono}</td>
                <td>0</td>
                <td>{egreso.egreso}</td>
                <td>{-egreso.egreso}</td>
              </tr>
            ))}
            <tr>
              <td />
              <td />
              <td><strong>Subtotales de Ingresos y Egresos </strong></td>
              <td><strong>{subtotalIngresos}</strong></td>
              <td><strong>{subtotalEgresos}</strong></td>
              <td><strong>{saldo}</strong></td>
            </tr>
            <tr>
              <td />
              <td />
              <td><strong>Saldo de Cierre de caja</strong></td>
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
