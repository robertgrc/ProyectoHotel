
import React, { useState, useEffect } from 'react';

function ComandaDatos({ onData, initialComandaData, errors }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [meseroName, setMeseroName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    onData(roomNumber, paxName, meseroName, currentDate);
  }, [roomNumber, paxName, meseroName, currentDate]);

  useEffect(() => {
    if (initialComandaData) {
      const { numeroHabitacion, nombrePax, mesero } = initialComandaData;
      setRoomNumber(numeroHabitacion);
      setPaxName(nombrePax);
      setMeseroName(mesero);
    }
  }, [initialComandaData]);

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handlePaxNameChange(event) {
    setPaxName(event.target.value);
  }

  function handleMeseroNameChange(event) {
    setMeseroName(event.target.value);
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>Número de habitación:</td>
          <td>
            <span className="input-type">{roomNumber}</span>
            {errors && errors.numeroHabitacion && (
              <span className="error-message">{errors.numeroHabitacion}</span>
            )}
          </td>
        </tr>
        <tr>
          <td>Nombre del pax:</td>
          <td>
            <span className="input-type">{paxName}</span>
            {errors && errors.nombrePax && (
              <span className="error-message">{errors.nombrePax}</span>
            )}
          </td>
        </tr>
        <tr>
          <td>Mesero:</td>
          <td>
            <input type="text" value={meseroName} onChange={handleMeseroNameChange} />
            {errors && errors.mesero && (
              <span className="error-message">{errors.mesero}</span>
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

export default ComandaDatos;
