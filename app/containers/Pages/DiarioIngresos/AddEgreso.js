/* eslint-disable react/jsx-one-expression-per-line */
 /* eslint-disable react/button-has-type */

import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';

const AddEgreso = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [egresoData, setEgresoData] = useState({
    nombrePax: '',
    recepcionista: '', // Ahora el campo recepcionista es de solo lectura
    fechaActual: currentDate.toISOString().split('T')[0], // Ahora el campo fecha es de solo lectura, // Ahora el campo fecha es de solo lectura
    detalleAbono: '',
    abono: '',
  });
  const history = useHistory();
  const idRecepcionista = localStorage.getItem('UidUsuarioLogueado');
  const recepcionista = localStorage.getItem('NombreUsuarioLogueado');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEgresoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setEgresoData((prevData) => ({
      ...prevData,
      fecha: e.target.value,
    }));
  };

  const handleRedirect = () => {
      history.push('/app/DiarioIngresos');
  };

  const createAgregarEgreso = async (e) => {
    e.preventDefault();
    try {
      // Agregar recepcionista e idRecepcionista al objeto egresoData
      const dataWithRecepcionista = {
          ...egresoData,
          fechaActual: currentDate,
          recepcionista,
          idRecepcionista,
        };

      const response = await hotelApi.post('agregarEgreso', dataWithRecepcionista);
      const egresoGuardado = response.data;
      setEgresoData({
        nombrePax: '',
        detalleAbono: '',
        abono: '',
      });
      showSuccessMessage('Egreso Creado con éxito');
      handleRedirect();
    } catch (error) {
      console.error(error);
      showErrorMessage('Error al crear el Egreso');
    }
  };

  return (
    <div className="container-abono-table-two">
      <div className="abono-table-container-two">
        <div className="container-abono-title-two">
          <h2 className="abono-title-two">Registrar Egreso</h2>
        </div>
        <form className="abono-form">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <div className="abono-input-container">
                <TextField
                  type="text"
                  name="recepcionista"
                  variant="outlined"
                  size="small"
                  label="Recepcionista"
                  fullWidth
                  value={recepcionista}
                  InputProps={{
                      readOnly: true, // Hace que el campo sea de solo lectura
                    }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="abono-input-container">
                <TextField
                  type="date" // Cambié el tipo a date para seleccionar fechas
                  name="fecha"
                  variant="outlined"
                  size="small"
                  label="Fecha"
                  className="abono-input"
                  fullWidth
                  value={egresoData.fechaActual}
                  onChange={handleDateChange}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="abono-input-container">
                <TextField
                  type="text"
                  name="nombrePax"
                  variant="outlined"
                  size="small"
                  label="Nombre Empleado"
                  fullWidth
                  value={egresoData.nombrePax}
                  onChange={handleInputChange}
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
                  label="Detalle Egreso"
                  fullWidth
                  className="abono-input"
                  value={egresoData.detalleAbono}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="abono-input-container">
                <TextField
                  type="number"
                  name="abono"
                  variant="outlined"
                  size="small"
                  label="Egreso"
                  fullWidth
                  className="abono-input"
                  value={egresoData.abono}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
          </Grid>
          <div className="container-buttons-abono">
            <Button
              type="submit"
              onClick={createAgregarEgreso}
              variant="outlined"
              color="secondary"
              style={{ width: '25%' }}
            >
              Crear Egreso
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEgreso;
