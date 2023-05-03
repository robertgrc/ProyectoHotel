import React from 'react';

const TypeCheckbox = ({ index, name, typeRoomChecked, handleOnChange }) => {
  return (
    <div className="Checkboxes">
      <div className="MultipleCheckBox">
        <label className="labelCheckbox">{name}</label>
        <input
          className="inputCheckbox"
          type="checkbox"
          name={name}
          value={name}
          checked={typeRoomChecked[index]}
          onChange={() => handleOnChange(index)}
        />
      </div>
    </div>
  );
};

export default TypeCheckbox;
