import React, { useState, useEffect } from 'react';

function ReservationForm(props) {
  const [roomNumber, setRoomNumber] = useState('');
  const [paxName, setPaxName] = useState('');
  const [recepcionistaName, setRecepcionistaName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    props.onData(roomNumber, paxName, recepcionistaName, currentDate);
  }, [roomNumber, paxName, recepcionistaName, currentDate]);

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
          </td>
        </tr>
        <tr>
          <td className="label-type">Nombre del pax:</td>
          <td>
            <input className="input-type" type="text" value={paxName} onChange={handlePaxNameChange} />
          </td>
        </tr>
        <tr>
          <td className="label-type">Recepcionista:</td>
          <td>
            <input className="input-type" type="text" value={recepcionistaName} onChange={handleRecepcionistaNameChange} />
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

