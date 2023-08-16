/* eslint-disable react/button-has-type */
import { Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';

const AgregarAbono = ({ nombrePax, numeroHabitacion, reservaId }) => {
  const formContext = useContext(FormContext);

  const { reservaSeleccionada } = formContext;
    useEffect(() => {
      if (reservaSeleccionada) {
          // console.log('reservaSeleccionadaAbonos', reservaSeleccionada);
      }
   }, [reservaSeleccionada]);


  const [currentDate, setCurrentDate] = useState(new Date());
  const [abonoData, setAbonoData] = useState({
    // Convertir la fecha a una cadena en el formato día/mes/año
    fecha: currentDate.toLocaleDateString(),
    detalleAbono: '',
    abono: '',
  });
  const history = useHistory();
  const nombreRecepcionista = localStorage.getItem('NombreUsuarioLogueado');
  const location = useLocation();
  const abono = location.state && location.state.abono;
  // console.log('abonoDesdeAgregarAbono', abono);
  const [abonos, setAbonos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbonoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoAbono = {
      numeroHabitacion,
      nombrePax,
      nombreRecepcionista,
      ...abonoData,
    };
    setAbonos((prevAbonos) => [...prevAbonos, nuevoAbono]);
    setAbonoData({
      fecha: currentDate.toLocaleDateString(), // Convertir la fecha a una cadena en el formato día/mes/año
      detalleAbono: '',
      abono: '',
    });
  };

  const createAgregarAbono = async (e) => {
    e.preventDefault();
    const nuevoAbono = {
      idReserva: reservaId,
      recepcionista: nombreRecepcionista,
      nombrePax,
      fechaActual: currentDate,
      detalleAbono: abonoData.detalleAbono,
      abono: abonoData.abono,
    };
    try {
      const response = await hotelApi.post('controlCuenta', nuevoAbono);
      const abonoGuardado = response.data;
      // console.log(abonoGuardado);
      setAbonos((prevAbonos) => [...prevAbonos, abonoGuardado]);
      setAbonoData({
        fecha: currentDate.toLocaleDateString(),
        detalleAbono: '',
        abono: '',
      });
      showSuccessMessage('Formulario Creado con exito');
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al crear el Abono');
    }
  };

  const getAgregarAbono = async () => {
    try {
      const response = await hotelApi.get('controlCuenta');
      const abonosData = response.data;
      setAbonos(abonosData);
      // console.log(abonosData);
    } catch (error) {
      console.error(error);
      // Manejar el error aquí
    }
  };

  const mostrarRegistrosAbonos = () => {
    history.push({
      pathname: `/app/TablaEditableAbonos/${reservaSeleccionada.id}`,
      state: { tipoComanda: 'editarComandasRestaurante' }
    });
  };
  return (
    <div className="abono-table-container">
      <h2 className="abono-title">Registrar Abono</h2>
      <form className="abono-form" onSubmit={handleSubmit}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            <div className="abono-input-container">
              <TextField
                type="text"
                name="otroCampo"
                variant="outlined"
                size="small"
                label="Recepcionista"
                fullWidth
                value={nombreRecepcionista}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="abono-input-container">
              <TextField
                type="text"
                name="fecha"
                variant="outlined"
                size="small"
                label="Fecha"
                fullWidth
                value={abonoData.fecha}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="abono-input-container">
              <TextField
                type="text"
                name="detalleAbono"
                variant="outlined"
                size="small"
                label="Detalle Abono"
                fullWidth
                value={abonoData.detalleAbono}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="abono-input-container">
              <TextField
                type="text"
                name="abono"
                variant="outlined"
                size="small"
                label="Abono"
                fullWidth
                value={abonoData.abono}
                onChange={handleChange}
              />
            </div>
          </Grid>
        </Grid>
      </form>
      <div className="container-buttons-abono">
        <Button type="submit" onClick={createAgregarAbono} variant="contained" color="secondary">Enviar</Button>
        {/* <button className="button" onClick={getAgregarAbono}>Buscar Abono</button> */}
        <Button variant="contained" color="secondary" onClick={mostrarRegistrosAbonos}>Mostrar Abonos</Button>
      </div>
    </div>
  );
};

export default AgregarAbono;
