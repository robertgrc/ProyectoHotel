/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useReducer } from 'react';

const initialState = {
    count: 0,
    isOn: false,
    text: '',
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { ...state, count: state.count + 1 };
      case 'decrement':
        return { ...state, count: state.count - 1 };
      case 'toggle':
        return { ...state, isOn: !state.isOn };
      case 'setText':
        return { ...state, text: action.payload };
      default:
        throw new Error();
    }
  }

  function PruebaReducerContador() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>

        <p>Toggle: {state.isOn ? 'On' : 'Off'}</p>
        <button onClick={() => dispatch({ type: 'toggle' })}>Toggle</button>

        <input
          type="text"
          value={state.text}
          onChange={(e) =>
            dispatch({ type: 'setText', payload: e.target.value })
          }
        />
        <p>Text: {state.text}</p>
      </div>
    );
  }

export default PruebaReducerContador;
