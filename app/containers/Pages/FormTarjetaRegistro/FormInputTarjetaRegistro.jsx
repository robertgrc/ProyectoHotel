import React, { useState } from 'react';
import './FormInputTarjetaRegistro.css';

const FormTarjetaRegistro = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };


  return (
    <div className="form-input-targeta-registro">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormTarjetaRegistro;
