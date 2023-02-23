import React, { useState } from 'react';
import axios from 'axios';
import FormInputReserva from './FormInputReserva';
// import './FormInputReserva';
import { TitlesForm } from './dataFormReserva';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox';
import { dataNameRooms } from './dataNameRooms';

const FormReserva = () => {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    phone: '',
    creditCard: '',
    numberCreditCard: '',
    company: '',
    phoneCompany: '',
    reservadoPor: '',
    reservationDate: '',
    observations: '',
    fechaIngreso: '',
    fechaSalida: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getReserva = async () => {
    try {
      const url = 'http://localhost:4000/api/reserva';
      const response = await axios.get(url);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [typeRoomState, setTypeRoomState] = useState([]);
  const [arraySelected, setArraySelected] = useState([]);
  const fechaActual = new Date();
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

  console.log(arraySelected);

  const createReserva = async () => {
    try {
      const url = 'http://localhost:4000/api/reserva';

      const body = {
        nombreCompleto: values.userName,
        email: values.email,
        telefono: values.phone,
        tarjetaCredito: values.creditCard,
        numeroTarjeta: values.numberCreditCard,
        empresa: values.company,
        telefonoEmpresa: values.phoneCompany,
        reservadoPor: values.reservadoPor,
        fechaReserva: fechaActual,
        tipoHabitacion: arraySelected,
        observaciones: values.observations,
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
  // console.log(values);
  return (
    <div className="app-form-reservas">
      <div className="form-reserva">
        <form onSubmit={handleSubmit}>
          <div className="h2-reserva">
            <h2>FORMULARIO DE RESERVAS</h2>
          </div>
          {TitlesForm.map((input) => (
            <div className="formInputReserva">
              <FormInputReserva
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            </div>
          ))}
          <div className="multipleCheckbox">
            <MultipleCheckbox updateTypeRoomState={updateTypeRoomState} />
          </div>

          <div className="Botones">
            <div className="submit-reserva">
              <button>Submit</button>
            </div>
            <div className="submit-reserva">
              <button onClick={createReserva}>Crear Reserva</button>
            </div>
            <div className="submit-reserva" onClick={getReserva}>
              <button>Obtener Reservas</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormReserva;
