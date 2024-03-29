/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import './FormInputTarjetaRegistro.css';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Fab, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { KeyboardArrowRight } from '@material-ui/icons';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox';
import { dataNameRooms } from '../FormReserva/dataNameRooms';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import { habitaciones } from '../TablaCalendarioReservas/habitaciones';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';
import RegistroCliente from '../RegistroCliente/RegistroCliente';

const FormularioTarjetaRegistro = () => {
  const [formularioRegistroValues, setFormularioRegistroValues] = useState({
    nombreCompleto: '',
    email: '',
    telefono: '',
    tarjetaCredito: '',
    numeroTarjeta: '',
    empresa: '',
    fechaIngreso: '',
    fechaSalida: '',
    telefonoEmpresa: '',
    reservadoPor: '',
    numeroHabitacion: '',
    estadoHabitacion: '',
    observaciones: '',
  });
  
  const [showDateFormat, setShowDateFormat] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const formContext = useContext(FormContext);
  const { habitacionSeleccionada, fechaSeleccionada } = formContext;
  const [typeRoomState, setTypeRoomState] = useState([]);
  const [arraySelected, setArraySelected] = useState(
    habitacionSeleccionada ? [habitacionSeleccionada.nombre] : []
  );

// Calcular la fechaSalidaPorDefecto (fechaSeleccionada + 1 día)
let fechaSalidaPorDefecto = null;
if (fechaSeleccionada) {
  fechaSalidaPorDefecto = new Date(fechaSeleccionada);
  fechaSalidaPorDefecto.setDate(fechaSalidaPorDefecto.getDate() + 1);
}

  useEffect(() => {
    if (habitacionSeleccionada && fechaSeleccionada) {
      setFormularioRegistroValues({
        ...formularioRegistroValues,
        fechaIngreso: fechaSeleccionada,
        estadoHabitacion: habitacionSeleccionada.estado,
        numeroHabitacion: habitacionSeleccionada.numero,
        tipoHabitacion: arraySelected,
        fechaSalida: fechaSalidaPorDefecto ? fechaSalidaPorDefecto.toISOString().slice(0, 10) : '',
      });
    }
  }, [habitacionSeleccionada, fechaSeleccionada]);

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

  const [errors, setErrors] = useState({});

  const errorMessages = {
    nombreCompleto: 'Ingresa un nombre válido. El nombre completo debe contener, minimo un nombre y dos apellidos.',
    email: 'Ingresa una dirección de correo electrónico válida.',
    telefono: 'Ingresa un número de teléfono válido. Debe tener 10 dígitos.',
    tarjetaCredito: 'Selecciona una tarjeta de crédito.',
    numeroTarjeta: 'Ingresa un número de tarjeta de crédito válido. Debe tener entre 13 y 16 dígitos.',
    empresa: 'Ingresa el nombre de la empresa.',
    reservadoPor: 'Ingresa el nombre de la persona que hizo la reserva.',
    fechaIngreso: 'Ingresa una fecha de ingreso válida.',
    fechaSalida: 'Ingresa una fecha de salida válida.',
    estadoHabitacion: 'Ingresa un estado de Habitacion valido',
    numeroHabitacion: 'Ingresa un numero de Habitacion valido',
    telefonoEmpresa: 'Ingresa un número de teléfono de la empresa válido. Debe tener 10 dígitos.',
  };

  const habitacionOptions = [
    { value: 'alquilado', label: 'Alquilado' },
    { value: 'confirmado', label: 'Confirmado' },
    { value: 'provisional', label: 'Provisional' },
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'checkout', label: 'Check Out' }
  ];

  const inputs = [
    {
      id: 11,
      name: 'estadoHabitacion',
      type: 'select',
      placeholder: 'Seleccione el Estado de la Habitacion',
      label: 'Selecciona el Estado de Habitación',
      required: true,
      options: habitacionOptions,
    },
    {
      id: 21,
      name: 'tipoHabitacion',
      type: 'text',
      // placeholder: 'Tipo de la Habitacion',
      label: 'Tipo de Habitacion',
      required: true,
      readOnly: true
    },
    {
      id: 1,
      name: 'nombreCompleto',
      type: 'text',
      placeholder: 'Nombres y Apellidos',
      // label: 'Nombres y Apellidos',
      pattern: '^[a-zA-Z]+(([,\\. -][a-zA-Z ])?[a-zA-Z]*)*$',
      required: true,
    },
    {
      id: 12,
      name: 'numeroHabitacion',
      type: 'text',
      placeholder: 'Número de Habitación',
      // label: 'Número de Habitación',
      required: true,
    },
    {
      id: 9,
      name: 'fechaIngreso',
      type: 'date',
      placeholder: 'Fecha de Ingreso',
      // label: 'Fecha de ingreso',
      required: true,
    },
    {
      id: 10,
      name: 'fechaSalida',
      type: 'date',
      placeholder: 'Fecha de Salida',
      // label: 'Fecha de salida',
      required: true,
    },
    {
      id: 13,
      name: 'observaciones',
      type: 'text',
      placeholder: 'Observaciones',
      // label: 'Observaciones',
      special: 'true',
      required: true,
    },
    {
      id: 14,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      // label: 'Email',
      pattern: '^[^s@]+@[^s@]+.[^s@]+$',
      required: true,
    },
    {
      id: 15,
      name: 'telefono',
      type: 'number',
      placeholder: 'Telefono - Celular',
      // label: 'Telefono - Celular',
      required: true,
    },
    {
      id: 16,
      name: 'tarjetaCredito',
      type: 'number',
      placeholder: 'Tarjeta de Credito',
      // label: 'Tarjeta de Credito',
    },
    {
      id: 17,
      name: 'numeroTarjeta',
      type: 'number',
      placeholder: 'Numero de Tarjeta de Credito',
      // label: 'Numero de Tarjeta de Credito',
    },
    {
      id: 18,
      name: 'empresa',
      type: 'text',
      placeholder: 'Empresa/Institución)',
      // label: 'Empresa/Institución)',
    },
    {
      id: 19,
      name: 'telefonoEmpresa',
      type: 'number',
      placeholder: 'Telefono(Empresa)',
      // label: 'Telefono (Empresa)',
    },
    {
      id: 20,
      name: 'reservadoPor',
      type: 'text',
      placeholder: 'Nombre completo del reservante',
      // label: 'Reserva tomada por:',
      pattern: '^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
      required: true,
      readOnly: true,
    },
  ];

  const validate = () => {
    let isValid = true;
    // eslint-disable-next-line no-shadow
    const errors = {};
    inputs.forEach(input => {
      if (!formularioRegistroValues[input.name]) {
        errors[input.name] = errorMessages[input.name];
        isValid = false;
      } else if (input.pattern && !RegExp(input.pattern).test(formularioRegistroValues[input.name])) {
        errors[input.name] = errorMessages[input.name];
        isValid = false;
      }
    });
    setErrors(errors);
    return isValid;
  };

  function resetForm() {
    setFormularioRegistroValues({
      nombreCompleto: '',
      tipoHabitacion: '',
      observaciones: '',
      fechaIngreso: '',
      fechaSalida: '',
      numeroHabitacion: '',
      estadoHabitacion: '',
      email: '',
      telefono: '',
      tarjetaCredito: '',
      numeroTarjeta: '',
      empresa: '',
      telefonoEmpresa: '',
      reservadoPor: '',
    });
  }

  const [selectedOption, setSelectedOption] = useState('tiene equipaje');
  const handleChangeRadio = (event) => {
    setSelectedOption(event.target.value);
  };

  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const createRegistro = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        const body = {
          nombreCompleto: formularioRegistroValues.nombreCompleto,
          email: formularioRegistroValues.email,
          telefono: formularioRegistroValues.telefono,
          tarjetaCredito: formularioRegistroValues.tarjetaCredito,
          numeroTarjeta: formularioRegistroValues.numeroTarjeta,
          empresa: formularioRegistroValues.empresa,
          telefonoEmpresa: formularioRegistroValues.telefonoEmpresa,
          reservadoPor: formularioRegistroValues.reservadoPor,
          fechaIngreso: formularioRegistroValues.fechaIngreso,
          fechaSalida: formularioRegistroValues.fechaSalida,
          tipoHabitacion: arraySelected,
          numeroHabitacion: formularioRegistroValues.numeroHabitacion,
          estadoHabitacion: formularioRegistroValues.estadoHabitacion,
          observaciones: formularioRegistroValues.observaciones,
        };
        const response = await hotelApi.post('/registro', body);
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Formulario de enviado exitosamente',
          text: 'Gracias por llenar el Formulario',
          confirmButtonText: 'OK'
        }).then(() => {
          resetForm();
          history.push('../app/TablaCalendarioReservas');
          document.querySelector('#form-contact').reset();
        });
      } catch (error) {
        console.log(error);
        setErrorMessage('Error al enviar el formulario');
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar el formulario',
          text: 'Por favor intenta nuevamente',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  const getRegistro = async () => {
    try {
      const response = await hotelApi.get('/registro');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { registroId } = useParams();

  const getRegistroById = async (id) => {
    try {
      const response = await hotelApi.get(`/registro/${id}`);
      const { registro } = response.data;
      setFormularioRegistroValues({
        nombreCompleto: registro.nombreCompleto || '',
        arraySelected: registro.tipoHabitacion || [],
        observaciones: registro.observaciones || '',
        fechaIngreso: registro.fechaIngreso || '',
        fechaSalida: registro.fechaSalida || '',
        numeroHabitacion: registro.numeroHabitacion || '',
        estadoHabitacion: registro.estadoHabitacion || '',
        email: registro.email || '',
        telefono: registro.telefono || '',
        tarjetaCredito: registro.tarjetaCredito || '',
        numeroTarjeta: registro.numeroTarjeta || '',
        empresa: registro.empresa || '',
        telefonoEmpresa: registro.telefonoEmpresa || '',
        reservadoPor: registro.reservadoPor || '',
        tipoHabitacion: registro.tipoHabitacion || ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (registroId) {
      getRegistroById(registroId);
    }
  }, [registroId]);

const handleUpdateRegistro = async () => {
  try {
    const response = await hotelApi.put(`./registro/${registroId}`, {
        nombreCompleto: formularioRegistroValues.nombreCompleto || '',
        arraySelected: formularioRegistroValues.tipoHabitacion || [],
        observaciones: formularioRegistroValues.observaciones || '',
        fechaIngreso: formularioRegistroValues.fechaIngreso || '',
        fechaSalida: formularioRegistroValues.fechaSalida || '',
        numeroHabitacion: formularioRegistroValues.numeroHabitacion || '',
        estadoHabitacion: formularioRegistroValues.estadoHabitacion || '',
        email: formularioRegistroValues.email || '',
        telefono: formularioRegistroValues.telefono || '',
        tarjetaCredito: formularioRegistroValues.tarjetaCredito || '',
        numeroTarjeta: formularioRegistroValues.numeroTarjeta || '',
        empresa: formularioRegistroValues.empresa || '',
        telefonoEmpresa: formularioRegistroValues.telefonoEmpresa || '',
        reservadoPor: formularioRegistroValues.reservadoPor || '',
        tipoHabitacion: formularioRegistroValues.tipoHabitacion || '',
    });
    console.log(response.data);
    showSuccessMessage('Formulario actualizado con éxito');
    resetForm();
    history.push('../TablaCalendarioReservas');
  } catch (error) {
    console.log(error);
    showErrorMessage('No se pudo actualizar el Formulario');
  }
};

const { deleteId } = useParams();
const deleteRegistro = async (deleteId) => {
  try {
    const response = await hotelApi.delete(`/registro/${registroId}`);
    console.log(response.data);
    showSuccessMessage('El formulario fue eliminado con exito');
    resetForm();
    history.push('../TablaCalendarioReservas');
  } catch (error) {
    console.log(error);
    showErrorMessage('No se pudo eliminar el Formulario');
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e, name) => {
    let { value } = e.target;
    if (name === 'estadoHabitacion' && e.target.selectedIndex !== undefined && e.target.selectedIndex !== -1) {
      value = e.target.options[e.target.selectedIndex].value;
    }
    setFormularioRegistroValues({
      ...formularioRegistroValues,
      [name]: value,
    });
    setSelectedValue(value); // Actualizar el estado para el componente Select
  };

  const [mostrarRegistroCliente, setMostrarRegistroCliente] = useState(false);

  const toggleMostrarRegistroCliente = () => {
    setMostrarRegistroCliente(!mostrarRegistroCliente);
  };

  useEffect(() => {
    // Verifica si la ubicación actual tiene un estado de ubicación
    const locationState = history.location.state;
    
    if (locationState && locationState.toggleMostrarRegistroCliente) {
      // Si el estado de ubicación tiene toggleMostrarRegistroCliente, ejecútalo
      toggleMostrarRegistroCliente();
    }
  }, []);

const typeOfRoomData = habitaciones.reduce((acc, curr) => {
  const existingRoomType = acc.findIndex((room) => room.name === curr.nombre);
  if (existingRoomType !== -1) {
    acc[existingRoomType].checked = false;
    if (formContext.habitacionSeleccionada && curr.nombre === formContext.habitacionSeleccionada.nombre) {
      acc[existingRoomType].checked = true;
    }
  } else {
    acc.push({
      name: curr.nombre,
      checked: formContext.habitacionSeleccionada ? curr.nombre === formContext.habitacionSeleccionada.nombre : false,
      id: acc.length,
    });
  }
  return acc;
}, []);

const habitacionInput = inputs.find((input) => input.name === 'habitacion');
const placeholder = habitacionInput ? habitacionInput.placeholder : '';
//*-------------------------------------
const updateEstadoHabitacion = async (actualizarEstadoHabitacion) => {
  try {
    const response = await hotelApi.put(`/registro/${registroId}`, {
      estadoHabitacion: actualizarEstadoHabitacion,
    });
    console.log('response.data****', response.data);
    history.push('/app/TablaCalendarioReservas');
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  // Verifica si la ubicación actual tiene un estado de ubicación
  const locationState = history.location.state;

  if (locationState && locationState.actualizarEstadoHabitacion === 'checkout') {
    // Si el estado de ubicación tiene actualizarEstadoHabitacion igual a 'checkout', haz lo que necesites hacer
    console.log('Se recibió actualizarEstadoHabitacion*****', locationState.actualizarEstadoHabitacion);
    const actualizarEstadoHabitacion = 'checkout';
    updateEstadoHabitacion(actualizarEstadoHabitacion);
  }
}, []);

//*-------------------------------------------------
return (
  <div className="container-main-lavanderia">
    {mostrarRegistroCliente ? (
      <RegistroCliente valoresFormularioReserva={formularioRegistroValues} toggle={toggleMostrarRegistroCliente} fechaSalidaPorDefecto={fechaSalidaPorDefecto} />
    ) : (
      <div className="container-tarjeta-registro">
        <div className="inner-box-tarjeta-registro">
          <form onSubmit={handleSubmit} className="form-contact">
            <div className="datosRegistro">
              <div className="titles-tarjeta-registro-lavanderia">
                <h2 className="title-tarjeta-registro-lavanderia">TARJETA DE RESERVA</h2>
                <h2 className="subtitle-tarjeta-registro">RESERVATION CARD</h2>
              </div>
              <div className="container-tarjeta-right">
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={toggleMostrarRegistroCliente}
                  style={{
                    width: '30%'
                  }}
                >
                  Ir a Registro
                  <KeyboardArrowRight />
                </Button>
              </div>
              <div className="container-form">
                {inputs.map((input) => (
                  <div key={input.id} className="form-field">
                    <label>{input.label}</label>
                    {input.type === 'select' ? (
                      <TextField
                        select
                        name={input.name}
                        required={input.required}
                        value={formularioRegistroValues[input.name] || selectedValue}
                        onChange={(e) => handleChange(e, input.name)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                          placeholder: input.placeholder,
                        }}
                      >
                        <option value="" disabled>
                          {input.placeholder}
                        </option>
                        {input.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    ) : (
                      <TextField
                        type={input.type}
                        name={input.name}
                        label={input.placeholder}
                        required={input.required}
                        value={formularioRegistroValues[input.name] || ''}
                        onChange={(e) => handleChange(e, input.name)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )}
                    {errors[input.name] && <span className="error-message">{errors[input.name]}</span>}
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="ContactCheckboxFormTarjetaRegistro">
              <MultipleCheckbox updateTypeRoomState={updateTypeRoomState} typeOfRoomData={typeOfRoomData} habitacionSeleccionada={habitacionSeleccionada} />
            </div> */}
            <div>
              {registroId ? (
                <div className="container-buttons-comandas">
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleUpdateRegistro}
                    style={{
                      width: '25%'
                    }}
                  >
                    Actualizar
                  </Button>
                  <Button 
                    variant="outlined"
                    color="secondary" 
                    onClick={deleteRegistro}
                    style={{
                      width: '25%'
                    }}
                  >
                    Eliminar
                  </Button>
                  {/* <button className="button-group" onClick={handleUpdateRegistro}>Actualizar</button>
                  <button className="button-group" onClick={deleteRegistro}>Eliminar</button> */}
                </div>
              ) : (
                <Button 
                  onClick={createRegistro} 
                  variant="outlined" 
                  color="secondary" 
                  style={{ width: '30%' }}
                >
                  Crear Reserva
                </Button>
              )}
            </div>
            {errorMessage && <div className="button-group">{errorMessage}</div>}
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default FormularioTarjetaRegistro;
