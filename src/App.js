import React, { useState, useReducer, Fragment } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

/*const ACTIONS = {
  ADD: 'ADD',
  SUB: 'SUB',
  RESTART: 'RESTART',
};*/

/*function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return { count: state.count + 1 };
    case ACTIONS.SUB:
      return { count: state.count - 1 };
    default:
      return { count: 0 };
  }
}*/

/*const initialState = {
  count: 0,
};*/

const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  COMPLETE: 'COMPLETE',
  REMOVE: 'REMOVE',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...state, newToDo(action.payload.name)];
    case ACTIONS.COMPLETE:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
      });
    case ACTIONS.REMOVE:
      return state.filter((todo) => todo.id !== action.payload.id);
  }
}

function newToDo(name) {
  return { id: uuid(), todo: name, complete: false };
}

function App() {
  // A reducer takes in a function to execute on the state, and the initial state
  // The reducer is assigned to a state and a dispatch to call functions on the state
  // Dispatch calls the reducer with a set of parameters being the state and action
  //const [state, dispatch] = useReducer(reducer, initialState);
  const [toDos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');
  //const [counter, setCounter] = useState(0);

  console.log(toDos);

  function add() {
    //setCounter((prevCount) => prevCount + 1);
    //dispatch({ type: ACTIONS.ADD });
  }

  function sub() {
    //setCounter((prevCount) => prevCount - 1);
    //dispatch({ type: ACTIONS.SUB });
  }

  function restartCount() {
    //setCounter(0);
    //dispatch({ type: ACTIONS.RESTART });
  }

  function updateName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TASK, payload: { name: name } });
    setName('');
  }

  function completeTask(id, completed) {
    dispatch({
      type: ACTIONS.COMPLETE,
      payload: { id: id, completed: completed },
    });
  }

  /*
    <div className='App'>
      <button onClick={sub}>-</button>
      <span>{state.count}</span>
      <button onClick={add}>+</button>
      <br />
      <button onClick={restartCount}>Restart</button>
    </div>
  */
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={name}
          placeholder='Name'
          onChange={updateName}
        ></input>
      </form>
      <h1>My ToDo List</h1>
      {toDos.map((task) => (
        <div key={task.id}>
          <span>{task.todo}</span>
          {!task.complete ? (
            <Fragment>
              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.COMPLETE,
                    payload: { id: task.id, completed: task.completed },
                  })
                }
              >
                Complete
              </button>{' '}
              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.REMOVE,
                    payload: { id: task.id },
                  })
                }
              >
                Remove
              </button>
            </Fragment>
          ) : (
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.REMOVE,
                  payload: { id: task.id },
                })
              }
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
