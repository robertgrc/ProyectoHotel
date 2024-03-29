/* eslint-disable object-curly-newline */
import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Add } from '@material-ui/icons';
import AgregarAbono from '../../containers/Pages/ControlCuentaCliente/AgregarAbono';
import hotelApi from '../../api/hotelApi';
import { showErrorMessage, showSuccessMessage } from '../../utilsHotelApp/AlertMessages';

function AddressForm({ reservaId, comandas, nombreCompleto, fechaIngreso, fechaSalida, tipoHabitacion, numeroHabitacion, totalCreditoItems }) {
  console.log('comandas desdeAdressform', comandas);

  const [sumatoriaAbonos, setSumatoriaAbonos] = useState(0);
  const [sumatoriaCreditos, setSumatoriaCreditos] = useState(0);
  const [mostrarComponenteAgregarAbono, setMostrarComponenteAgregarAbono] = useState(false);
  const [pagoPendiente, setPagoPendiente] = useState(totalCreditoItems);

  const nombreRecepcionista = localStorage.getItem('NombreUsuarioLogueado');
  const idRecepcionista = localStorage.getItem('UidUsuarioLogueado');
  // Obtener la fecha actual en formato ISO
  const currentDate = new Date().toISOString();
  const history = useHistory();

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

  const handleCheckout = async (e) => {
    e.preventDefault();
    console.log('handleCheckout');

    if (pagoPendiente === 0) {
      console.log('pagoPendiente', pagoPendiente);

      // Crear el objeto de checkout
      const checkout = {
        idReserva: reservaId,
        idRecepcionista,
        recepcionista: nombreRecepcionista,
        nombrePax: nombreCompleto,
        fechaActual: currentDate,
      };

      try {
        // Realizar la solicitud POST a la API
        const response = await hotelApi.post('checkout', checkout);
        console.log('response***********', response.data);
        // Manejar el caso de éxito
        if (response.status === 200) {
          showSuccessMessage('Checkout exitoso');
          // Puedes agregar aquí cualquier otra lógica que desees realizar después de un checkout exitoso
          history.push({
            pathname: `/app/FormularioTarjetaRegistro/${reservaId}`,
            state: { actualizarEstadoHabitacion: 'checkout' }, // Pasa el estado en la ubicación
          });
        } else {
          showErrorMessage('Error en el checkout');
        }
      } catch (error) {
        console.error(error);
        showErrorMessage('Error al crear el checkout');
      }
    } else (showErrorMessage('Previamente debes haber realizado pagos pendientes'));
  };

  const redirectBack = () => {
    history.push('/app/TablaCalendarioReservas');
  };

  return (
    <Fragment>
      <div className="titleFormCheckout2">
        <IconButton
          className="nav-next"
          onClick={redirectBack}
        >
          <ArrowBack />
        </IconButton>
        <Typography className="centerText" variant="h6" gutterBottom>Check Out</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="roomNumber"
            name="roomNumber"
            label="Room Number"
            value={numeroHabitacion}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="typeRoom"
            name="typeRoom"
            label="Tipo Habitación"
            value={tipoHabitacion}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="paxName"
            name="paxName"
            label="Nombre del Pax"
            value={nombreCompleto}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dateIn"
            name="dateIn"
            label="Fecha Ingreso"
            value={fechaIngreso}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dateOut"
            name="dateOut"
            label="Fecha Salida"
            value={fechaSalida}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cuentaTotal"
            name="cuentaTotal"
            label="Cuenta Total"
            value={sumatoriaCreditos}
            fullWidth
            disabled
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
        <div>
          <div className="container-buttons-comandas" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '30px' }}>
            <Button onClick={handleCheckout} variant="outlined" color="secondary" style={{ width: '30%' }}>Check Out</Button>
            <Button onClick={agregarAbono} variant="outlined" color="secondary" style={{ width: '30%' }}>Agregar Abono</Button>
          </div>
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
