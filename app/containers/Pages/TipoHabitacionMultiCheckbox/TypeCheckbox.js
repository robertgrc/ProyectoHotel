import React from 'react';

const TypeCheckbox = ({ name, checked, onChange }) => {
  return (
    <div className="Checkboxes">
      <div className="MultipleCheckBox">
        <label className="labelCheckbox">{name}</label>
        <input
          className="inputCheckbox"
          type="checkbox"
          name={name}
          value={name}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TypeCheckbox;