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
    margin: theme.spacing(3),
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

function ComandaConsumoDatos({
  onData, initialComandaData, errors, classes
}) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [waiterName, setWaiterName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    onData(roomNumber, paxName, waiterName, currentDate);
  }, [roomNumber, paxName, waiterName, currentDate]);

  useEffect(() => {
    if (initialComandaData) {
      const { numeroHabitacion, nombrePax, camarera } = initialComandaData;
      setRoomNumber(numeroHabitacion);
      setPaxName(nombrePax);
      setWaiterName(camarera);
    }
  }, [initialComandaData]);

  function handleWaiterNameChange(event) {
    setWaiterName(event.target.value);
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
              label="Número de habitación"
              id="room-number"
              value={roomNumber}
              onChange={event => setRoomNumber(event.target.value)}
            />
            {errors && errors.numeroHabitacion && (
              <FormHelperText className={classes.textField} error>
                {errors.numeroHabitacion}
              </FormHelperText>
            )}

            <TextField
              className={classes.textField}
              label="Nombre del pax"
              id="pax-name"
              value={paxName}
              onChange={event => setPaxName(event.target.value)}
            />
            {errors && errors.nombrePax && (
              <FormHelperText className={classes.textField} error>
                {errors.nombrePax}
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
              label="Camarera"
              id="waiter-name"
              value={waiterName}
              onChange={handleWaiterNameChange}
            />
            {errors && errors.camarera && (
              <FormHelperText className={classes.textField} error>
                {errors.camarera}
              </FormHelperText>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

ComandaConsumoDatos.propTypes = {
  classes: PropTypes.object.isRequired,
  onData: PropTypes.func.isRequired,
  // initialComandaData: PropTypes.object,
  // errors: PropTypes.object,
};

export default withStyles(styles)(ComandaConsumoDatos);
// import React, { useState, useEffect } from 'react';

// function ComandaConsumoDatos({ onData, initialComandaData, errors }) {
//   const [roomNumber, setRoomNumber] = useState('');
//   const [paxName, setPaxName] = useState('');
//   const [waiterName, setWaiterName] = useState('');
//   const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

//   useEffect(() => {
//   onData(roomNumber, paxName, waiterName, currentDate);
//   }, [roomNumber, paxName, waiterName, currentDate]);

//   useEffect(() => {
//     if (initialComandaData) {
//       const { numeroHabitacion, nombrePax, camarera } = initialComandaData;
//       setRoomNumber(numeroHabitacion);
//       setPaxName(nombrePax);
//       setWaiterName(camarera);
//     }
//   }, [initialComandaData]);

//   function handleWaiterNameChange(event) {
//     setWaiterName(event.target.value);
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
//           <td className="label-type">Camarera:</td>
//           <td>
//             <input className="input-type" type="text" value={waiterName} onChange={handleWaiterNameChange} />
//             {errors && errors.camarera && (
//               <span className="error-message">{errors.camarera}</span>
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

// export default ComandaConsumoDatos;
