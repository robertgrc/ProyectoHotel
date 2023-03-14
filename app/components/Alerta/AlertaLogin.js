import React from 'react';
import './Alerta.css';

const AlertaLogin = ({ alertaLogin }) => {
  return (
    <div className={`${alertaLogin.error ? 'alerta-error' : 'alerta-exito'}`}>
      {alertaLogin.msgLogin}
    </div>
  );
};

export default AlertaLogin;
