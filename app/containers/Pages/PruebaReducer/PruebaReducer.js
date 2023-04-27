/* eslint-disable react/button-has-type */
/* eslint-disable default-case */
import React, { useReducer } from 'react';

const initialState = { name: 'Taylor', age: 42 };

function reducer(state, action) {
    console.log(state);
    console.log(action);
    switch (action.type) {
      case 'incremented_age': {
        return {
          name: state.name,
          age: state.age + 1
        };
      }
      case 'changed_name': {
        return {
          name: action.nextName,
          age: state.age
        };
      }
      case 'decremend_age': {
        return {
          name: state.name,
          age: state.age - 1
        };
      }
      case 'custom': {
        return {
          ...state,
          age: action.payload
        };
      }
    }
    throw Error('Unknown action: ' + action.type);
  }


  export default function PruebaReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleButtonClick() {
      dispatch({ type: 'incremented_age' });
    }

    function handleInputChange(e) {
      dispatch({
        type: 'changed_name',
        nextName: e.target.value
      });
    }
    function handleButtonDecrementClick() {
      dispatch({ type: 'decremend_age' });
    }

    function handleCustomClick() {
      dispatch({ type: 'custom', payload: 77 });
    }

    return (
      <>
        <input
          value={state.name}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>
          Increment age
        </button>
        <button onClick={handleButtonDecrementClick}>
          Decrement age
        </button>
        <button onClick={handleCustomClick}>
          Custom age
        </button>
        <p>Hello, {state.name}. You are {state.age}.</p>
      </>
    );
  }
