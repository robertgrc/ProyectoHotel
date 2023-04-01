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

  const inputs = [
    {
      id: 1,
      name: 'nombreCompleto',
      type: 'text',
      placeholder: 'Nombres y Apellidos',
      // errorMessage:
      //   "El nombre completo debe contener, minimo un nombre y dos apellidos",
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
    },
    {
      id: 3,
      name: 'profesion',
      type: 'text',
      placeholder: 'Profesion',
      // errorMessage: "ingresa la profesion",
      label: 'Profesion',
    },
    {
      id: 4,
      name: 'procedencia',
      type: 'texto',
      placeholder: 'Procedencia',
      label: 'Procedencia',
    },
    {
      id: 5,
      name: 'edad',
      type: 'number',
      placeholder: 'Edad',
      label: 'Edad',
    },
    {
      id: 6,
      name: 'estadoCivil',
      type: 'text',
      placeholder: 'Estado Civil',
      label: 'Estado Civil',
    },
    {
      id: 7,
      name: 'direccion',
      type: 'text',
      placeholder: 'Direccion',
      label: 'Direccion:',
    },
    {
      id: 8,
      name: 'motivoViaje',
      type: 'text',
      placeholder: 'Motivo del Viaje',
      label: 'Motivo del Viaje',
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
    },
  ];

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

  const [selectedOption, setSelectedOption] = useState('option1');
  const handleChangeRadio = (event) => {
    setSelectedOption(event.target.value);
  };

  const createRegistro = async () => {
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
//*----
  const { registroId } = useParams();

  const getRegistroById = async (id) => {
    try {
      console.log("id:",id);
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
//*---
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
                  {/* <thead>
                    <tr>
                      <th>Label</th>
                      <th>Input</th>
                    </tr>
                  </thead> */}
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
                        </td>
                        <td>{input.errorMessage || ''}</td>
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
              <button className='button-primary'>Submit</button>
              <button className="button-primary" onClick={getRegistro}>Obtener Registro</button>
              <button className="button-primary" onClick={createRegistro}>Crear Registro</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};         

export default FormularioTarjetaRegistro;
