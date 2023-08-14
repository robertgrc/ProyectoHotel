import React, { useState, useEffect } from 'react';
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
    margin: `${theme.spacing(3)}px 0`,
  },
  textField: {
    // margin: theme.spacing(3),
    width: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing(2),
  },
});

function ReservationForm({
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
      const { numeroHabitacion, nombrePax, recepcionista } = initialComandaData;
      setRoomNumber(numeroHabitacion);
      setPaxName(nombrePax);
      setRecepcionistaName(recepcionista);
    }
  }, [initialComandaData]);

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handlePaxNameChange(event) {
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
            {errors && errors.numeroHabitacion && (
              <FormHelperText className={classes.textField} error>
                {errors.numeroHabitacion}
              </FormHelperText>
            )}
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
            {errors && errors.nombrePax && (
              <FormHelperText className={classes.textField} error>
                {errors.nombrePax}
              </FormHelperText>
            )}
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

ReservationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onData: PropTypes.func.isRequired,
  // initialComandaData: PropTypes.object,
  // errors: PropTypes.object,
};

export default withStyles(styles)(ReservationForm);


// import React, { useState, useEffect } from 'react';

// function ReservationForm({ onData, initialComandaData, errors }) {
//   const [roomNumber, setRoomNumber] = useState('');
//   const [paxName, setPaxName] = useState('');
//   const [recepcionistaName, setRecepcionistaName] = useState('');
//   const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

//   useEffect(() => {
//     onData(roomNumber, paxName, recepcionistaName, currentDate);
//   }, [roomNumber, paxName, recepcionistaName, currentDate]);

//   // console.log('initialComandaData***', initialComandaData);
//   useEffect(() => {
//     // console.log(initialComandaData);
//     if (initialComandaData) {
//       const { numeroHabitacion, nombrePax, recepcionista } = initialComandaData;
//       setRoomNumber(numeroHabitacion);
//       setPaxName(nombrePax);
//       setRecepcionistaName(recepcionista);
//     }
//   }, [initialComandaData]);

//   function handleRoomNumberChange(event) {
//     setRoomNumber(event.target.value);
//   }

//   function handlePaxNameChange(event) {
//     setPaxName(event.target.value);
//   }

//   function handleRecepcionistaNameChange(event) {
//     setRecepcionistaName(event.target.value);
//   }

//   return (
//     <table className="table-container-type">
//       <tbody>
//         <tr>
//           <td className="label-type">Número de habitación:</td>
//           <td>
//             <span className="input-type">{roomNumber}</span>
//             {errors && errors.numeroHabitacion && (
//               <span className="error-message">{errors.numeroHabitacion}</span>
//             )}
//           </td>
//         </tr>
//         <tr>
//           <td className="label-type">Nombre del pax:</td>
//           <td>
//             <span className="input-type">{paxName}</span>
//             {errors && errors.nombrePax && (
//               <span className="error-message">{errors.nombrePax}</span>
//             )}
//           </td>
//         </tr>
//         <tr>
//           <td className="label-type">Recepcionista:</td>
//           <td>
//             <input className="input-type" type="text" value={recepcionistaName} onChange={handleRecepcionistaNameChange} />
//             {errors && errors.recepcionista && (
//               <span className="error-message">{errors.recepcionista}</span>
//             )}
//           </td>
//         </tr>
//         <tr>
//           <td className="label-type">Fecha actual:</td>
//           <td>{currentDate}</td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }

// export default ReservationForm;
