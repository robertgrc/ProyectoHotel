import React, { useState } from 'react';

const TypeOfRoomData = ({ habitaciones, habitacionesOcupadas }) => {
  console.log('habitaciones desde TipoHabitacion**', habitaciones);
  const habitacionesData = habitaciones.map((habitacion) => {
    const isChecked = habitacionesOcupadas.includes(habitacion.nombre);
    return {
      ...habitacion,
      checked: isChecked,
    };
  });

  return habitacionesData;
};

const TipoHabitacionMultiCheckbox = ({ updateTypeRoomState, habitacionesData }) => {
  const [checkedRooms, setCheckedRooms] = useState([]);

  const handleChange = (event) => {
    const habitacion = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedRooms([...checkedRooms, habitacion]);
    } else {
      setCheckedRooms(checkedRooms.filter(room => room !== habitacion));
    }
  };

  const handleSave = () => {
    updateTypeRoomState(checkedRooms);
  };

  const habitacionesCheckbox = habitacionesData.map((habitacion) => {
    return (
      <label key={habitacion.id}>
        <input
          type="checkbox"
          value={habitacion.nombre}
          checked={habitacion.checked}
          onChange={handleChange}
        />
        {habitacion.nombre}
      </label>
    );
  });

  return (
    <div>
      {habitacionesCheckbox}
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default TipoHabitacionMultiCheckbox;
