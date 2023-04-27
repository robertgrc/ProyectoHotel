
import React, { useReducer } from 'react';

const initialState = 7;

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + action.payload;
    case 'decrement':
      return state - action.payload;
    case 'reset':
      return action.payload;
    default:
      throw new Error();
  }
}

function PruebaReducerCounter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <div>
        <p>Contador: {state}</p>
        <button onClick={() => dispatch({ type: 'increment', payload: 1 })}>
          Incrementar
        </button>
        <button onClick={() => dispatch({ type: 'decrement', payload: 1 })}>
          Decrementar
        </button>
        <button onClick={() => dispatch({ type: 'reset', payload: 14 })}>
          reset
        </button>
      </div>
    );
  }

  export default PruebaReducerCounter;
