import React, { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder="Add a task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
