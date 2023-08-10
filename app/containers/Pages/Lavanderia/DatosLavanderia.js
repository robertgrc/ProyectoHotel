import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormContext from '../../../context/FormProvider';

const styles = theme => ({
  demo: {
    height: 'auto',
    marginBottom: '25px',
    marginTop: '15px'
  },
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  textField: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(3),
  },
});

function DatosLavanderia({
  onData, initialComandaData, errors, classes
}) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [recepcionistaName, setRecepcionistaName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    onData(roomNumber, paxName, recepcionistaName, currentDate);
  }, [roomNumber, paxName, recepcionistaName, currentDate]);

  useEffect(() => {
    if (initialComandaData) {
      const { numeroHabitacion, nombreHuesped, recepcionista } = initialComandaData;
      setRoomNumber(numeroHabitacion);
      setPaxName(nombreHuesped);
      setRecepcionistaName(recepcionista);
    }
  }, [initialComandaData]);

  const formContext = useContext(FormContext);
  const { reservaSeleccionada } = formContext;

  useEffect(() => {
    if (reservaSeleccionada) {
      setRoomNumber(reservaSeleccionada.numeroHabitacion);
      setPaxName(reservaSeleccionada.nombreCompleto);
    }
  }, [reservaSeleccionada]);

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handleGuestNameChange(event) {
    setPaxName(event.target.value);
  }

  function handleRecepcionistaNameChange(event) {
    setRecepcionistaName(event.target.value);
  }

  return (
    <div className="containerComandas">
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={3}
      >
        <Grid
          item
          md={12}
          className={classes.demo}
        >
          <div className={classes.container}>
            <TextField
              className={classes.textField}
              label="Número de Habitación"
              id="room-number"
              value={roomNumber}
              onChange={handleRoomNumberChange}
            />
            {errors && errors.numeroHabitacion && (
              <FormHelperText className={classes.textField} error>
                {errors.numeroHabitacion}
              </FormHelperText>
            )}

            <TextField
              className={classes.textField}
              label="Nombre del Huesped"
              id="pax-name"
              value={paxName}
              onChange={handleGuestNameChange}
            />
            {errors && errors.nombreHuesped && (
              <FormHelperText className={classes.textField} error>
                {errors.nombreHuesped}
              </FormHelperText>
            )}

            <TextField
              className={classes.textField}
              label="Fecha actual"
              id="current-date"
              value={currentDate}
              disabled
            />

            <TextField
              className={classes.textField}
              label="Recepcionista"
              id="recepcionista-name"
              value={recepcionistaName}
              onChange={handleRecepcionistaNameChange}
            />
            {errors && errors.recepcionista && (
              <FormHelperText className={classes.textField} error>
                {errors.recepcionista}
              </FormHelperText>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

DatosLavanderia.propTypes = {
  classes: PropTypes.object.isRequired,
  onData: PropTypes.func.isRequired,
  // initialComandaData: PropTypes.object,
  // errors: PropTypes.object,
};

export default withStyles(styles)(DatosLavanderia);
