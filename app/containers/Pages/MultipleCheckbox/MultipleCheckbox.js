import React, { useContext, useEffect, useState } from 'react';
import TypeCheckbox from './TypeCheckbox';

export default function  App({ updateTypeRoomState, typeOfRoomData, habitacionSeleccionada }) {
  const [typeRoomChecked, setTypeRoomChecked] = useState(
    typeOfRoomData.map((item) => item.checked)
  );
console.log('typeOfRoomData:', typeOfRoomData);
console.log('habitacionSeleccionada:', habitacionSeleccionada);

const handleOnChange = (position) => {
  console.log(position);
  const updatedCheckedState = typeRoomChecked.map((item, index) =>
    index === position ? !item : item
  );
  // console.log(updatedCheckedState);
  // console.log('typeRoomChecked:', typeRoomChecked);
  setTypeRoomChecked(updatedCheckedState);
  updateTypeRoomState(updatedCheckedState);
};

// useEffect(() => {
//   updateTypeRoomState(typeRoomChecked);
// }, []);


  useEffect(() => {
    if (habitacionSeleccionada) {
      console.log('nombre desde MultipleCheck:', habitacionSeleccionada.nombre);
    }
  }, [habitacionSeleccionada]);

  return (
    <div className="CheckboxContainer">
      <h3 className="question-tarjeta-registro">Selecciona Tipo de Habitación</h3>
      <div className="multiselect-rooms">
        {typeOfRoomData.map(({ name }, index) => {
          return (
            <div key={index}>
              <TypeCheckbox
                index={index}
                name={name}
                typeRoomChecked={typeRoomChecked}
                handleOnChange={handleOnChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
