import React, { useState, useEffect, createContext, useReducer } from 'react';

const FormContext = createContext();
export const initialState = {
  habitacionSeleccionada: null,
  fechaSeleccionada: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECCIONAR_HABITACION':
      return {
        ...state,
        habitacionSeleccionada: action.payload,
      };
    case 'SELECCIONAR_FECHA':
      return {
        ...state,
        fechaSeleccionada: action.payload,
      };
    default:
      return state;
  }
};

const FormProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FormContext.Provider value={{
      habitacionSeleccionada: state.habitacionSeleccionada,
      fechaSeleccionada: state.fechaSeleccionada,
      dispatch
    }}
    >
      {children}
    </FormContext.Provider>
  );
};

export {
  FormProvider
};

export default FormContext;
