import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [turno, setTurno] = useState('');
  const [recepcionistaName, setRecepcionistaName] = useState('');
  useEffect(() => {
   const storedRecepcionistaName = localStorage.getItem('NombreUsuarioLogueado');
   console.log('storedRecepcionistaName', storedRecepcionistaName);
   if (storedRecepcionistaName) {
     setRecepcionistaName(storedRecepcionistaName);
   }
 }, []);

  useEffect(() => {
    if (initialDiarioIngresosData) {
      const { recepcionista } = initialDiarioIngresosData;
      setRecepcionistaName(recepcionista);
    }
  }, [initialDiarioIngresosData]);

  function handleTurno(event) {
    setTurno(event.target.value);
  }

  function handleRecepcionistaNameChange(event) {
    setRecepcionistaName(event.target.value);
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
          <Grid item md={4} className={classes.demo}>
            <div className={classes.container}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                className={classes.textField}
                label="Recepcionista"
                id="recepcionista-name"
                value={recepcionistaName}
                onChange={handleRecepcionistaNameChange}
              />
            </div>
          </Grid>
          <Grid item md={4} className={classes.demo}>
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
          <Grid item md={4} className={classes.demo}>
            <div className={classes.container}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                className={classes.textField}
                label="Turno"
                id="turno"
                value={turno}
                onChange={handleTurno}
              />
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
