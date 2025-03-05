// frontend/src/App.jsx (no changes needed)

import { useEffect, useState, useRef } from "react";
import "./App.css";

const BASE_URL = import.meta.env.VITE_API;

function App() {
  const [todos, setTodos] = useState([]);
  const textRef = useRef();

  async function getTodos() {
    const response = await fetch(`${BASE_URL}/api/todos`);
    const result = await response.json();
    setTodos(result);
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const todo = {
      text: textRef.current.value,
    };
    const response = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const todoDoc = await response.json();
    setTodos([...todos, todoDoc]);
    textRef.current.value = "";
  }

  async function handleDelete(id) {
    await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "DELETE",
    });
    getTodos();
  }

  async function handleComplete(id) {
    const foundTodo = todos.find((todo) => todo._id == id);
    foundTodo.completed = !foundTodo.completed;
    await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(foundTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getTodos();
  }

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => handleComplete(todo._id)}
            />
            <span>{todo.text}</span>
            <span className="delete-btn" onClick={() => handleDelete(todo._id)}>
              ×
            </span>
          </li>
        ))}
      </ul>
      <form className="add-todo-form" onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="text"
            ref={textRef}
            className="add-todo-input"
            placeholder="Add new todo"
          />
          <button className="add-todo-btn">Add Todo</button>
        </div>
      </form>
    </div>
  );
}

export default App;
