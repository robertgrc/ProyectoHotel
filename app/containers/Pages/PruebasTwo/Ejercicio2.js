
import React from 'react';


const Ejercicio2 = () => {
  function encontrarPrefijoComunMasLargo(strs) {
    // Manejar el caso especial en el que la matriz está vacía
    if (strs.length === 0) {
      return '';
    }

    // Tomar la primera cadena como referencia
    const referencia = strs[0];

    // Iterar a través de los caracteres de la primera cadena
    for (let i = 0; i < referencia.length; i++) {
      const caracterReferencia = referencia[i];

      // Comprobar si el caracter de la referencia coincide en todas las cadenas
      for (let j = 1; j < strs.length; j++) {
        const cadenaActual = strs[j];

        // Si no hay un carácter coincidente o hemos llegado al final de la cadena actual, retornar el prefijo común
        if (
          i >= cadenaActual.length || cadenaActual[i] !== caracterReferencia
        ) {
          return referencia.substring(0, i);
        }
      }
    }

    // Si hemos llegado hasta aquí, significa que toda la primera cadena es un prefijo común
    return referencia;
  }

  // Ejemplos de uso
  const ejemplo1 = ['flor', 'flujo', 'vuelo'];
  console.log(encontrarPrefijoComunMasLargo(ejemplo1)); // Salida: "fl"

  const ejemplo2 = ['dog', 'racecar', 'car'];
  console.log(encontrarPrefijoComunMasLargo(ejemplo2)); // Salida: ""

  return (
    <div>
      <h1>Ejercicio2</h1>
    </div>
  );
};

export default Ejercicio2;
