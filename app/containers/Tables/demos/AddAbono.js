/* eslint-disable react/button-has-type */
import { Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';

const AddAbono = () => {
    const [abonoData, setAbonoData] = useState({
      id: '',
      fecha: '',
      detalleAbono: '',
      abono: '',
      idReserva: '',
      nombrePax: '',
      recepcionista: ''
    });

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.state && location.state.abono) {
          // Accedemos a los datos de abono a través de location.state.abono
          const {
                id, fechaActual, detalleAbono, abono, idReserva, nombrePax, recepcionista
                } = location.state.abono;
          // Actualizamos el estado con los datos de abono
          setAbonoData({
            id,
            fecha: fechaActual,
            detalleAbono,
            abono,
            idReserva,
            nombrePax,
            recepcionista
          });
        }
      }, [location.state]);

    // Función para manejar el envío del formulario y otras funciones...
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAbonoData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleUpdateAbono = async (e) => {
        e.preventDefault();
        try {
          const data = {
            id: abonoData.id,
            fechaActual: abonoData.fecha,
            detalleAbono: abonoData.detalleAbono,
            abono: abonoData.abono,
            idReserva: abonoData.idReserva,
            nombrePax: abonoData.nombrePax,
            recepcionista: abonoData.recepcionista
          };

          const response = await hotelApi.put(`controlCuenta/${abonoData.id}`, data);
          console.log(response.data);
          showSuccessMessage('Formulario Actualizado con éxito');
          history.push({
            pathname: `/app/TablaEditableAbonos/${abonoData.idReserva}`,
          });
        } catch (error) {
          console.error(error);
          showErrorMessage('Error al actualizar el formulario');
        }
      };

    return (
      <div className="container-abono-table-two">
        <div className="abono-table-container-two">
          <div className="container-abono-title-two">
            <h2 className="abono-title-two">Registrar Abono</h2>
          </div>
          <form className="abono-form">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6}>
                <div className="abono-input-container">
                  <TextField
                    type="text"
                    name="nombrePax"
                    variant="outlined"
                    size="small"
                    label="Nombre del Pax"
                    fullWidth
                    value={abonoData.nombrePax}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="abono-input-container">
                  <TextField
                    type="text"
                    name="recepcionista"
                    variant="outlined"
                    size="small"
                    label="recepcionista"
                    fullWidth
                    value={abonoData.recepcionista}
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
                    className="abono-input"
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
                    className="abono-input"
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
                    className="abono-input"
                    value={abonoData.abono}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
            <div className="container-buttons-abono">
              <Button type="submit" onClick={handleUpdateAbono} variant="contained" color="secondary">Guardar Cambios</Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default AddAbono;
