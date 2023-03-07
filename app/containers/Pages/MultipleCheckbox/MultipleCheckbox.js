import React, { useState } from "react";
import TypeCheckbox from "./TypeCheckbox";
import { TypeOfRoomData } from "./TypeOfRoomData";

export default function App({ updateTypeRoomState }) {
  const [typeRoomChecked, setTypeRoomChecked] = useState(
    new Array(TypeOfRoomData.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = typeRoomChecked.map((item, index) =>
      index === position ? !item : item
    );
    setTypeRoomChecked(updatedCheckedState);
    updateTypeRoomState(updatedCheckedState);
  };

  // console.log("TypeOfRoomData:", TypeOfRoomData);
  return (
    <div className="CheckboxContainer">
      <h3 className="question-tarjeta-registro">Selecciona Tipo de Habitación</h3>

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
  );
}
