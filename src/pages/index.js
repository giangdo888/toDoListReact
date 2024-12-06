import Image from "next/image";
import localFont from "next/font/local";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const TASKS = [
  {id: 1, name: "Task 1", isDone: false},
  {id: 2, name: "Task 2", isDone: false},
  {id: 3, name: "Task 3", isDone: true},
];

function ToDoApp({initList})
{
  const [inputValue, setInputValue] = useState('');
  const [toDoList, setToDoList] = useState([...initList]);

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
      id: toDoList[toDoList.length - 1].id + 1,
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
    <>
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
    </>
  );
}

function AddNewBar({inputValue, handleInputValue, handleFormSubmit})
{
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        onChange={handleInputValue}
        value={inputValue}
        placeholder="Add new task..."
        id="add-new-bar"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function ToDoRow({toDoList, handleToggleItem, handleDeleteTask})
{
  return (
    <table>
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
      <td><button onClick={() => handleDeleteTask(task.id)}>Delete</button></td>
    </tr>
  );
}

export default function Home()
{
  return (
    <ToDoApp initList={TASKS}/>
  );
}
