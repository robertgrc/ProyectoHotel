import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Field, reduxForm } from 'redux-form/immutable';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  CheckboxRedux,
  SelectRedux,
  TextFieldRedux,
  SwitchRedux
} from 'dan-components/Forms/ReduxFormMUI';
import { initAction, clearAction } from 'dan-redux/actions/reduxFormActions';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import FormInputReserva from './FormInputReserva';
// import './FormInputReserva';
import { TitlesForm } from './dataFormReserva';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox';
import { dataNameRooms } from './dataNameRooms';
import hotelApi from '../../../api/hotelApi';


const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = (value) => (value == null ? 'Required' : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center',
  },
});

function FormReserva(props) {
  const {
    classes,
    pristine,
    reset,
    submitting,
    init,
    clear
  } = props;

  const [values, setValues] = useState({
    userName: '',
    email: '',
    phone: '',
    creditCard: '',
    numberCreditCard: '',
    company: '',
    phoneCompany: '',
    reservadoPor: '',
    reservationDate: '',
    observations: '',
    fechaIngreso: '',
    fechaSalida: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getReserva = async () => {
    try {
      // const url = 'http://localhost:4000/api/reserva';
      // const response = await axios.get(url);
      const response = await hotelApi.get('./reserva');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [typeRoomState, setTypeRoomState] = useState([]);
  const [arraySelected, setArraySelected] = useState([]);
  const fechaActual = new Date();
  const updateTypeRoomState = (updatedCheckedState) => {
    setTypeRoomState(updatedCheckedState);
    const arrayNamesTrue = [];
    for (let i = 0; i <= updatedCheckedState.length; i++) {
      if (updatedCheckedState[i] === true) {
        arrayNamesTrue.push(dataNameRooms[i]);
      }
    }
    setArraySelected(arrayNamesTrue);
  };

  console.log(arraySelected);

  const createReserva = async () => {
    try {
      const body = {
        nombreCompleto: values.userName,
        email: values.email,
        telefono: values.phone,
        tarjetaCredito: values.creditCard,
        numeroTarjeta: values.numberCreditCard,
        empresa: values.company,
        telefonoEmpresa: values.phoneCompany,
        reservadoPor: values.reservadoPor,
        fechaReserva: fechaActual,
        tipoHabitacion: arraySelected,
        observaciones: values.observations,
        fechaIngreso: values.fechaIngreso,
        fechaSalida: values.fechaSalida,
      };
      const response = await hotelApi.post('/reserva', body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // console.log(values);
  return (
    <div>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">Formulario de Reservas</Typography>
            <Typography component="p">Reservation Form</Typography>
            <form onSubmit={handleSubmit}>         
              {TitlesForm.map((input) => (
                <div>
                  <FormInputReserva
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                    className={classes.field}
                  /> 
                </div>
              ))}
              <div>
                <MultipleCheckbox updateTypeRoomState={updateTypeRoomState} />
              </div>
              <div>                 
              </div>            
              <div>
                <div>
                  <Button variant="contained" color="secondary" type="submit" disabled={submitting}>Submit</Button>
                </div>
                <div>
                  <Button variant="contained" color="secondary" type="submit" onClick={createReserva}>Crear Reserva</Button>
                </div>
                <div onClick={getReserva}>
                  <Button variant="contained" color="secondary" type="submit">Obtener Reservas</Button>
                </div>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(FormReserva);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
