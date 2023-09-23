/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */

import { sortBy } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import './ControlCuenta.css';
import AgregarAbono from './AgregarAbono';

const ControlCuentaCliente = () => {
  let datosReserva;
  let cuentas;
  const { reservas, reservaSeleccionada } = useContext(FormContext);
  const {
 fechaIngreso, fechaSalida, tipoHabitacion, nombreCompleto, numeroHabitacion
} = reservaSeleccionada;
  const [comandas, setComandas] = useState([]);
  const [detalleComandas, setDetalleComandas] = useState([]);
  const [detalleComandasOrdenado, setDetalleComandasOrdenado] = useState([]);
  const [totalMontoComandas, setTotalMontoComandas] = useState(0);
  const [totalCreditoItems, setTotalCreditoItems] = useState(0);
  const [cuantaPaxDetalle, setCuentaPaxDetalle] = useState([]);
  const [mostrarComponenteAgregarAbono, setMostrarComponenteAgregarAbono] = useState(false);
  const [totalSaldo, setTotalSaldo] = useState(0);

  function generateUniqueKey(index) {
    return `row-${index}`;
  }
    // console.log('Comandas:', comandas);
  //*----
    const { reservaId } = useParams();
    useEffect(() => {
      const getComandas = async (id) => {
        try {
          const response = await hotelApi.get(`comandas/${id}`);
          // console.log('RespuestaData***', response.data);
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
    comandas.comandasLavanderia,
    comandas.abonosCliente
  ];

  let hasAbono = false;

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
              credito: producto.precio * producto.cantidad,
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
              credito: producto.precio * producto.cantidad
            };
          });

          return [...productosCaballeros, ...productosDamas];
        } else if (!hasAbono && comandasArray[0].abono) {
          hasAbono = true;
          return comandasArray.map((abono) => {
            const fechaObjeto = new Date(abono.fechaActual);
            const fechaFormateada = `${fechaObjeto.getDate()}/${fechaObjeto.getMonth() + 1}/${fechaObjeto.getFullYear()}`;
            return {
              fecha: fechaFormateada,
              detalle: abono.detalleAbono,
              precio: abono.abono,
              cantidad: 1,
              credito: 0,
              abono: abono.abono // Agregar propiedad abono para identificar abonos
            };
          });
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
    // console.log('detalleConsumo:', detalleConsumo); // Verificar el objeto construido
    //* otra manera de concatenar
  // const detalleConsumoFinal = detalleConsumo.concat(datosReserva);
  // console.log(detalleConsumoFinal);

  const detalleConsumoOrdenado = detalleConsumo.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  let saldoAcumulado = 0;
  const detalleComandasCalculado = detalleConsumoOrdenado.map((dato, index) => {
    let saldo = 0;
    if (dato.credito) {
      saldo = saldoAcumulado + dato.credito;
      saldoAcumulado = saldo;
    } else if (dato.abono) {
      saldo = saldoAcumulado - dato.abono;
      saldoAcumulado = saldo;
    }
    return { ...dato, saldo };
  });

  setDetalleComandasOrdenado(detalleComandasCalculado); // Corregido para utilizar detalleComandasCalculado en lugar de detalleConsumoOrdenado
  setDetalleComandas(detalleConsumo);

  const totalCreditoCalculado = detalleConsumoOrdenado.reduce((acumulado, dato) => acumulado + dato.credito, 0);
  setTotalMontoComandas(totalCreditoCalculado);
  const totalAbonos = detalleConsumoOrdenado.reduce((acumulado, dato) => acumulado + (dato.abono || 0), 0); // Sumar los abonos
  setTotalCreditoItems(totalCreditoCalculado - totalAbonos);
  const saldoCalculado = totalMonto - (totalConsumo + totalCreditoCalculado + totalAbonos); // Restar los abonos al saldo
  setTotalSaldo(saldoCalculado);
}, [
  comandas.comandasFrigobar,
  comandas.comandasRestaurante,
  comandas.comandasConsumoCliente,
  comandas.comandasLavanderia,
  comandas.abonosCliente
]);
//* ----- 3


useEffect(() => {
  const comandasArrays = [
    comandas.comandasFrigobar,
    comandas.comandasRestaurante,
    comandas.comandasConsumoCliente,
    comandas.comandasLavanderia,
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
          detalle = 'Consumos Miscelaneos';
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
}, [
  comandas.comandasFrigobar,
  comandas.comandasRestaurante,
  comandas.comandasConsumoCliente,
  comandas.comandasLavanderia,
]);

// console.log('cuentaPaxDetalle:', cuantaPaxDetalle);
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
// console.log('cuentas***', cuentas);

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

  const datos = Array.from({ length: diasHospedaje }, (_, index) => {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fechaInicio.getDate() + index + 1);
    const formattedFecha = fecha.toLocaleDateString('es-ES');
    const detalle = `Noche en habitación ${tipoHabitacion}`;
    return {
 fecha: formattedFecha, detalle, consumo: '', credito: tarifaNoche, saldo: 0, observaciones: ''
};
  });

  datosReserva = datos;

  const totalConsumo = datosReserva.reduce((acumulado, dato) => acumulado + dato.consumo, 0);
  // Calcular la sumatoria de la columna "saldo"
  const totalCredito = datosReserva.reduce((acumulado, dato) => acumulado + dato.credito, 0);
  // Calcular la sumatoria de la columna "saldo"
  const totalSaldoCalculado = datosReserva.reduce((acumulado, dato) => acumulado + dato.saldo, 0);
  // Calcular la sumatoria de la columna "monto"
  const totalMonto = cuentas.reduce((acumulado, dato) => acumulado + dato.monto, 0);
  // fechaActual con formato dd//mm//yy
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;

  const agregarAbono = () => {
    setMostrarComponenteAgregarAbono(true);
  };
  const editarAbono = () => {
    setMostrarComponenteAgregarAbono(true);
  };

  const enviarDatosAlBackend = async (totalMontoComandas, totalCreditoItems) => {
    try {
      const response = await hotelApi.post('checkout', {
        totalMontoComandas,
        totalCreditoItems
      });
      // Manejar la respuesta del backend si es necesario
      console.log('Datos enviados al backend:', response.data);
    } catch (error) {
      console.error('Error al enviar datos al backend:', error);
    }
  };

  useEffect(() => {
    // ... (código existente)

    // Llamar a la función para enviar los datos al backend
    enviarDatosAlBackend(totalMontoComandas, totalCreditoItems);
  }, [totalMontoComandas, totalCreditoItems]);

  return (
    <div>
      <div className="container-controlcuenta">
        <div className="inner-box-controlcuenta">
          <h1 className="title-control-cuenta">CONTROL DE CUENTA HUESPED</h1>
        </div>
        <div className="container-datos-controlcuenta">
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
            direction="row"
            spacing={3}
          >
            <Grid item md={6}>
              <div>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  // className={classes.textField}
                  label="Nombre del PAX"
                  id="nombreCompleto"
                  value={nombreCompleto}
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  // className={classes.textField}
                  label="Número de habitación"
                  id="numeroHabitacion"
                  value={numeroHabitacion}
                />
              </div>
            </Grid>
          </Grid>
          <div>
            <div className="container-buttons-controlcuenta">
              <Button onClick={agregarAbono} variant="contained" color="secondary" startIcon={<Add />}>Agregar Abono</Button>
              {/* <Button onClick={editarAbono} variant="contained" color="secondary">Editar Abono</Button> */}
              {mostrarComponenteAgregarAbono && (
              <AgregarAbono
                nombrePax={nombreCompleto}
                numeroHabitacion={numeroHabitacion}
                reservaId={reservaId}
              />
              )}
            </div>
            <div className="table-container-controlcuenta">
              <table className="table-comanda-controlcuenta">
                <thead className="thead-comanda-controlcuenta">
                  <tr className="tr-comanda-controlcuenta">
                    <th>Fecha</th>
                    <th>Detalle</th>
                    <th>Consumo</th>
                    <th>Crédito</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody className="tbody-comanda-controlcuenta">
                  {detalleComandasOrdenado.map((dato, index) => (
                    <tr key={generateUniqueKey(index)}>
                      <td>{dato.fecha}</td>
                      <td>{dato.detalle}</td>
                      <td>{dato.consumo || dato.abono || ''}</td>
                      <td>{dato.credito}</td>
                      <td>{dato.saldo}</td>
                    </tr>
               ))}
                  <tr>
                    <td><strong>{formattedDate}</strong></td>
                    <td><strong>Cuenta total del PAX</strong></td>
                    <td><strong>{totalCreditoItems}</strong></td>
                    <td><strong /></td>
                    <td><strong>{totalCreditoItems}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer" />
      <div className="container-controlcuenta">
        <div className="inner-box-controlcuenta">
          <h4 className="title-control-cuenta">CUENTA PAX</h4>
        </div>
        <div className="container-tablacomandas">
          <table className="table-tablacomandas">
            <thead className="thead-tablacomandas">
              <tr>
                <th>Cantidad</th>
                <th>Detalle</th>
                <th>Tarifa</th>
                <th>Nº Comanda</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody className="tbody-tablacomandas">
              {cuantaPaxDetalle.map((cuenta, index) => (
                <tr key={generateUniqueKey(index)}>
                  <td>{cuenta.cantidad}</td>
                  <td>{cuenta.detalle}</td>
                  <td>{cuenta.tarifa}</td>
                  <td>{cuenta.comanda}</td>
                  <td>{cuenta.monto}</td>
                </tr>
             ))}
              <tr>
                <td />
                <td><strong>Cuenta Total del PAX</strong></td>
                <td />
                <td />
                <td><strong>{totalMontoComandas}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ControlCuentaCliente;
