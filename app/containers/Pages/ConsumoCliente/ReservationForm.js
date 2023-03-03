import React, { useState } from 'react';

function ReservationForm() {
  const [roomNumber, setRoomNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  
  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handleGuestNameChange(event) {
    setGuestName(event.target.value);
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>Número de habitación:</td>
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
          <td>Fecha actual:</td>
          <td>{currentDate}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ReservationForm;

