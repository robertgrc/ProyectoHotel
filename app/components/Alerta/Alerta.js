import React from 'react';
import './Alerta.css';

const Alerta = ({ alerta }) => {
  return (
    <div className={`${alerta.error ? 'alerta-error' : 'alerta-exito'}`}>
      {alerta.msg}
    </div>
  );
};

export default Alerta;
