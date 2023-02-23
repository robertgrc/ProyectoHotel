import { React, useState } from 'react';
import axios from 'axios';
import FormInputTarjetaRegistro from './FormInputTarjetaRegistro';
// import './FormInputTarjetaRegistro';
import RowRadioButtonsGroup from '../RowRadioButtonsGroup/RowRadioButtonsGroup';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox';
import { dataNameRooms } from '../FormReserva/dataNameRooms';

const FormTarjetaRegistro = () => {
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
      name: "nombreCompleto",
      type: "text",
      placeholder: "Nombres y Apellidos",
      errorMessage:
        "El nombre completo debe contener, minimo un nombre y dos apellidos",
      label: "Nombres y Apellidos",
      pattern: `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`,
      required: true,
    },
    {
      id: 2,
      name: "nacionalidad",
      type: "text",
      placeholder: "Nacionalidad",
      errorMessage: "ingresa una nacionalidad",
      label: "Nacionalidad",
    },
    {
      id: 3,
      name: "profesion",
      type: "text",
      placeholder: "Profesion",
      errorMessage: "ingresa la profesion",
      label: "Profesion",
    },
    {
      id: 4,
      name: "procedencia",
      type: "texto",
      placeholder: "Procedencia",
      label: "Procedencia",
    },
    {
      id: 5,
      name: "edad",
      type: "number",
      placeholder: "Edad",
      label: "Edad",
    },
    {
      id: 6,
      name: "estadoCivil",
      type: "text",
      placeholder: "Estado Civil",
      label: "Estado Civil",
    },
    {
      id: 7,
      name: "direccion",
      type: "text",
      placeholder: "Direccion",
      label: "Direccion:",
    },
    {
      id: 8,
      name: "motivoViaje",
      type: "text",
      placeholder: "Motivo del Viaje",
      label: "Motivo del Viaje",
    },
    {
      id: 9,
      name: "fechaIngreso",
      type: "date",
      placeholder: "Fecha de Ingreso",
      errorMessage: "Ingresa una fecha valida",
      label: "Fecha de ingreso",
      required: true,
    },
    {
      id: 10,
      name: "fechaSalida",
      type: "date",
      placeholder: "Fecha de Salida",
      errorMessage: "Ingresa una fecha valida",
      label: "Fecha de salida",
      required: true,
    },
    {
      id: 11,
      name: "observaciones",
      type: "text",
      placeholder: "Observaciones",
      label: "Observaciones",
      special: "true",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getRegistro = async () => {
    try {
      const url = 'http://localhost:4000/api/registro';
      const response = await axios.get(url);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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

  const [selectedValueRadio, setSelectedValueRadio] = useState('si');

  const handleChangeRadio = (event) => {
    setSelectedValueRadio(event.target.value);
  };

  const createRegistro = async () => {
    try {
      const url = 'http://localhost:4000/api/registro';

      const body = {
        nombreCompleto: values.nombreCompleto,
        nacionalidad: values.nacionalidad,
        profesion: values.profesion,
        procedencia: values.procedencia,
        edad: values.edad,
        estadoCivil: values.estadoCivil,
        direccion: values.direccion,
        motivoViaje: values.motivoViaje,
        tieneEquipaje: selectedValueRadio,
        tipoHabitacion: arraySelected,
        observaciones: values.observaciones,
        fechaIngreso: values.fechaIngreso,
        fechaSalida: values.fechaSalida,
      };
      const response = await axios.post(url, body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="app-form-tarjeta-registro">
      <form onSubmit={handleSubmit}>
        <div className="datosRegistro">
          <h2>TARJETA DE REGISTRO</h2>
          {inputs.map((input) => (
            <FormInputTarjetaRegistro
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              className={input.special ? 'special-input' : ''}
            />
          ))}
        </div>
        <div className="ContactCheckboxFormTarjetaRegistro">
          <MultipleCheckbox updateTypeRoomState={updateTypeRoomState} />
        </div>
        <div className="RowRadioButtonsGroup">
          <RowRadioButtonsGroup
            selectedValueRadio={selectedValueRadio}
            handleChangeRadio={handleChangeRadio}
          />
        </div>
        <button>Submit</button>
        <button onClick={getRegistro}>Obtener Registro</button>
        <button onClick={createRegistro}>Crear Registro</button>
      </form>
    </div>
  );
};

export default FormTarjetaRegistro;
