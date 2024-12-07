import { useEffect, useState } from "react";

const TASKS = [
  {id: 1, name: "Task 1", isDone: false},
  {id: 2, name: "Task 2", isDone: false},
  {id: 3, name: "Task 3", isDone: true},
];

function ToDoApp()
{
  //load data from localStorage
  const [inputValue, setInputValue] = useState('');
  const [toDoList, setToDoList] = useState([...TASKS]);

  //load data from localStorage if exists
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("tasks");
      if(storedData) {
        setToDoList(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading localStorage ", error);
    }
  }, []);

  //store data to localStorage if there's any change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(toDoList));
  }, [toDoList]);


  function handleInputValue(e)
  {
    setInputValue(e.target.value);
  }

  function handleFormSubmit(e)
  {
    e.preventDefault();
    if(inputValue.trim() === ""){
      return;
    }
    const newTask = {
      id: Date.now(),
      name: inputValue,
      isDone: false
  
    }
    setToDoList([...toDoList, newTask]);
    setInputValue('');
  }

  function handleToggleItem(taskId)
  {
    setToDoList(toDoList.map(task =>
      task.id === taskId ? {...task, isDone: !task.isDone} : task
    ));
  }

  function handleDeleteTask(taskId)
  {
    setToDoList(toDoList.filter(task =>
      task.id !== taskId
    ));
  }

  return (
    <div className="todo-container">
      <h1>TO DO LIST</h1>
      <AddNewBar
        inputValue = {inputValue}
        handleInputValue = {handleInputValue}
        handleFormSubmit = {handleFormSubmit}
      />
      <ToDoRow
        toDoList = {toDoList}
        handleToggleItem = {handleToggleItem}
        handleDeleteTask = {handleDeleteTask}
      />
    </div>
  );
}

function AddNewBar({inputValue, handleInputValue, handleFormSubmit})
{
  return (
    <form onSubmit={handleFormSubmit} className="add-new-bar">
      <input
        type="text"
        onChange={handleInputValue}
        value={inputValue}
        placeholder="Add new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

function ToDoRow({toDoList, handleToggleItem, handleDeleteTask})
{
  return (
    <table className="todo-table">
      <tbody>
        {toDoList.map(task => 
            <ToDoRowItem
              key = {task.id}
              task = {task}
              handleToggleItem = {handleToggleItem}
              handleDeleteTask = {handleDeleteTask}
            />
        )}
      </tbody>
    </table>
  )
}

function ToDoRowItem({task, handleToggleItem, handleDeleteTask})
{
  return (
    <tr className="task-row-item">
      <td>
        <input
          type="checkbox"
          className="task-check-box"
          id={task.id + "-check-box"}
          checked={task.isDone}
          onChange={() => handleToggleItem(task.id)}
        />
        <label
          htmlFor={task.id + "-check-box"}
          style={{textDecoration: task.isDone ? 'line-through' : 'none'}}
        >
          {task.name}
        </label>
      </td>
      <td><button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button></td>
    </tr>
  );
}

export default function Home()
{
  return (
    <ToDoApp/>
  );
}
