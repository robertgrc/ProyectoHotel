import React, { useReducer, useState } from 'react';

const initialState = [
    { id: 1, text: 'Hacer la compra', isEditing: false },
    { id: 2, text: 'Pagar la factura', isEditing: false },
  ];

  function reducer(state, action) {
    console.log(state);
    console.log(action);
    switch (action.type) {
      case 'add':
        return [...state, { id: Date.now(), text: action.payload }];
      case 'edit':
        return state.map(task =>
          task.id === action.payload.id ? { ...task, text: action.payload.text } : task
        );
      case 'delete':
        return state.filter(task => task.id !== action.payload);
      case 'startEdit':
        return state.map(task =>
         task.id === action.payload ? { ...task, isEditing: true } : task
        );
      case 'finishEdit':
        return state.map(task =>
         task.id === action.payload.id ? { ...task, isEditing: false, text: action.payload.text } : task
        );
      default:
        throw new Error();
    }
  }

  function PruebaReducerPayload() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');

    function handleSubmit(e) {
      e.preventDefault();
      if (text.trim() !== '') {
        dispatch({ type: 'add', payload: text });
        setText('');
      }
    }

    function handleEdit(task) {
      dispatch({ type: 'startEdit', payload: task.id });
    }

    function handleFinishEdit(task, newText) {
      dispatch({ type: 'finishEdit', payload: { id: task.id, text: newText } });
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Agregar</button>
        </form>
        <ul>
          {state.map((task) => (
            <li key={task.id}>
              {task.isEditing ? (
                <>
                  <input
                    value={task.text}
                    onChange={(e) => dispatch({ type: 'edit', payload: { id: task.id, text: e.target.value } })}
                  />
                  <button onClick={() => handleFinishEdit(task, task.text)}>Guardar</button>
                </>
              ) : (
                <>
                  {task.text}
                  <button onClick={() => handleEdit(task)}>Editar</button>
                  <button onClick={() => dispatch({ type: 'delete', payload: task.id })}>Eliminar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default PruebaReducerPayload;
