import React, { useState } from 'react'
import './FormInputReserva.css'

const FormInputReserva = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props
  const handleFocus = (e) => {
    setFocused(true);
  };


  return (
    <div className="formInputReserva">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInputReserva;
