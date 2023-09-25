import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function AddressForm() {
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
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="typeRoom"
            name="typeRoom"
            label="Tipo Habitación"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="paxName"
            name="paxName"
            label="Nombre del Pax"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dateIn"
            name="dateIn"
            label="Fecha Ingreso"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dateOut"
            name="dateOut"
            label="Fecha Salida"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cuentaTotal"
            name="cuentaTotal"
            label="Cuenta Total"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="pagosRealizados"
            name="pagosRealizados"
            label="Pagos Realizados"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="descuento"
            name="descuento"
            label="Descuento"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pagoPendiente"
            name="pagoPendiente"
            label="Pago Pendiente"
            fullWidth
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default AddressForm;
