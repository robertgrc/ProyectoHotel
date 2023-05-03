import React, { useContext, useEffect, useState } from 'react';
import FormContext from '../../../context/FormProvider';
import TypeCheckbox from './TypeCheckbox';

export default function  App({ updateTypeRoomState, typeOfRoomData, habitacionSeleccionada}) {
  const [typeRoomChecked, setTypeRoomChecked] = useState(
    new Array(typeOfRoomData.length).fill(false)
  );
console.log('typeOfRoomData:', typeOfRoomData);
console.log('habitacionSeleccionada:', habitacionSeleccionada);

  const handleOnChange = (position) => {
    const updatedCheckedState = typeRoomChecked.map((item, index) =>
      index === position ? !item : item
    );
    setTypeRoomChecked(updatedCheckedState);
    console.log(updatedCheckedState);
    updateTypeRoomState(updatedCheckedState);
  };

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
