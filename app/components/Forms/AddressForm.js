/* eslint-disable object-curly-newline */
import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Add } from '@material-ui/icons';
import AgregarAbono from '../../containers/Pages/ControlCuentaCliente/AgregarAbono';


function AddressForm({ reservaId, comandas, nombreCompleto, fechaIngreso, fechaSalida, tipoHabitacion, numeroHabitacion, totalCreditoItems }) {
  console.log('comandas desdeAdressform', comandas);

  const [sumatoriaAbonos, setSumatoriaAbonos] = useState(0);
  const [sumatoriaCreditos, setSumatoriaCreditos] = useState(0);
  const [mostrarComponenteAgregarAbono, setMostrarComponenteAgregarAbono] = useState(false);
  const [pagoPendiente, setPagoPendiente] = useState(totalCreditoItems);

  useEffect(() => {
    setPagoPendiente(totalCreditoItems);
  }, [totalCreditoItems]);


  const agregarAbono = () => {
    setMostrarComponenteAgregarAbono(true);
  };

  useEffect(() => {
    // Calcular las sumatorias cuando comandas cambia
    let newSumatoriaAbonos = 0;
    let newSumatoriaCreditos = 0;

    comandas.forEach((comanda) => {
       // Comprobar si los valores son números antes de sumarlos
       if (typeof comanda.abono === 'number') {
        newSumatoriaAbonos += comanda.abono;
      }
      if (typeof comanda.credito === 'number') {
        newSumatoriaCreditos += comanda.credito;
      }
    });

    // Actualizar el estado con las sumatorias calculadas
    setSumatoriaAbonos(newSumatoriaAbonos);
    setSumatoriaCreditos(newSumatoriaCreditos);
  }, [comandas]);

  const checkoutButton = () => {
    console.log('checkoutButton');
    if (pagoPendiente === 0) {
      console.log('pagoPendiente', pagoPendiente);
    } else (console.log('Previamente debes haber realizado pagos pendientes'));
  };

  return (
    <Fragment>
      <div className="titleFormCheckout">
        <Typography variant="h6" gutterBottom>
        Check Out
        </Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="roomNumber"
            name="roomNumber"
            label="Room Number"
            value={numeroHabitacion}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="typeRoom"
            name="typeRoom"
            label="Tipo Habitación"
            value={tipoHabitacion}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="paxName"
            name="paxName"
            label="Nombre del Pax"
            value={nombreCompleto}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dateIn"
            name="dateIn"
            label="Fecha Ingreso"
            value={fechaIngreso}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dateOut"
            name="dateOut"
            label="Fecha Salida"
            value={fechaSalida}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cuentaTotal"
            name="cuentaTotal"
            label="Cuenta Total"
            value={sumatoriaCreditos}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="pagosRealizados"
            name="pagosRealizados"
            label="Pagos Realizados"
            value={sumatoriaAbonos}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            id="descuento"
            name="descuento"
            label="Descuento"
            fullWidth
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            id="pagoPendiente"
            name="pagoPendiente"
            label="Pago Pendiente"
            value={pagoPendiente}
            fullWidth
          />
        </Grid>
      </Grid>
      <div>
        <div className="container-buttons-controlcuenta">
          <div className="container-buttons-controlcuenta">
            <Button onClick={checkoutButton} variant="contained" color="secondary">Check Out</Button>
          </div>
          <Button onClick={agregarAbono} variant="contained" color="secondary" startIcon={<Add />}>Agregar Abono</Button>
          {mostrarComponenteAgregarAbono && (
            <AgregarAbono
              nombrePax={nombreCompleto}
              numeroHabitacion={numeroHabitacion}
              reservaId={reservaId}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default AddressForm;
