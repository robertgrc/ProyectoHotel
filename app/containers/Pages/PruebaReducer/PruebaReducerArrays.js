import React, { useReducer } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';


let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];

function tasksReducer(tasks, action) {
    console.log(tasks);
    console.log(action);
    switch (action.type) {
      case 'added': {
        return [...tasks, {
          id: action.id,
          text: action.text,
          done: false
        }];
      }
      case 'changed': {
        return tasks.map(t => {
          if (t.id === action.task.id) {
            return action.task;
          } return t;
        });
      }
      case 'deleted': {
        return tasks.filter(t => t.id !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

 const PruebaReducerArray = () => {

    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
      );
      function handleAddTask(text) {
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        });
      }

      function handleChangeTask(task) {
        console.log(task);
        dispatch({
          type: 'changed',
          task: task
        });
      }

      function handleDeleteTask(taskId) {
        dispatch({
          type: 'deleted',
          id: taskId
        });
      }

      return (
        <>
          <h1>Prague itinerary</h1>
          <AddTask
            onAddTask={handleAddTask}
          />
          <TaskList
            tasks={tasks}
            onChangeTask={handleChangeTask}
            onDeleteTask={handleDeleteTask}
          />
        </>
      );
    };

    export default PruebaReducerArray;
