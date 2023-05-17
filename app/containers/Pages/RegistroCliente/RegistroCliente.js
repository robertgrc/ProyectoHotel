
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox';
import { dataNameRooms } from '../FormReserva/dataNameRooms';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import { habitaciones } from '../TablaCalendarioReservas/habitaciones';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';


const RegistroCliente = ({ valoresFormularioReserva, toggle }) => {
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

  const validate = () => {
    let isValid = true;
    let errors = {};
    inputs.forEach(input => {
      if (!formularioRegistroValues[input.name]) {
        errors[input.name] = errorMessages[input.name];
        isValid = false;
      }
      else if (input.pattern && !RegExp(input.pattern).test(formularioRegistroValues[input.name])) {
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
      label: 'Nombres y Apellidos',
      pattern: '^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
      required: true,
    },
    {
      id: 2,
      name: 'nacionalidad',
      type: 'text',
      placeholder: 'Nacionalidad',
      label: 'Nacionalidad',
      required: true,
    },
    {
      id: 3,
      name: 'profesion',
      type: 'text',
      placeholder: 'Profesión',
      label: 'Profesión',
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
      label: 'Fecha de ingreso',
      required: true,
    },
    {
      id: 10,
      name: 'fechaSalida',
      type: 'date',
      placeholder: 'Fecha de Salida',
      label: 'Fecha de salida',
      required: true,
    },
    // {
    //   id: 11,
    //   name: 'estadoHabitacion',
    //   type: 'select',
    //   placeholder: 'Estado de Habitación',
    //   label: 'Estado de Habitación',
    //   required: true,
    //   options: [
    //     { value: 'alquilado', label: 'alquilado' },
    //     { value: 'confirmado', label: 'confirmado' },
    //     { value: 'provisional', label: 'provisional' },
    //     { value: 'cancelado', label: 'cancelado' }
    //   ]
    // },
    {
      id: 12,
      name: 'numeroHabitacion',
      type: 'text',
      placeholder: 'Número de Habitación',
      label: 'Número de Habitación',
      required: true,
    },
    {
      id: 13,
      name: 'observaciones',
      type: 'text',
      placeholder: 'Observaciones',
      label: 'Observaciones',
      special: 'true',
      required: true,
    },
  ];

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

const { deleteId } = useParams();
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
    let { value } = e.target;
    if (name === 'estadoHabitacion') {
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
    <div className="container-main">
      <div className="container-tarjeta-registro">
        <div className="inner-box-tarjeta-registro">
          <form onSubmit={handleSubmit} className="form-contact">
            <div className="datosRegistro">
              <div className="Titles-tarjeta-registro">
                <h2 className="title-tarjeta-registro">TARJETA DE REGISTRO</h2>
                <h2 className="subtitle-tarjeta-registro">REGISTRATION CARD</h2>
                <button className="button-primary" onClick={toggle}>Cerrar</button>
              </div>
              <div className="container-table">
                <table>
                  <tbody>
                    {inputs.map((input) => (
                      <tr key={input.id}>
                        <td>{input.label}</td>
                        <td>
                          {input.type === 'select' ? (
                            <select
                              name={input.name}
                              required={input.required}
                              value={formularioRegistroValues[input.name] || ''}
                              onChange={(e) => handleChange(e, input.name)}
                            >
                              <option value="" disabled>
                                {input.placeholder}
                              </option>
                              {input.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={input.type}
                              name={input.name}
                              placeholder={input.placeholder}
                              pattern={input.pattern}
                              required={input.required}
                              value={formularioRegistroValues[input.name] || ''}
                              onChange={(e) => handleChange(e, input.name)}
                            />
                          )}
                          <span className="error-message">{errors[input.name] || ''}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="ContactCheckboxFormTarjetaRegistro">
              <MultipleCheckbox updateTypeRoomState={updateTypeRoomState} typeOfRoomData={typeOfRoomData} habitacionSeleccionada={habitacionSeleccionada} />
            </div> */}
            <h5 className="question-tarjeta-registro">Tiene Equipaje?</h5>
            <div className="container-radio-button">
              <label>
                <input
                  className="input-radiobutton"
                  type="radio"
                  value="tiene equipaje"
                  checked={selectedOption === 'tiene equipaje'}
                  onChange={handleChangeRadio}
                />
              Si
              </label>
              <label>
                <input
                  className="input-radiobutton"
                  type="radio"
                  value="no tiene equipaje"
                  checked={selectedOption === 'no tiene equipaje'}
                  onChange={handleChangeRadio}
                />
                No
              </label>
            </div>
            <div className="container-buttons">
              <button className="button-primary" onClick={handleUpdateRegistro}>Guardar</button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;
