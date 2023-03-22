import React, { useEffect, useState } from 'react';
import "./FormInputTarjetaRegistro.css";
import axios from "axios";
import MultipleCheckbox from "../MultipleCheckbox/MultipleCheckbox";
import { dataNameRooms } from "../FormReserva/dataNameRooms";
import hotelApi from '../../../api/hotelApi';

const FormularioReserva = () => {
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

  const [recepcionistaName, setRecepcionistaName] = useState('');
  const [recepcionistaUid, setRecepcionistaUid] = useState('');

  const inputs = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "Nombres y Apellidos",
      // errorMessage:
      //   "El nombre completo debe contener, minimo un nombre y dos apellidos",
      label: "Nombres y Apellidos",
      pattern: `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`,
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      // errorMessage: "Ingresa un email valido",
      label: "Email",
      pattern: "^[^s@]+@[^s@]+.[^s@]+$",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "number",
      placeholder: "Telefono - Celular",
      // errorMessage: "Ingresa un numero de telefono o celular de 8 caracteres",
      label: "Telefono - Celular",
      pattern: `^[0-9]{8}$`,
      required: true,
    },
    {
      id: 4,
      name: "creditCard",
      type: "number",
      placeholder: "Tarjeta de Credito",
      label: "Tarjeta de Credito",
    },
    {
      id: 5,
      name: "numberCreditCard",
      type: "number",
      placeholder: "Numero de Tarjeta de Credito",
      label: "Numero de Tarjeta de Credito",
    },
    {
      id: 6,
      name: "company",
      type: "text",
      placeholder: "Empresa/Institución)",
      label: "Empresa/Institución)",
    },
    {
      id: 7,
      name: "phoneCompany",
      type: "number",
      placeholder: "Telefono(Empresa)",
      label: "Telefono (Empresa)",
    },
    {
      id: 8,
      name: "reservadoPor",
      type: "text",
      placeholder: "Nombre completo del reservante",
      // errorMessage:
      //   "El nombre completo debe contener, minimo un nombre y dos apellidos, sin caracteres especiales, tampoco numeros!",
      label: "Reserva tomada por:",
      pattern: `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`,
      required: true,
    },
    {
      id: 9,
      name: "fechaReserva",
      type: "date",
      placeholder: "dd//mm/aaaa",
      // errorMessage: "Ingresa una fecha valida",
      label: "Fecha Actual",
      required: true,
    },
  
    {
      id: 10,
      name: "observations",
      type: "text",
      placeholder: "Observaciones",
      label: "Observaciones",
    },
    {
      id: 11,
      name: "fechaIngreso",
      type: "date",
      placeholder: "Fecha de Ingreso",
      // errorMessage: "Ingresa una fecha valida",
      label: "Fecha de ingreso",
      required: true,
    },
    {
      id: 12,
      name: "fechaSalida",
      type: "date",
      placeholder: "Fecha de Salida",
      // errorMessage: "Ingresa una fecha valida",
      label: "Fecha de salida",
      required: true,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getRegistro = async () => {
    try {
      // const url = 'http://localhost:4000/api/reserva';
      // const response = await axios.get(url);
      const response = await hotelApi.get('./reserva');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //insertar codigo
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

  const [selectedOption, setSelectedOption] = useState('option1');
  const handleChangeRadio = (event) => {
    setSelectedOption(event.target.value);
  };

  const createRegistro = async () => {
    try {
      

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
      if (recepcionistaUid) {
        body.reservadoPor = recepcionistaUid;
      }
      const response = await hotelApi.post('/reserva', body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, name) => {
    const newValue = e.target.value;
    setValues({ ...values, [name]: newValue });
  };

  useEffect(() => {
    const storedRecepcionistaName = localStorage.getItem('NombreUsuarioLogueado');
    if (storedRecepcionistaName) {
      setRecepcionistaName(storedRecepcionistaName);
      setValues({ ...values, reservadoPor: storedRecepcionistaName });
    }
  }, []);

  useEffect(() => {
    const storedRecepcionistaUid = localStorage.getItem('UidUsuarioLogueado');
    if (storedRecepcionistaUid) {
      setRecepcionistaUid(storedRecepcionistaUid);
    }
  }, []);


  return (
    <div className="container-main">
      <div className="container-tarjeta-registro">
        <div className="inner-box-tarjeta-registro">
          <form onSubmit={handleSubmit}>
            <div className="datosRegistro">
              <div className="Titles-tarjeta-registro">
                <h2 className="title-tarjeta-registro">FORMULARIO DE RESERVAS</h2>
                <h2 className="subtitle-tarjeta-registro">BOOKING CARD</h2>
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

export default FormularioReserva;
