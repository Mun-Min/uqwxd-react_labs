// a TODO list application using React components

import React from "react";
import "./App.css";
const App = () => {
  // when initializing the variable for the input field using the state hook, you define a getter,
  // to get the value of the state and a setter, to set the values of the state.

  // the code below, todos is the state and setTodos is the function that updates the state value.
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  // add the useEffect hook to your application. This useEffect hook will be responsible to save new todos into localstorage.
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  // add a handleSubmit function that can handle newTodo items and add the task to the list
  function handleSubmit(e) {
    e.preventDefault(); // the 'e' in the code block is an event object that is passed to the handleSubmit function when it is called

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    } else {
      alert("Enter Valid Task");
      setTodo("");
    }
  }

  // add a deleteTodo function that filters out the task to be deleted and returns the rest of the tasks
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // add a toggleComplete function that adds a checkbox to mark task completion
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // add a submitEdits function that will add the functionality of editing tasks
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  // return a todo-list application
  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      // The code block is using the map function to iterate through an array of "todos"
      // and creating a new "div" element for each todo item in the array. 
      // The "key" prop is being set to the "id" property of the todo item and the "className" 
      // prop is being set to "todo". The div elements are likely being rendered on the page to display the todo items in a list.
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default App;
