import React, { useState } from 'react';

const Ejercicio1 = () => {
// Dada una matriz de números enteros nums y un número entero target, devuelva índices de los dos números de manera que sumentarget .
// Puede suponer que cada entrada tendría exactamente una solución y no puede utilizar el mismo elemento dos veces.
// Puede devolver la respuesta en cualquier orden.
// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

// 1Definimos una funcion con dos parametros el primero es la matriz y el segundo el objetivo
// 2Creamos un objeto llamado elementos para realizar el seguimiento de los numeros vistos en la matriz y sus indices
// 3iniciamos un bucle For que recorre la matriz listadoNumeros utilizando la variable i
// calculamos el complemento que es igual a 'tarjet - num' el complemento es el valor que necesitamos encontrar en la matriz para que la suma sea igual al objetivo
// Luego, verificamos si el complemento está presente en el objeto elementos. Si encontramos el complemento, significa que hemos encontrado dos números cuya suma es igual al objetivo. En este caso, devolvemos un array con los índices de esos dos números, que son elementos[complemento] y i.

// Si no encontramos el complemento en el objeto elementos, registramos el número actual num en el objeto elementos con su índice i como valor.

// Después de que el bucle haya recorrido toda la matriz sin encontrar una suma igual al objetivo, devolvemos null para indicar que no se encontraron dos números en la matriz que cumplan con el requisito.

// Finalmente, fuera de la función, se muestran ejemplos de uso de la función encontrarIndicesSumaObjetivo con tres casos diferentes. Cada caso muestra una matriz y un objetivo, y luego se imprime en la consola el resultado de la función

const SumaDosNumerosIgualATarget = (listadoNumeros, target) => {
const elementos = {};

    for (let i = 0; listadoNumeros.length; i++) {
      const numero = listadoNumeros[i];
      const complemento = target - numero;

      if (elementos[complemento] !== undefined) {
        return [elementos[complemento], i];
      }
      elementos[numero] = i;
    }
    return null;
};

const ejemplo1 = SumaDosNumerosIgualATarget([2, 7, 11, 15], 9); // Output: [0, 1]
const ejemplo2 = SumaDosNumerosIgualATarget([3, 2, 4], 6); // Output: [1, 2]
const ejemplo3 = SumaDosNumerosIgualATarget([3, 3], 6);
const ejemplo4 = SumaDosNumerosIgualATarget([3, 3, 9, 7, 11], 18);

console.log(ejemplo1);
console.log(ejemplo2);
console.log(ejemplo3);
console.log(ejemplo4);
  return (
    <>
      <h1>Ejercicio1</h1>
    </>
  );
};

export default Ejercicio1;
