import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import './App.css';

function App() {

  // todo list

  const [toDo, settoDo] = useState([
    {id: 1, title: "Todo 1", status: false},
    {id: 2, title: "Todo 2", status: false}
  ]);
  
  // These 2 Will be automatically appear when the page is opened in otherwords it's a default function

  /* 
  const newTodo = {
    id: new Date().getTime,
  };
 */
 
  // I dont know why but I couldn't manage to work that


  // Tanımlama
  const [newTodo, setNewTodo] = useState('');
  const [updateTask, setupdateTask] = useState('');

  // Ekleme
  const addTodo = () => {
    if(newTodo)  {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTodo, status: false }
      settoDo([...toDo, newEntry])
      setNewTodo('');
    }
  }

  // Delete
  const deleteTodo = (id) => {
    let newTodos = toDo.filter( task => task.id !== id)
    settoDo(newTodos);
  }

  // Mark as Done
  const markDone = (id) => {
    let newTodo = toDo.map( task => {
      if( task.id === id ) {
        return ({ ...task, status: !task.status }) /* toggle on/off (false/true) the status */
      }
      return task;
    })
    settoDo(newTodo);
  }

  // Cancelation
  const cancelUpdate = () => {
    setupdateTask('');
  }

  // Changing
  const changeTodo = (e) => {
    let newEntry = {
      id: updateTask.id,
      title: e.target.value,
      status: updateTask.status ? true : false
    }
    setupdateTask(newEntry);
  }

  // Updating
  const updateTodo = () => {
    let filteredItem = [...toDo].filter( task => task.id !== updateTask.id );
    let updatedObject = [...filteredItem, updateTask]
    settoDo(updatedObject);
    setupdateTask('');
  }

  return (
    <div className="App">

      <br /> <br />
      <h2>Yapılacaklar Listesi (React)</h2>
      <br /> <br />

      {updateTask && updateTask ? (
        <>
          {/* Update Todo */}
           <div className='row'>
            <div className='col'>
              <input 
              value={ updateTask && updateTask.title }
              onChange={ (e) => changeTodo(e) }
              className='form-control form-control-lg'></input>
            </div>
            <div className='col-auto'>
              <button 
              onClick={updateTodo}
              className='btn btn-lg btn-success mr-20'>Update</button>
              <button 
              onClick={cancelUpdate}
              className='btn btn-lg btn-warning'>Cancel</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* Add Todo */}
        
          <div className='row'>
            <div className='col'>
              <input 
              value={newTodo}
              onChange={ (e) => setNewTodo(e.target.value)}
              className='form-control form-control-lg'></input>
            </div>
            <div className='col-auto'>
              <button 
              onClick={addTodo}
              className='btn btn-lg btn-success'>Add Todo</button>
            </div>
          </div>
          <br />
        </>
      )}
     
      {/* Display Todo */}
      {toDo && toDo.length ? '' : 'No Todos Available...'}

      {toDo && toDo
      .sort((a,b) => a.id > b.id ? 1 : -1)
      /* Basic Sorting by id */
      .map((task) => {
        return(
          <React.Fragment key={task.id}>

            <div className='col toDo-template'>

              <div className={task.status ? 'done' : ''}>
                <span className='toDo-text'>{task.title}</span>
              </div>

              <div className='icons'>
                <span title='Complete'
                onClick={ (e) => markDone(task.id) }
                >
                  <FontAwesomeIcon icon={faCircleCheck}/> 
                </span> 
                {task.status ? null : (
                  <span title='Edit'
                  onClick={ () => setupdateTask({
                    id: task.id,
                    title: task.title,
                    status: task.status ? true : false
                  }) }
                  >
                    <FontAwesomeIcon icon={faPen}/>
                  </span>
                )}
                <span title='Discard'
                onClick={() => deleteTodo(task.id)}
                >
                <FontAwesomeIcon icon={faTrashCan}/>
                </span>
              </div>

            </div>

          </React.Fragment>
        )
        })
      }

    </div>
  );
}

export default App;
