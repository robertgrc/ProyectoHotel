import React, { useState } from 'react';

function ReservationForm() {
  const [habitaciones, setHabitaciones] = useState('');
  const [huespedes, setHuespedes] = useState('');
  const fechaActual = new Date().toLocaleString();
  console.log(habitaciones);
  console.log(huespedes);
  return (
    <div className="container-habitacion">
      <div className="habitacion">
        <label className="habitaciones">Habitaciones / Room:</label>
        <input
          id="habitaciones"
          value={habitaciones}
          onChange={(e) => setHabitaciones(e.target.value)}
        />
      </div>
      <div>
        <label className="huespedes">Huéspedes / Guest:</label>
        <input
          id="huespedes"
          value={huespedes}
          onChange={(e) => setHuespedes(e.target.value)}
        />
      </div>
      <div className="date-wrapper">
        <label>Fecha Actual:</label>
        <div>{new Date().toLocaleString()}</div>
      </div>
    </div>
  );
}

export default ReservationForm;
