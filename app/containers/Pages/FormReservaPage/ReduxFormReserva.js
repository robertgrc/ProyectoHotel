import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import MenuItem from '@material-ui/core/MenuItem';
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
  SwitchRedux,
} from 'dan-components/Forms/ReduxFormMUI';
import { initAction, clearAction } from 'dan-redux/actions/reduxFormActions';

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
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: '100%',
    marginBottom: 20,
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center',
  },
});

const initData = {
  userName: 'Sample',
  email: 'sample@mail.com',
  telefono: 79784659,
  tarjeta: 1234567,
  numeroTarjeta: 1234567,
  empresa: 'samepleEmpresa',
  telefonoEmpresa: 12345467,
  reservadoPor: 'sampleReserva',
  selection: 'option1',
  onof: true,
  checkbox: true,
  textarea: 'This is default text',
};

function ReduxFormReserva(props) {
  const {
    classes,
    handleSubmit,
    pristine,
    reset,
    submitting,
    init,
    clear,
  } = props;
  return (
    <div>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justify="center"
      >
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Formulario de Reservas
            </Typography>
            <Typography component="p">Booking Card</Typography>
            <div className={classes.buttonInit}>
              <Button
                onClick={() => init(initData)}
                color="secondary"
                type="button"
              >
                Load Sample Data
              </Button>
              <Button onClick={() => clear()} type="button">
                Clear Data
              </Button>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="userName"
                  component={TextFieldRedux}
                  placeholder="Text Field"
                  label="Nombres y Apellidos"
                  validate={required}
                  required
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder="Email Field"
                  label="Email"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="telefono"
                  type="number"
                  component={TextFieldRedux}
                  placeholder="Telefono/Celular"
                  label="Telefono/Celular"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="tarjeta"
                  type="number"
                  component={TextFieldRedux}
                  placeholder="Tarjeta de Credito"
                  label="Tarjeta de Credito"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="numeroTarjeta"
                  type="number"
                  component={TextFieldRedux}
                  placeholder="Número de Tarjeta"
                  label="Número de Tarjeta"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="empresa"
                  component={TextFieldRedux}
                  placeholder="Empresa/institución"
                  label="Empresa/institución"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="telefonoEmpresa"
                  type="number"
                  component={TextFieldRedux}
                  placeholder="Telefono/Celular"
                  label="Telefono Empresa"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="reservadoPor"
                  type="text"
                  component={TextFieldRedux}
                  placeholder="Reservado por:"
                  label="Reservado por:"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="fechaReserva"
                  type="date"
                  component={TextFieldRedux}
                  placeholder="Fecha y hora"
                  label="Fecha y hora"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="fechaIngreso"
                  type="date"
                  component={TextFieldRedux}
                  placeholder="Fecha de Ingreso"
                  label="Fecha de Ingreso"
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="fechaSalida"
                  type="date"
                  component={TextFieldRedux}
                  placeholder="Fecha de Salida"
                  label="Fecha de Salida"
                  className={classes.field}
                />
              </div>
              <div className={classes.fieldBasic}>
                <FormLabel component="label">Tiene Equipaje?</FormLabel>
                <Field
                  name="radio"
                  className={classes.inlineWrap}
                  component={renderRadioGroup}
                >
                  <FormControlLabel
                    value="con equipaje"
                    control={<Radio />}
                    label="Si"
                  />
                  <FormControlLabel
                    value="sin equipaje"
                    control={<Radio />}
                    label="No"
                  />
                </Field>
              </div>
              <div>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">
                    Tipo de Habitación
                  </InputLabel>
                  <Field
                    name="selection"
                    component={SelectRedux}
                    placeholder="Tipo de Habitación"
                    autoWidth
                  >
                    <MenuItem value="SWB">SWB</MenuItem>
                    <MenuItem value="MAT">MAT</MenuItem>
                    <MenuItem value="DWB">DWB</MenuItem>
                    <MenuItem value="TWB">TWB</MenuItem>
                    <MenuItem value="SUITE">SUITE</MenuItem>
                    <MenuItem value="SIMPLE">SIMPLE</MenuItem>
                    <MenuItem value="DOBLE">DOBLE</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div className={classes.field}>
                <Field
                  name="observaciones"
                  className={classes.field}
                  component={TextFieldRedux}
                  placeholder="Observaciones"
                  label="Observaciones"
                  multiline
                  rows={4}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Reset
                </Button>
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

ReduxFormReserva.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(ReduxFormReserva);

const reducer = 'initval';
const FormInit = connect(
  (state) => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues']),
  }),
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
