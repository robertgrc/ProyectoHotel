import React, { useEffect, useState } from 'react';
import './FormInputTarjetaRegistro.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox';
import { dataNameRooms } from '../FormReserva/dataNameRooms';
import hotelApi from '../../../api/hotelApi';


const FormularioReservaWithId = () => {

  const fechaActual = new Date();
  const fechaActualStr = fechaActual.toISOString().substr(0, 10);

  const [values, setValues] = useState({
    userName: '',
    email: '',
    phone: '',
    creditCard: '',
    numberCreditCard: '',
    company: '',
    phoneCompany: '',
    reservadoPor: '',
    reservationDate: new Date().toISOString().substr(0, 10),
    observations: '',
    fechaIngreso: '',
    fechaSalida: '',
  });


  const inputs = [
    {
      id: 1,
      name: 'userName',
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
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      // errorMessage: "Ingresa un email valido",
      label: 'Email',
      pattern: '^[^s@]+@[^s@]+.[^s@]+$',
      required: true,
    },
    {
      id: 3,
      name: 'phone',
      type: 'number',
      placeholder: 'Telefono - Celular',
      // errorMessage: "Ingresa un numero de telefono o celular de 8 caracteres",
      label: 'Telefono - Celular',
      pattern: '^[0-9]{8}$',
      required: true,
    },
    {
      id: 4,
      name: 'creditCard',
      type: 'number',
      placeholder: 'Tarjeta de Credito',
      label: 'Tarjeta de Credito',
    },
    {
      id: 5,
      name: 'numberCreditCard',
      type: 'number',
      placeholder: 'Numero de Tarjeta de Credito',
      label: 'Numero de Tarjeta de Credito',
    },
    {
      id: 6,
      name: 'company',
      type: 'text',
      placeholder: 'Empresa/Institución)',
      label: 'Empresa/Institución)',
    },
    {
      id: 7,
      name: 'phoneCompany',
      type: 'number',
      placeholder: 'Telefono(Empresa)',
      label: 'Telefono (Empresa)',
    },
    {
      id: 8,
      name: 'reservadoPor',
      type: 'text',
      placeholder: 'Nombre completo del reservante',
      // errorMessage:
      //   "El nombre completo debe contener, minimo un nombre y dos apellidos, sin caracteres especiales, tampoco numeros!",
      label: 'Reserva tomada por:',
      pattern: '^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
      required: true,
      readOnly: true,
    },
    {
      id: 9,
      name: 'reservationDate',
      type: 'date',
      label: 'Fecha Actual',
      required: true,
      readOnly: true,
    },
    {
      id: 10,
      name: 'observations',
      type: 'text',
      placeholder: 'Observaciones',
      label: 'Observaciones',
    },
    {
      id: 11,
      name: 'fechaIngreso',
      type: 'date',
      placeholder: 'Fecha de Ingreso',
      // errorMessage: "Ingresa una fecha valida",
      label: 'Fecha de ingreso',
      required: true,
    },
    {
      id: 12,
      name: 'fechaSalida',
      type: 'date',
      placeholder: 'Fecha de Salida',
      // errorMessage: "Ingresa una fecha valida",
      label: 'Fecha de salida',
      required: true,
    },
  ];

  const [recepcionistaName, setRecepcionistaName] = useState('');
  const [recepcionistaUid, setRecepcionistaUid] = useState('');
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


  const createReserva = async () => {
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
        fechaReserva: fechaActualStr,
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

  const getReserva = async () => {
    try {
      const response = await hotelApi.get('./reserva');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { reservaId } = useParams();

  const getReservaById = async (id) => {
    try {
      const response = await hotelApi.get(`./reserva/${id}`);
      console.log(response.data);
      setValues({
        userName: response.data.reserva.nombreCompleto || '',
        email: response.data.reserva.email || '',
        phone: response.data.reserva.telefono || '',
        creditCard: response.data.reserva.tarjetaCredito || '',
        numberCreditCard: response.data.reserva.numeroTarjeta || '',
        company: response.data.reserva.empresa || '',
        phoneCompany: response.data.reserva.telefonoEmpresa || '',
        reservadoPor: response.data.reserva.reservadoPor || '',
        reservationDate: response.data.reserva.fechaReserva || '',
        observations: response.data.reserva.observaciones || '',
        fechaIngreso: response.data.reserva.fechaIngreso || '',
        fechaSalida: response.data.reserva.fechaSalida || ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (reservaId) {
      getReservaById(reservaId);
    }
  }, [reservaId]);

  const [selectedOption, setSelectedOption] = useState('option1');
  const handleChangeRadio = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUpdateReserva = async () => {
    try {
      const response = await hotelApi.put(`./reserva/${reservaId}`, {
        nombreCompleto: values.userName,
        email: values.email,
        telefono: values.phone,
        tarjetaCredito: values.creditCard,
        numeroTarjeta: values.numberCreditCard,
        empresa: values.company,
        telefonoEmpresa: values.phoneCompany,
        reservadoPor: values.reservadoPor,
        fechaReserva: values.reservationDate,
        observaciones: values.observations,
        fechaIngreso: values.fechaIngreso,
        fechaSalida: values.fechaSalida,
        nombreRecepcionista: recepcionistaName,
        uidRecepcionista: recepcionistaUid,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //* DeleteReserva
  const { deleteId } = useParams();
  const deleteReserva = async (deleteId) => {
    try {
      const response = await hotelApi.delete(`/reserva/${reservaId}`);
      console.log(response.data);
      // Hacer algo con la respuesta si es necesario
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, name) => {
    const newValue = e.target.value;
    setValues({ ...values, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                            disabled={input.readOnly}
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
              <button className="button-primary" onClick={getReserva}>Obtener Reserva</button>
              <button className="button-primary" onClick={createReserva}>Crear Reserva</button>
              <button className="button-primary" onClick={handleUpdateReserva}>Guardar</button>
            </div>
            <div>
              <button className="button-primary" onClick={deleteReserva}>Eliminar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FormularioReservaWithId;
