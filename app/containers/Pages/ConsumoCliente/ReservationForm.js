import React, { useState, useEffect } from 'react';

function ReservationForm({ onData, initialComandaData, errors }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [recepcionistaName, setRecepcionistaName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    onData(roomNumber, paxName, recepcionistaName, currentDate);
  }, [roomNumber, paxName, recepcionistaName, currentDate]);

  // console.log('initialComandaData***', initialComandaData);
  useEffect(() => {
    console.log(initialComandaData);
    if (initialComandaData) {
      const { numeroHabitacion, nombrePax, recepcionista } = initialComandaData;
      setRoomNumber(numeroHabitacion);
      setPaxName(nombrePax);
      setRecepcionistaName(recepcionista);
    }
  }, [initialComandaData]);

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handlePaxNameChange(event) {
    setPaxName(event.target.value);
  }

  function handleRecepcionistaNameChange(event) {
    setRecepcionistaName(event.target.value);
  }

  return (
    <table className="table-container-type">
      <tbody>
        <tr>
          <td className="label-type">Número de habitación:</td>
          <td>
            <input className="input-type" type="text" value={roomNumber} onChange={handleRoomNumberChange} />
            {errors && errors.numeroHabitacion && (
              <span className="error-message">{errors.numeroHabitacion}</span>
            )}
          </td>
        </tr>
        <tr>
          <td className="label-type">Nombre del pax:</td>
          <td>
            <input className="input-type" type="text" value={paxName} onChange={handlePaxNameChange} />
            {errors && errors.nombrePax && (
              <span className="error-message">{errors.nombrePax}</span>
            )}
          </td>
        </tr>
        <tr>
          <td className="label-type">Recepcionista:</td>
          <td>
            <input className="input-type" type="text" value={recepcionistaName} onChange={handleRecepcionistaNameChange} />
            {errors && errors.recepcionista && (
              <span className="error-message">{errors.recepcionista}</span>
            )}
          </td>
        </tr>
        <tr>
          <td className="label-type">Fecha actual:</td>
          <td>{currentDate}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ReservationForm;
