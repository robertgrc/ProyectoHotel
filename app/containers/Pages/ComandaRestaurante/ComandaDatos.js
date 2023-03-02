
import React, { useState } from 'react';

function ComandaDatos() {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [waiterName, setWaiterName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  function handleRoomNumberChange(event) {
    setRoomNumber(event.target.value);
  }

  function handlePaxNameChange(event) {
    setPaxName(event.target.value);
  }

  function handleWaiterNameChange(event) {
    setWaiterName(event.target.value);
  }

  return (
    <div className="my-component-comanda">
      <div className="input-container">
        <label htmlFor="roomNumber">Número de habitación:</label>
        <input type="text" id="roomNumber" value={roomNumber} onChange={handleRoomNumberChange} />
      </div>
      <div className="input-container">
        <label htmlFor="paxName">Nombre del pax:</label>
        <input type="text" id="paxName" value={paxName} onChange={handlePaxNameChange} />
      </div>
      <div className="input-container">
        <label htmlFor="waiterName">Mesero:</label>
        <input type="text" id="waiterName" value={waiterName} onChange={handleWaiterNameChange} />
      </div>
      <div className="current-date-comanda">Fecha actual: {currentDate}</div>
    </div>
  );
}

export default ComandaDatos;
