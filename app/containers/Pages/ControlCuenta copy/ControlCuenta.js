
import { set } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import './ControlCuenta.css';

const ControlCuenta = () => {
  let datosReserva;
  const { reservas, reservaSeleccionada } = useContext(FormContext);
  const { fechaIngreso, fechaSalida, tipoHabitacion, nombreCompleto, numeroHabitacion } = reservaSeleccionada;

    const [comandas, setComandas] = useState([]);
    console.log('Comandas:', comandas);
    //*----
    const { reservaId } = useParams();
    console.log(reservaId);
    const getComandas = async (id) => {
      try {
        const response = await hotelApi.get(`comandas/${id}`);
        console.log(response.data);
        setComandas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (reservaId) {
        getComandas(reservaId);
      }
    }, [reservaId]);
//*-----
    const fechaInicio = new Date(fechaIngreso);
    const fechaFinal = new Date(fechaSalida);
    const diasHospedaje = Math.ceil((fechaFinal - fechaInicio) / (1000 * 60 * 60 * 24)); // Calcula la cantidad de días de hospedaje

    console.log('diasHospedaje', diasHospedaje);

  const tipoHabitacionReal = Array.isArray(tipoHabitacion) ? tipoHabitacion[0] : tipoHabitacion; // Obtener el tipo de habitación real

  const cuentas = [
    {
      cantidad: diasHospedaje,
      detalle: `Noche en habitación ${tipoHabitacionReal}`,
      tarifa: 0,
      comanda: '',
      monto: 0
    }
  ];

  switch (tipoHabitacionReal) {
    case 'SIMPLE':
      cuentas[0].tarifa = 30;
      break;
    case 'DOUBLE':
      cuentas[0].tarifa = 50;
      break;
    case 'SWB':
      cuentas[0].tarifa = 70;
      break;
    case 'DWB':
      cuentas[0].tarifa = 80;
      break;
    case 'SUITE':
      cuentas[0].tarifa = 100;
      break;
    case 'MAT':
      cuentas[0].tarifa = 150;
      break;
    case 'TWB':
      cuentas[0].tarifa = 160;
      break;
    default:
      cuentas[0].tarifa = 0;
  }

  cuentas[0].monto = cuentas[0].tarifa * cuentas[0].cantidad;

  const tarifaNoche = cuentas[0].tarifa;
  console.log(tarifaNoche);

  const datos = Array.from({ length: diasHospedaje }, (_, index) => {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fechaInicio.getDate() + index + 1);
    const formattedFecha = fecha.toLocaleDateString('es-ES');
    const detalle = `Noche en habitación ${tipoHabitacion}`;
    return { fecha: formattedFecha, detalle, consumo: tarifaNoche, credito: 0, saldo: 0, observaciones: '' };
  });

  datosReserva = datos; // Asignar el valor de datos a la variable datosReserva
  console.log(datosReserva);
  // Calcular la sumatoria de la columna "consumo"
  const totalConsumo = datosReserva.reduce((acumulado, dato) => acumulado + dato.consumo, 0);
  // Calcular la sumatoria de la columna "saldo"
  const totalSaldo = datosReserva.reduce((acumulado, dato) => acumulado + dato.saldo, 0);
  // Calcular la sumatoria de la columna "monto"
  const totalMonto = cuentas.reduce((acumulado, dato) => acumulado + dato.monto, 0);
  // fechaActual con formato dd//mm//yy
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="container-controlcuenta">
      <div>
        <h1 className="title-controlcuenta">CONTROL DE CUENTA HUESPED</h1>
      </div>
      <div className="container-control">
        <div className="datos-huesped">
          <table id="tabla-componente">
            <tbody>
              <tr>
                <td>Nombre completo:</td>
                <td>{nombreCompleto}</td>
              </tr>
              <tr>
                <td>Número de habitación:</td>
                <td>{numeroHabitacion}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table id="tabla-componente">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Detalle</th>
                <th>Consumo</th>
                <th>Crédito</th>
                <th>Saldo</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {datosReserva.map((dato, index) => (
                <tr key={index}>
                  <td>{dato.fecha.toString()}</td>
                  <td>{dato.detalle}</td>
                  <td>{dato.consumo}</td>
                  <td>{dato.credito}</td>
                  <td>{dato.saldo}</td>
                  <td>{dato.observaciones}</td>
                </tr>
              ))}
              <tr>
                <td><strong>{formattedDate}</strong></td>
                <td></td>
                <td><strong>{totalConsumo}</strong></td>
                <td></td>
                <td><strong>{totalSaldo}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <h4 className="title-controlcuenta">CUENTA PAX</h4>
          <table id="tabla-componente">
            <thead>
             <tr>
               <th>Cantidad</th>
               <th>Detalle</th>
               <th>Tarifa</th>
               <th>Nº Comanda</th>
               <th>Monto</th>
             </tr>
            </thead>
            <tbody>
              {cuentas.map((cuenta, index) => (
                <tr key={index}>
                  <td>{cuenta.cantidad}</td>
                  <td>{cuenta.detalle}</td>
                  <td>{cuenta.tarifa}</td>
                  <td>{cuenta.comanda}</td>
                  <td>{cuenta.monto}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>{totalMonto}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ControlCuenta;
