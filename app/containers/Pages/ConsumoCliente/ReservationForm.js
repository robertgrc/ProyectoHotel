import React, { useState } from 'react';

function ReservationForm() {
  const [habitaciones, setHabitaciones] = useState('');
  const [huespedes, setHuespedes] = useState('');
  const fechaActual = new Date().toLocaleString();
  return (
    <div className="container-habitacion">
      <div className="row">
        <div className="col">
          <label className="label">Habitación / Room:</label>
          <input
            className="input"
            id="habitaciones"
            value={habitaciones}
            onChange={(e) => setHabitaciones(e.target.value)}
          />
        </div>
        <div className="col">
          <label className="label">Huésped / Guest:</label>
          <input
            className="input"
            id="huespedes"
            value={huespedes}
            onChange={(e) => setHuespedes(e.target.value)}
          />
        </div>
      </div>
      <div className="date-wrapper">
        <div className="row">
          <div className="col">
            <label className="label">Fecha Actual:</label>
          </div>
          <div className="col">
            <div className="date">{new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;
