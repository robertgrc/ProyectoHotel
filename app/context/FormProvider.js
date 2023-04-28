import React, { useState, useEffect, createContext } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {

    const [hola, setHola] = useState('Saludos');

  return (
    <FormContext.Provider value={{ hola }}>
      {children}
    </FormContext.Provider>
  );
};

export {
  FormProvider
};

export default FormContext;
