import React, { useEffect, useState } from 'react';

function DatosLavanderia(props) {
  const [roomNumber, setRoomNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const [recepcionistaName, setRecepcionistaName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    props.onData(roomNumber, guestName, recepcionistaName, currentDate);
  }, [roomNumber, guestName, recepcionistaName, currentDate]);

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handleGuestNameChange(event) {
    setGuestName(event.target.value);
  }

  function handleRecepcionistaNameChange(event) {
    setRecepcionistaName(event.target.value);
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>Número de Habitación:</td>
          <td>
            <input type="text" value={roomNumber} onChange={handleRoomNumberChange} />
          </td>
        </tr>
        <tr>
          <td>Nombre del Huesped:</td>
          <td>
            <input type="text" value={guestName} onChange={handleGuestNameChange} />
          </td>
        </tr>
        <tr>
          <td>Nombre del Recepcionista:</td>
          <td>
            <input type="text" value={recepcionistaName} onChange={handleRecepcionistaNameChange} />
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
