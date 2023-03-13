import React from 'react';
// import dotenv from 'dotenv';
// dotenv.config();


const Pruebas = () => {
  return (
    <div>
      <h1>Pruebas</h1>
      <h1>{process.env.USUARIO_URL}</h1>
    </div>
  );
};

export default Pruebas;
