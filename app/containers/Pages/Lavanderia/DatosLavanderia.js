import React, { useEffect, useState } from 'react';

function DatosLavanderia({ onData, initialComandaData }) {
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

  function handleGuestNameChange(event) {
    setPaxName(event.target.value);
  }

  function handleRecepcionistaNameChange(event) {
    setRecepcionistaName(event.target.value);
  }

  // useEffect(() => {
  //   const storedRecepcionistaName = localStorage.getItem('NombreUsuarioLogueado');
  //   if (storedRecepcionistaName) {
  //     setRecepcionistaName(storedRecepcionistaName);
  //   }
  // }, []);

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
            <input type="text" value={paxName} onChange={handleGuestNameChange} />
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
