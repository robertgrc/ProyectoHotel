import React, { useContext, useEffect, useState } from 'react';
import FormContext from '../../../context/FormProvider';

function DatosLavanderia({ onData, initialComandaData, errors }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [recepcionistaName, setRecepcionistaName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    onData(roomNumber, paxName, recepcionistaName, currentDate);
  }, [roomNumber, paxName, recepcionistaName, currentDate]);

  useEffect(() => {
    if (initialComandaData) {
    console.log('initialComandaData', initialComandaData);
      const { numeroHabitacion, nombreHuesped, recepcionista } = initialComandaData;
      setRoomNumber(numeroHabitacion);
      setPaxName(nombreHuesped);
      setRecepcionistaName(recepcionista);
    }
  }, [initialComandaData]);

  const formContext = useContext(FormContext);
  const { reservaSeleccionada } = formContext;
  // console.log('reservaSeleccionada datosLavand', reservaSeleccionada);
    useEffect(() => {
      if (reservaSeleccionada) {
        setRoomNumber(reservaSeleccionada.numeroHabitacion);
        setPaxName(reservaSeleccionada.nombreCompleto);
      }
   }, [reservaSeleccionada]);


  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handleGuestNameChange(event) {
    setPaxName(event.target.value);
  }

  function handleRecepcionistaNameChange(event) {
    setRecepcionistaName(event.target.value);
  }
  return (
    <table className="lavanderia-datos">
      <tbody>
        <tr>
          <td>Número de Habitación:</td>
          <td>
            <span className="input-type">{roomNumber}</span>
            {errors && errors.numeroHabitacion && (
              <span className="error-message">{errors.numeroHabitacion}</span>
            )}
          </td>
        </tr>
        <tr>
          <td>Nombre del Huesped:</td>
          <td>
            <span className="input-type">{paxName}</span>
            {errors && errors.nombreHuesped && (
              <span className="error-message">{errors.nombreHuesped}</span>
            )}
          </td>
        </tr>
        <tr>
          <td>Nombre del Recepcionista:</td>
          <td>
            <input type="text" value={recepcionistaName} onChange={handleRecepcionistaNameChange} />
            {errors && errors.recepcionista && (
              <span className="error-message">{errors.recepcionista}</span>
            )}
          </td>
        </tr>
        <tr>
          <td>Fecha actual:</td>
          <td>{currentDate}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default DatosLavanderia;
