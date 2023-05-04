import React, { useState } from 'react';
import TypeCheckbox from './TypeCheckbox';

export default function TipoHabitacionMultiCheckbox({ updateTypeRoomState, typeOfRoomData, habitacionSeleccionada }) {
  const [typeRoomChecked, setTypeRoomChecked] = useState(
    new Array(typeOfRoomData.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = typeRoomChecked.map((item, index) =>
      index === position ? !item : item
    );
    setTypeRoomChecked(updatedCheckedState);
    updateTypeRoomState(updatedCheckedState);
    console.log('typeRoomChecked: nuevo', typeRoomChecked);
  };

  return (
    <div className="CheckboxContainer">
      <h3 className="question-tarjeta-registro">Selecciona Tipo de Habitación</h3>
      <div className="multiselect-rooms">
        {typeOfRoomData.map(({ name, id }, index) => (
          <TypeCheckbox
            key={id}
            name={name}
            checked={typeRoomChecked[index]}
            onChange={() => handleOnChange(index)}
          />
        ))}
      </div>
    </div>
  );
}
