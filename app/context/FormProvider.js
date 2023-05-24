import React, { useState, useEffect, createContext, useReducer } from 'react';
import hotelApi from '../api/hotelApi';

const FormContext = createContext();
export const initialState = {
  habitacionSeleccionada: null,
  fechaSeleccionada: null,
  reservas: []
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
    case 'ACTUALIZAR_RESERVAS':
      return {
        ...state,
        reservas: action.payload,
      };
    case 'ACTUALIZAR_RESERVA_SELECCIONADA':
      return {
        ...state,
        reservaSeleccionada: action.payload
      };
    default:
      return state;
  }
};

const FormProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Simulamos una llamada a una API para obtener las reservas
    const obtenerReservas = async () => {
      // Lógica para obtener las reservas
      const reservas = await hotelApi.get('./registro');
      dispatch({ type: 'ACTUALIZAR_RESERVAS', payload: reservas });
    };

    obtenerReservas();
  }, []);


  return (
    <FormContext.Provider value={{
      habitacionSeleccionada: state.habitacionSeleccionada,
      fechaSeleccionada: state.fechaSeleccionada,
      reservas: state.reservas,
      reservaSeleccionada: state.reservaSeleccionada,
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
