/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ArrowBack from '@material-ui/icons/ArrowBack';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox';
import { dataNameRooms } from '../FormReserva/dataNameRooms';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import { habitaciones } from '../TablaCalendarioReservas/habitaciones';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';
import './RegistroCliente.css';


const RegistroCliente = ({ valoresFormularioReserva, toggle, fechaSalidaPorDefecto }) => {
  const [formularioRegistroValues, setFormularioRegistroValues] = useState({
    nombreCompleto: '',
    nacionalidad: '',
    profesion: '',
    procedencia: '',
    edad: '',
    estadoCivil: '',
    direccion: '',
    motivoViaje: '',
    observaciones: '',
    fechaIngreso: '',
    fechaSalida: '',
    estadoHabitacion: '',
    numeroHabitacion: '',
  });

  // console.log(valoresFormularioReserva);
  const formContext = useContext(FormContext);
  const { habitacionSeleccionada, fechaSeleccionada } = formContext;
  useEffect(() => {
    if (habitacionSeleccionada && fechaSeleccionada) {
      setFormularioRegistroValues({
        ...formularioRegistroValues,
        fechaIngreso: fechaSeleccionada,
        estadoHabitacion: habitacionSeleccionada.estado,
        numeroHabitacion: habitacionSeleccionada.numero,
        fechaSalida: fechaSalidaPorDefecto.toISOString().slice(0, 10),
      });
    }
  }, [habitacionSeleccionada, fechaSeleccionada]);

  const [typeRoomState, setTypeRoomState] = useState([]);
  const [arraySelected, setArraySelected] = useState(
    habitacionSeleccionada ? [habitacionSeleccionada.nombre] : []
  );
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
    nacionalidad: 'Ingresa una nacionalidad.',
    profesion: 'Ingresa una profesión.',
    procedencia: 'Ingresa una procedencia.',
    edad: 'Ingresa una edad válida.',
    estadoCivil: 'Ingresa un estado civil.',
    direccion: 'Ingresa una dirección.',
    motivoViaje: 'Ingresa un motivo de viaje.',
    fechaIngreso: 'Ingresa una fecha de ingreso válida.',
    fechaSalida: 'Ingresa una fecha de salida válida.',
    estadoHabitacion: 'Ingresa un estado de Habitacion valido',
    numeroHabitacion: 'Ingresa un numero de Habitacion valido',
  };

  const inputs = [
    {
      id: 1,
      name: 'nombreCompleto',
      type: 'text',
      placeholder: 'Nombres y Apellidos',
      // label: 'Nombres y Apellidos',
      pattern: '^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
      required: true,
    },
    {
      id: 2,
      name: 'nacionalidad',
      type: 'text',
      placeholder: 'Nacionalidad',
      // label: 'Nacionalidad',
      required: true,
    },
    {
      id: 3,
      name: 'profesion',
      type: 'text',
      placeholder: 'Profesión',
      // label: 'Profesión',
      required: true,
    },
    {
      id: 4,
      name: 'procedencia',
      type: 'texto',
      placeholder: 'Procedencia',
      // label: 'Procedencia',
      required: true,
    },
    {
      id: 5,
      name: 'edad',
      type: 'number',
      placeholder: 'Edad',
      // label: 'Edad',
      required: true,
    },
    {
      id: 6,
      name: 'estadoCivil',
      type: 'text',
      placeholder: 'Estado Civil',
      // label: 'Estado Civil',
      required: true,
    },
    {
      id: 7,
      name: 'direccion',
      type: 'text',
      placeholder: 'Direccion',
      // label: 'Direccion:',
      required: true,
    },
    {
      id: 8,
      name: 'motivoViaje',
      type: 'text',
      placeholder: 'Motivo del Viaje',
      // label: 'Motivo del Viaje',
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
      id: 12,
      name: 'numeroHabitacion',
      type: 'text',
      placeholder: 'Número de Habitación',
      // label: 'Número de Habitación',
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
  ];

  const validate = () => {
    let isValid = true;
    // const errors = {};
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
      nacionalidad: '',
      profesion: '',
      procedencia: '',
      edad: '',
      estadoCivil: '',
      direccion: '',
      motivoViaje: '',
      tieneEquipaje: '',
      tipoHabitacion: '',
      observaciones: '',
      fechaIngreso: '',
      fechaSalida: '',
      numeroHabitacion: '',
      estadoHabitacion: '',
    });
  }

  const [selectedOption, setSelectedOption] = useState('tiene equipaje');
  const handleChangeRadio = (event) => {
    setSelectedOption(event.target.value);
  };

  const [errorMessage, setErrorMessage] = useState('');

  const createRegistro = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        const body = {
          nombreCompleto: formularioRegistroValues.nombreCompleto,
          nacionalidad: formularioRegistroValues.nacionalidad,
          profesion: formularioRegistroValues.profesion,
          procedencia: formularioRegistroValues.procedencia,
          edad: formularioRegistroValues.edad,
          estadoCivil: formularioRegistroValues.estadoCivil,
          direccion: formularioRegistroValues.direccion,
          motivoViaje: formularioRegistroValues.motivoViaje,
          tieneEquipaje: selectedOption,
          tipoHabitacion: arraySelected,
          observaciones: formularioRegistroValues.observaciones,
          fechaIngreso: formularioRegistroValues.fechaIngreso,
          fechaSalida: formularioRegistroValues.fechaSalida,
          numeroHabitacion: formularioRegistroValues.numeroHabitacion,
          estadoHabitacion: formularioRegistroValues.estadoHabitacion,
        };
        const response = await hotelApi.post('/registroCliente', body);
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Formulario enviado exitosamente',
          text: 'Gracias por llenar el Formulario',
          confirmButtonText: 'OK'
        }).then(() => {
          resetForm();
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
        nacionalidad: registro.nacionalidad || '',
        profesion: registro.profesion || '',
        procedencia: registro.procedencia || '',
        edad: registro.edad || '',
        estadoCivil: registro.estadoCivil || '',
        direccion: registro.direccion || '',
        motivoViaje: registro.motivoViaje || '',
        selectedOption: registro.tieneEquipaje || '',
        arraySelected: registro.tipoHabitacion || [],
        observaciones: registro.observaciones || '',
        fechaIngreso: registro.fechaIngreso || '',
        fechaSalida: registro.fechaSalida || '',
        numeroHabitacion: registro.numeroHabitacion || '',
        estadoHabitacion: registro.estadoHabitacion || '',
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
        nacionalidad: formularioRegistroValues.nacionalidad || '',
        profesion: formularioRegistroValues.profesion || '',
        procedencia: formularioRegistroValues.procedencia || '',
        edad: formularioRegistroValues.edad || '',
        estadoCivil: formularioRegistroValues.estadoCivil || '',
        direccion: formularioRegistroValues.direccion || '',
        motivoViaje: formularioRegistroValues.motivoViaje || '',
        selectedOption: formularioRegistroValues.tieneEquipaje || '',
        arraySelected: formularioRegistroValues.tipoHabitacion || [],
        observaciones: formularioRegistroValues.observaciones || '',
        fechaIngreso: formularioRegistroValues.fechaIngreso || '',
        fechaSalida: formularioRegistroValues.fechaSalida || '',
        numeroHabitacion: formularioRegistroValues.numeroHabitacion || '',
        estadoHabitacion: formularioRegistroValues.estadoHabitacion || '',
    });
    console.log(response.data);
    showSuccessMessage('Formulario actualizado con éxito');
    resetForm();
  } catch (error) {
    console.log(error);
    showErrorMessage('No se pudo actualizar el Formulario');
  }
};

// const { deleteId } = useParams();
const deleteRegistro = async (deleteId) => {
  try {
    const response = await hotelApi.delete(`/registro/${registroId}`);
    console.log(response.data);
    showSuccessMessage('El formulario fue eliminado con exito');
    resetForm();
  } catch (error) {
    console.log(error);
    showErrorMessage('No se pudo eliminar el Formulario');
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e, name) => {
    console.log(e.target);
    let { value } = e.target;
    if (name === 'estadoHabitacion') {
      // eslint-disable-next-line prefer-destructuring
      value = e.target.options[e.target.selectedIndex].value;
    }
    setFormularioRegistroValues({
      ...formularioRegistroValues,
      [name]: value,
    });
  };

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
return (
  <div className="container-main-lavanderia">
    <div className="container-tarjeta-registro">
      <div className="inner-box-tarjeta-registro">
        <form onSubmit={handleSubmit} className="form-contact">
          <div className="datosRegistro">
            <div className="titles-tarjeta-registro-lavanderia">
              <h2 className="title-tarjeta-registro-lavanderia">TARJETA DE REGISTRO</h2>
              <h2 className="subtitle-tarjeta-registro">REGISTRATION CARD</h2>
            </div>
            <div className="container-tarjeta-right">
              <Button
                variant="outlined"
                color="secondary"
                onClick={toggle}
                style={{
                  width: '30%'
                }}
              >
                <KeyboardArrowLeft />
                Ir a Reserva
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
                      value={formularioRegistroValues[input.name] || ''}
                      onChange={(e) => handleChange(e, input.name)}
                      variant="outlined"
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
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
          {/* Rest of the code... */}
          <div className="buttons-container">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleUpdateRegistro}
              style={{
                width: '30%'
              }}
            >
              Guardar
            </Button>
            {/* <button className="button-comanda" onClick={handleUpdateRegistro}>Guardar</button> */}
            {/* <button className="button-primary" onClick={createRegistro}>Crear</button> */}
            {/* <button className="button-primary" onClick={getRegistro}>MostrarRegistros</button> */}
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  </div>
);
};
export default RegistroCliente;
