
import React, { useState } from 'react';

function ComandaConsumoDatos() {
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
    <table className="table-container-type">
      <tbody>
        <tr>
          <td className="label-type">Número de habitación:</td>
          <td>
            <input className="input-type" type="text" value={roomNumber} onChange={handleRoomNumberChange} />
          </td>
        </tr>
        <tr>
          <td className="label-type">Nombre del pax:</td>
          <td>
            <input className="input-type" type="text" value={paxName} onChange={handlePaxNameChange} />
          </td>
        </tr>
        <tr>
          <td className="label-type">Camarera:</td>
          <td>
            <input className="input-type" type="text" value={waiterName} onChange={handleWaiterNameChange} />
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
