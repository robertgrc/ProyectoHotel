
import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const PruebasTwo = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Decodificar el token para obtener el UID del usuario
      const decodedToken = jwt.decode(token);
      const uid = decodedToken.uid;
      console.log('uid:', uid);

      // Enviar el UID al backend para buscar los datos del usuario en MongoDB
      // axios.get(`/api/usuario/${uid}`)
      //   .then((res) => {
      //     const data = res.data;
      //     if (data) {
      //       // Actualizar el estado del componente con los datos del usuario
      //       setNombre(data.nombre);
      //       setEdad(data.edad);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }, []);
  return (
    <div>
      <input type="text" value={nombre} />
      <input type="text" value={edad} />
    </div>
  );
};

export default PruebasTwo;
