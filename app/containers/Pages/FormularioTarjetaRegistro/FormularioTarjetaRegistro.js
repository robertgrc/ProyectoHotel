import React, { useState, useEffect } from 'react';
import './FormInputTarjetaRegistro.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox';
import { dataNameRooms } from '../FormReserva/dataNameRooms';
import hotelApi from '../../../api/hotelApi';

const FormularioTarjetaRegistro = () => {
  const [values, setValues] = useState({
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
  });

  const [typeRoomState, setTypeRoomState] = useState([]);
  const [arraySelected, setArraySelected] = useState([]);
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
  };

  const validate = () => {
    let isValid = true;
    let errors = {};
    inputs.forEach(input => {
      if (!values[input.name]) {
        errors[input.name] = errorMessages[input.name];
        isValid = false;
      }
      else if (input.pattern && !RegExp(input.pattern).test(values[input.name])) {
        errors[input.name] = errorMessages[input.name];
        isValid = false;
      }
    });
    setErrors(errors);
    return isValid;
  };

  const inputs = [
    {
      id: 1,
      name: 'nombreCompleto',
      type: 'text',
      placeholder: 'Nombres y Apellidos',
      // errorMessage: 'El nombre completo debe contener, minimo un nombre y dos apellidos',
      label: 'Nombres y Apellidos',
      pattern: '^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
      required: true,
    },
    {
      id: 2,
      name: 'nacionalidad',
      type: 'text',
      placeholder: 'Nacionalidad',
      // errorMessage: "ingresa una nacionalidad",
      label: 'Nacionalidad',
      required: true,
    },
    {
      id: 3,
      name: 'profesion',
      type: 'text',
      placeholder: 'Profesion',
      // errorMessage: "ingresa la profesion",
      label: 'Profesion',
      required: true,
    },
    {
      id: 4,
      name: 'procedencia',
      type: 'texto',
      placeholder: 'Procedencia',
      label: 'Procedencia',
      required: true,
    },
    {
      id: 5,
      name: 'edad',
      type: 'number',
      placeholder: 'Edad',
      label: 'Edad',
      required: true,
    },
    {
      id: 6,
      name: 'estadoCivil',
      type: 'text',
      placeholder: 'Estado Civil',
      label: 'Estado Civil',
      required: true,
    },
    {
      id: 7,
      name: 'direccion',
      type: 'text',
      placeholder: 'Direccion',
      label: 'Direccion:',
      required: true,
    },
    {
      id: 8,
      name: 'motivoViaje',
      type: 'text',
      placeholder: 'Motivo del Viaje',
      label: 'Motivo del Viaje',
      required: true,
    },
    {
      id: 9,
      name: 'fechaIngreso',
      type: 'date',
      placeholder: 'Fecha de Ingreso',
      // errorMessage: "Ingresa una fecha valida",
      label: 'Fecha de ingreso',
      required: true,
    },
    {
      id: 10,
      name: 'fechaSalida',
      type: 'date',
      placeholder: 'Fecha de Salida',
      // errorMessage: "Ingresa una fecha valida",
      label: 'Fecha de salida',
      required: true,
    },
    {
      id: 11,
      name: 'observaciones',
      type: 'text',
      placeholder: 'Observaciones',
      label: 'Observaciones',
      special: 'true',
      required: true,
    },
  ];


  const [selectedOption, setSelectedOption] = useState('option1');
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
          nombreCompleto: values.nombreCompleto,
          nacionalidad: values.nacionalidad,
          profesion: values.profesion,
          procedencia: values.procedencia,
          edad: values.edad,
          estadoCivil: values.estadoCivil,
          direccion: values.direccion,
          motivoViaje: values.motivoViaje,
          tieneEquipaje: selectedOption,
          tipoHabitacion: arraySelected,
          observaciones: values.observaciones,
          fechaIngreso: values.fechaIngreso,
          fechaSalida: values.fechaSalida,
        };
        const response = await hotelApi.post('/registro', body);
        console.log(response);
      } catch (error) {
        console.log(error);
        setErrorMessage('Error al enviar el formulario');
      }
    } else {
      console.log('Hay un error en el Formulario');
      setErrorMessage('Hay un error en el formulario');
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
//*--------------------------------------------------

  const { registroId } = useParams();

  const getRegistroById = async (id) => {
    try {
      console.log('id:', id);
      const response = await hotelApi.get(`/registro/${id}`);
      console.log(response.data);
      const registro = response.data.registro;
      setValues({
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
//*----------------------------------------------------

const handleUpdateRegistro = async () => {
  try {
    const response = await hotelApi.put(`./registro/${registroId}`, {
        nombreCompleto: values.nombreCompleto || '',
        nacionalidad: values.nacionalidad || '',
        profesion: values.profesion || '',
        procedencia: values.procedencia || '',
        edad: values.edad || '',
        estadoCivil: values.estadoCivil || '',
        direccion: values.direccion || '',
        motivoViaje: values.motivoViaje || '',
        selectedOption: values.tieneEquipaje || '',
        arraySelected: values.tipoHabitacion || [],
        observaciones: values.observaciones || '',
        fechaIngreso: values.fechaIngreso || '',
        fechaSalida: values.fechaSalida || '',
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

//*---------------------------------------------------------
//* DeleteRegistro
const { deleteId } = useParams();
const deleteRegistro = async (deleteId) => {
  try {
    const response = await hotelApi.delete(`/registro/${registroId}`);
    console.log(response.data);
    // Hacer algo con la respuesta si es necesario
  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  const handleChange = (e, name) => {
    setValues({
      ...values,
      [name]: e.target.value
    });
  };

  return (
    <div className="container-main">
      <div className="container-tarjeta-registro">
        <div className="inner-box-tarjeta-registro">
          <form onSubmit={handleSubmit}>
            <div className="datosRegistro">
              <div className="Titles-tarjeta-registro">
                <h2 className="title-tarjeta-registro">TARJETA DE REGISTRO</h2>
                <h2 className="subtitle-tarjeta-registro">REGISTRATION CARD</h2>
              </div>
              <div className="container-table">
                <table>
                  <tbody>
                    {inputs.map((input) => (
                      <tr key={input.id}>
                        <td>{input.label}</td>
                        <td>
                          <input
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            pattern={input.pattern}
                            required={input.required}
                            value={values[input.name] || ''}
                            onChange={(e) => handleChange(e, input.name)}
                          />
                          <span className="error-message">
                            {errors[input.name] || ''}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="ContactCheckboxFormTarjetaRegistro">
              <MultipleCheckbox updateTypeRoomState={updateTypeRoomState} />
            </div>
            <h5 className="question-tarjeta-registro">Tiene Equipaje?</h5>
            <div className="container-radio-button">
              <label>
                <input
                  className="input-radiobutton"
                  type="radio"
                  value="option1"
                  checked={selectedOption === 'option1'}
                  onChange={handleChangeRadio}
                />
              Si
              </label>
              <label>
                <input
                  className="input-radiobutton"
                  type="radio"
                  value="option2"
                  checked={selectedOption === 'option2'}
                  onChange={handleChangeRadio}
                />
                No
              </label>
            </div>
            <div className='container-buttons'>
              <button className="button-primary" onClick={getRegistro}>Obtener Registro</button>
              <button className="button-primary" onClick={createRegistro}>Crear Registro</button>
              <button className='button-primary' onClick={handleUpdateRegistro}>guardar</button>
            </div>
            <div>
              <button className='button-primary' onClick={deleteRegistro}>Eliminar</button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioTarjetaRegistro;
