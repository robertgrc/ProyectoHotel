import React from 'react'

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
    function handleTaskChange(task, done) {
      onChangeTask({ ...task, done: done });
    }
  
    function handleTaskDelete(id) {
      onDeleteTask(id);
    }
  
    return (
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={event => handleTaskChange(task, event.target.checked)}
              />
              <span>{task.text}</span>
            </label>
            <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
