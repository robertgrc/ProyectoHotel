
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
    // console.log(initialComandaData);
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
            <input type="text" value={roomNumber} onChange={handleRoomNumberChange} />
            {errors && errors.numeroHabitacion && (
              <span style={{ display: 'block', maxWidth: '200px', color: 'red' }}>{errors.numeroHabitacion}</span>
            )}
          </td>
        </tr>
        <tr>
          <td>Nombre del pax:</td>
          <td>
            <input type="text" value={paxName} onChange={handlePaxNameChange} />
            {errors && errors.nombrePax && (
              <span style={{ display: 'block', maxWidth: '200px', color: 'red' }}>{errors.nombrePax}</span>
            )}
          </td>
        </tr>
        <tr>
          <td>Mesero:</td>
          <td>
            <input type="text" value={meseroName} onChange={handleMeseroNameChange} />
            {errors && errors.mesero && (
              <span style={{ display: 'block', maxWidth: '200px', color: 'red' }}>{errors.mesero}</span>
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
