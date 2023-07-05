
/* eslint-disable no-else-return */

import { sortBy } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import './ControlCuenta.css';
import AgregarAbono from './AgregarAbono';

const ControlCuentaCliente = () => {
  let datosReserva;
  let cuentas;
  const { reservas, reservaSeleccionada } = useContext(FormContext);
  const { fechaIngreso, fechaSalida, tipoHabitacion, nombreCompleto, numeroHabitacion } = reservaSeleccionada;
  const [comandas, setComandas] = useState([]);
  const [detalleComandas, setDetalleComandas] = useState([]);
  const [detalleComandasOrdenado, setDetalleComandasOrdenado] = useState([]);
  const [totalConsumoItems, setTotalConsumoItems] = useState(0);
  const [totalCreditoItems, setTotalCreditoItems] = useState(0);
  const [cuantaPaxDetalle, setCuentaPaxDetalle] = useState([]);
  const [mostrarComponenteAgregarAbono, setMostrarComponenteAgregarAbono] = useState(false);

    console.log('Comandas:', comandas);
    //*----
    const { reservaId } = useParams();
    
    useEffect(() => {
      const getComandas = async (id) => {
        try {
          const response = await hotelApi.get(`comandas/${id}`);
          console.log(response.data);
          // console.log(response.data.comandas.comandasFrigobar);
          setComandas(response.data.comandas);
        } catch (error) {
          console.log(error);
        }
      };

      if (reservaId) {
        getComandas(reservaId);
      }
    }, [reservaId]);
//* ----------- 1
useEffect(() => {
  const comandasArrays = [
    comandas.comandasFrigobar,
    comandas.comandasRestaurante,
    comandas.comandasConsumoCliente,
    comandas.comandasLavanderia
  ];

  const detalleConsumo = comandasArrays.map((comandasArray) => {
    if (comandasArray) {
      return comandasArray.flatMap((comanda) => {
        if (comanda.productos) {
          return comanda.productos.map((producto) => {
            // Convertir la fecha a objeto Date
            const fechaObjeto = new Date(comanda.fechaActual);
            // Formatear la fecha en el formato "día/mes/año"
            const fechaFormateada = `${fechaObjeto.getDate()}/${fechaObjeto.getMonth() + 1}/${fechaObjeto.getFullYear()}`;

            return {
              fecha: fechaFormateada,
              detalle: producto.producto,
              precio: producto.precio,
              cantidad: producto.cantidad,
              // consumo: producto.precio * producto.cantidad,
              credito: producto.precio * producto.cantidad
            };
          });
        } else if (comanda.ListaCaballeros && comanda.ListaDamas) {
          const productosCaballeros = comanda.ListaCaballeros.map((producto) => {
            const fechaObjeto = new Date(comanda.fechaActual);
            const fechaFormateada = `${fechaObjeto.getDate()}/${fechaObjeto.getMonth() + 1}/${fechaObjeto.getFullYear()}`;

            return {
              fecha: fechaFormateada,
              detalle: producto.producto,
              precio: producto.precio,
              cantidad: producto.cantidad,
              // consumo: producto.precio * producto.cantidad,
              credito: producto.precio * producto.cantidad
            };
          });

          const productosDamas = comanda.ListaDamas.map((producto) => {
            const fechaObjeto = new Date(comanda.fechaActual);
            const fechaFormateada = `${fechaObjeto.getDate()}/${fechaObjeto.getMonth() + 1}/${fechaObjeto.getFullYear()}`;

            return {
              fecha: fechaFormateada,
              detalle: producto.producto,
              precio: producto.precio,
              cantidad: producto.cantidad,
              // consumo: producto.precio * producto.cantidad,
              credito: producto.precio * producto.cantidad
            };
          });

          return [...productosCaballeros, ...productosDamas];
        } else {
          return [];
        }
      });
    }
    return [];
  }).flat();
    // Recorremos cada elemento de 'datosReserva'
    datosReserva.forEach((item) => {
      // Agregamos cada elemento al arreglo 'detalleConsumo'
    detalleConsumo.push(item);
    });

  console.log('detalleConsumo:', detalleConsumo); // Verificar el objeto construido

  const detalleConsumoOrdenado = sortBy(detalleConsumo, 'fecha');
  setDetalleComandasOrdenado(detalleConsumoOrdenado);
  setDetalleComandas(detalleConsumo);

  const totalCreditoCalculado = detalleConsumoOrdenado.reduce((acumulado, dato) => acumulado + dato.credito, 0);
  setTotalCreditoItems(totalCreditoCalculado);
}, [
  comandas.comandasFrigobar,
  comandas.comandasRestaurante,
  comandas.comandasConsumoCliente,
  comandas.comandasLavanderia
]);
//* ----- 3


useEffect(() => {
  const comandasArrays = [
    comandas.comandasFrigobar,
    comandas.comandasRestaurante,
    comandas.comandasConsumoCliente,
    comandas.comandasLavanderia
  ];

  const tipoComandas = [
    'comandasFrigobar',
    'comandasRestaurante',
    'comandasConsumoCliente',
    'comandasLavanderia'
  ];

  const costoTotalPorComanda = comandasArrays.map((comandasArray, index) => {
    if (comandasArray) {
      const cantidad = comandasArray.length;
      let detalle = '';

      switch (tipoComandas[index]) {
        case 'comandasFrigobar':
          detalle = 'Minibar';
          break;
        case 'comandasRestaurante':
          detalle = 'Restaurante Almuerzos';
          break;
        case 'comandasConsumoCliente':
          detalle = 'Consumos Extras';
          break;
        case 'comandasLavanderia':
          detalle = 'Lavanderia';
          break;
        default:
          detalle = '';
      }

      return {
        cantidad,
        detalle,
        monto: comandasArray.reduce((acumulado, comanda) => acumulado + comanda.totalConsumo, 0)
      };
    }
    return {
      cantidad: 0,
      detalle: '',
      monto: 0
    };
  });

  cuentas.forEach((item) => {
    // Agregamos cada elemento al arreglo 'detalleConsumo'
    costoTotalPorComanda.push(item);
  });

  setCuentaPaxDetalle(costoTotalPorComanda);
  // Resto del código...
}, [
  comandas.comandasFrigobar,
  comandas.comandasRestaurante,
  comandas.comandasConsumoCliente,
  comandas.comandasLavanderia
]);

console.log('cuentaPaxDetalle:', cuantaPaxDetalle);
//*------------
    const fechaInicio = new Date(fechaIngreso);
    const fechaFinal = new Date(fechaSalida);
    const diasHospedaje = Math.ceil((fechaFinal - fechaInicio) / (1000 * 60 * 60 * 24)); // Calcula la cantidad de días de hospedaje

  const tipoHabitacionReal = Array.isArray(tipoHabitacion) ? tipoHabitacion[0] : tipoHabitacion; // Obtener el tipo de habitación real

 cuentas = [
    {
      cantidad: diasHospedaje,
      detalle: `Noche en habitación ${tipoHabitacionReal}`,
      tarifa: 0,
      comanda: '',
      monto: 0
    }
  ];
console.log('cuentas***', cuentas);

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
  // console.log(tarifaNoche);

  const datos = Array.from({ length: diasHospedaje }, (_, index) => {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fechaInicio.getDate() + index + 1);
    const formattedFecha = fecha.toLocaleDateString('es-ES');
    const detalle = `Noche en habitación ${tipoHabitacion}`;
    return { fecha: formattedFecha, detalle, consumo: '', credito: tarifaNoche, saldo: 0, observaciones: '' };
  });

  datosReserva = datos; // Asignar el valor de datos a la variable datosReserva
  console.log('datosReserva****', datosReserva);
  // Calcular la sumatoria de la columna "consumo"
  const totalConsumo = datosReserva.reduce((acumulado, dato) => acumulado + dato.consumo, 0);
  // Calcular la sumatoria de la columna "saldo"
  const totalCredito = datosReserva.reduce((acumulado, dato) => acumulado + dato.credito, 0);
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

  // console.log('totalCreditoItems*-*', totalCreditoItems);
  console.log('detalleComandasOrdenado ***-_-***', detalleComandasOrdenado);

  const agregarAbono = () => {
    setMostrarComponenteAgregarAbono(true);
  };

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
              {detalleComandasOrdenado.map((dato, index) => (
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
                <td><strong>Consumo Total del Pasajero</strong></td>
                <td></td>
                <td><strong>{totalCreditoItems}</strong></td>
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
              {cuantaPaxDetalle.map((cuenta, index) => (
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
                <td><strong>Consumo Total del PAX</strong></td>
                <td></td>
                <td></td>
                <td><strong>{totalCreditoItems}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container-controlcuenta">
        {/* ...otro código... */}
        <button onClick={agregarAbono}>Agregar Abono</button>
        {mostrarComponenteAgregarAbono && (
          <AgregarAbono
           //  nombreRecepcionista={nombreRecepcionista}
           nombrePax={nombreCompleto}
           numeroHabitacion={numeroHabitacion}
           reservaId={reservaId}
          //  nombreRecepcionista = {recepcionista}
          />
        )}
      </div>
    </div>
  );
};

export default ControlCuentaCliente;
