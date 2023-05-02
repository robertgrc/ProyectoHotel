import React, { useContext, useEffect, useState } from 'react';
import FormContext from '../../../context/FormProvider';
import TypeCheckbox from './TypeCheckbox';
import { TypeOfRoomData } from './TypeOfRoomData';

export default function  App({ updateTypeRoomState }) {
  const [typeRoomChecked, setTypeRoomChecked] = useState(
    new Array(TypeOfRoomData.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = typeRoomChecked.map((item, index) =>
      index === position ? !item : item
    );
    setTypeRoomChecked(updatedCheckedState);
    console.log(updatedCheckedState);
    updateTypeRoomState(updatedCheckedState);
  };
  // console.log('TypeOfRoomChecked:', typeRoomChecked);
//* ----------
const formContext = useContext(FormContext);

const { habitacionSeleccionada } = formContext;
console.log('Form*****', formContext);
useEffect(() => {
  if (habitacionSeleccionada) {
    console.log('nombre desde MultipleCheck:', habitacionSeleccionada.nombre);
  }
}, [habitacionSeleccionada]);

  return (
    <div className="CheckboxContainer">
      <h3 className="question-tarjeta-registro">Selecciona Tipo de Habitación</h3>
      <div className="multiselect-rooms">
        {TypeOfRoomData.map(({ name }, index) => {
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
