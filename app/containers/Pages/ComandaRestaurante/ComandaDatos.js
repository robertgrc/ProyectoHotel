

import React, { useState, useEffect } from 'react';

function ComandaDatos(props) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [meseroName, setWaiterName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  
  useEffect(() => {
    props.onData(roomNumber, paxName, meseroName, currentDate);
  }, [roomNumber, paxName, meseroName, currentDate]);

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handlePaxNameChange(event) {
    setPaxName(event.target.value);
  }

  function handleMeseroNameChange(event) {
    setWaiterName(event.target.value);
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
          <td>Nombre del pax:</td>
          <td>
            <input type="text" value={paxName} onChange={handlePaxNameChange} />
          </td>
        </tr>
        <tr>
          <td>Mesero:</td>
          <td>
            <input type="text" value={meseroName} onChange={handleMeseroNameChange} />
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
