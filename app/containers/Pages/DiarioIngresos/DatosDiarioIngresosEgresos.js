

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(0)}px 0`,
  },
  textField: {
    // margin: `${theme.spacing(1)}px 0`,
    // padding: theme.spacing(2),
    width: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(2),
  },
});

function DatosDiarioIngresosEgresos({
  initialDiarioIngresosData,
  classes
}) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [meseroName, setMeseroName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

//   useEffect(() => {
//     onData(roomNumber, paxName, meseroName, currentDate);
//   }, [roomNumber, paxName, meseroName, currentDate]);

  useEffect(() => {
    if (initialDiarioIngresosData) {
      const { numeroHabitacion, nombrePax, mesero } = initialDiarioIngresosData;
      setRoomNumber(numeroHabitacion);
      setPaxName(nombrePax);
      setMeseroName(mesero);
    }
  }, [initialDiarioIngresosData]);

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handlePaxNameChange(event) {
    setPaxName(event.target.value);
  }

  function handleMeseroNameChange(event) {
    setMeseroName(event.target.value);
  }

  return (
    <Fragment>
      <div className="container-form">
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={3}
        >
          <Grid item md={6} className={classes.demo}>
            <div className={classes.container}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                className={classes.textField}
                label="Número de habitación"
                id="room-number"
                value={roomNumber}
                onChange={handleRoomNumberChange}
              />
              {/* {errors && errors.numeroHabitacion && (
                <FormHelperText className={classes.textField} error>
                  {errors.numeroHabitacion}
                </FormHelperText>
              )} */}
            </div>
          </Grid>
          <Grid item md={6} className={classes.demo}>
            <div className={classes.container}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                className={classes.textField}
                label="Nombre del pax"
                id="pax-name"
                value={paxName}
                onChange={handlePaxNameChange}
              />
              {/* {errors && errors.nombrePax && (
                <FormHelperText className={classes.textField} error>
                  {errors.nombrePax}
                </FormHelperText>
              )} */}
            </div>
          </Grid>
          <Grid item md={6} className={classes.demo}>
            <div className={classes.container}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                className={classes.textField}
                label="Fecha actual"
                id="current-date"
                value={currentDate}
                disabled
              />
            </div>
          </Grid>
          <Grid item md={6} className={classes.demo}>
            <div className={classes.container}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                className={classes.textField}
                label="Mesero"
                id="mesero-name"
                value={meseroName}
                onChange={handleMeseroNameChange}
              />
              {/* {errors && errors.mesero && (
                <FormHelperText className={classes.textField} error>
                  {errors.mesero}
                </FormHelperText>
              )} */}
            </div>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

DatosDiarioIngresosEgresos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatosDiarioIngresosEgresos);
