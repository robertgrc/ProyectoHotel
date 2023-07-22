
import React, { useState, useEffect } from 'react';

function ComandaConsumoDatos({ onData, initialComandaData, errors }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [waiterName, setWaiterName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
  onData(roomNumber, paxName, waiterName, currentDate);
  }, [roomNumber, paxName, waiterName, currentDate]);

  useEffect(() => {
    if (initialComandaData) {
      const { numeroHabitacion, nombrePax, camarera } = initialComandaData;
      setRoomNumber(numeroHabitacion);
      setPaxName(nombrePax);
      setWaiterName(camarera);
    }
  }, [initialComandaData]);

  function handleWaiterNameChange(event) {
    setWaiterName(event.target.value);
  }


  return (
    <table className="table-container-type">
      <tbody>
        <tr>
          <td className="label-type">Número de habitación:</td>
          <td>
            <span className="input-type">{roomNumber}</span>
            {errors && errors.numeroHabitacion && (
              <span className="error-message">{errors.numeroHabitacion}</span>
            )}
          </td>
        </tr>
        <tr>
          <td className="label-type">Nombre del pax:</td>
          <td>
            <span className="input-type">{paxName}</span>
            {errors && errors.nombrePax && (
              <span className="error-message">{errors.nombrePax}</span>
            )}
          </td>
        </tr>
        <tr>
          <td className="label-type">Camarera:</td>
          <td>
            <input className="input-type" type="text" value={waiterName} onChange={handleWaiterNameChange} />
            {errors && errors.camarera && (
              <span className="error-message">{errors.camarera}</span>
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

export default ComandaConsumoDatos;
