
import React, { useState, useEffect } from 'react';

function ComponenteConRegistro() {
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    // Obtener el nombre de usuario desde Local Storage
    const nombreGuardado = localStorage.getItem('NombreUsuarioLogueado');

    // Asignar el nombre de usuario al estado del componente
    setNombreUsuario(nombreGuardado);
  }, []);

  return (
    <div>
      <label>Nombre:</label>
      <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
    </div>
  );
}

function PruebasTwo() {
  
  return (
    <div>
      <ComponenteConRegistro />
    </div>
  );
}

export default PruebasTwo;
