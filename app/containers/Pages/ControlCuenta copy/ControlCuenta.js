import React, { useContext } from 'react';
import FormContext from '../../../context/FormProvider';
import './ControlCuenta.css';

const ControlCuenta = () => {
  const { reservas, habitacionSeleccionada } = useContext(FormContext);
  console.log(reservas);
  console.log(habitacionSeleccionada);

  // const fechaInicio = new Date(reservas.fechaIngreso);
  // const fechaSalida = new Date(reservas.fechaSalida);
  // const duracionReserva = Math.ceil((fechaSalida - fechaInicio) / (1000 * 60 * 60 * 24));

  // const detallesReserva = [];
  // for (let i = 0; i < duracionReserva; i++) {
  //   const fechaDetalle = new Date(fechaInicio);
  //   fechaDetalle.setDate(fechaInicio.getDate() + i);
  //   const detalle = {
  //     fecha: fechaDetalle.toLocaleDateString(),
  //     tipoHabitacion: habitacionSeleccionada.tipoHabitacion[i], // Asumiendo que habitacionSeleccionada.tipoHabitacion es un arreglo con el tipo de habitación para cada día
  //     tarifa: obtenerTarifaPorTipoHabitacion(habitacionSeleccionada.tipoHabitacion[i]), // Implementa esta función para obtener la tarifa correspondiente al tipo de habitación
  //   };
  //   detallesReserva.push(detalle);
  // }

  const datos = [
    {
 fecha: '04-03-2023', detalle: 'Compra en supermercado', consumo: 50, credito: 50, saldo: 200, observaciones: 'Pago pendiente'
},
    {
 fecha: '04-03-2023', detalle: 'Pago de servicio de luz', consumo: 100, credito: 70, saldo: 150, observaciones: 'Pago realizado'
},
    {
 fecha: '05-03-2023', detalle: 'Compra en tienda de ropa', consumo: 80, credito: 77, saldo: 50, observaciones: 'Pago pendiente'
},
  ];
  const cuentas = [
    {
 cantidad: 7, detalle: 'Compra en supermercado', tarifa: 50, comanda: 'consumo', monto: 200
},
    {
 cantidad: 14, detalle: 'Pago de servicio de luz', tarifa: 100, comanda: 'frigobar', monto: 150
},
    {
 cantidad: 77, detalle: 'Compra en tienda de ropa', tarifa: 80, comanda: 'lavanderia', monto: 50
},
  ];

  // Calcular la sumatoria de la columna "consumo"
  const totalConsumo = datos.reduce((acumulado, dato) => acumulado + dato.consumo, 0);
  // Calcular la sumatoria de la columna "saldo"
  const totalSaldo = datos.reduce((acumulado, dato) => acumulado + dato.saldo, 0);
  // Calcular la sumatoria de la columna "monto"
  const totalMonto = cuentas.reduce((acumulado, dato) => acumulado + dato.monto, 0);
  // fechaActual con formato dd//mm//yy
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString();
  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className="container-controlcuenta">
      <div>
        <h1 className="title-controlcuenta">Control de Cuenta Huesped</h1>
      </div>
      <div className="container-control">
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
              {datos.map((dato, index) => (
                <tr key={index}>
                  <td>{dato.fecha}</td>
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
          <table id="tabla-componente">
            <thead>
              <th>Cantidad</th>
              <th>Detalle</th>
              <th>Tarifa</th>
              <th>Nº Comanda</th>
              <th>Monto</th>
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
