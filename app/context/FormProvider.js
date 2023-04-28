import React, { useState, useEffect, createContext } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {

    const [hola, setHola] = useState('hola Mundo');

  return (
    <FormContext.Provider
     value = {{ hola }} 
    >
      {children}
    </FormContext.Provider>
  );
};

export {
  FormProvider
};

export default FormContext;
