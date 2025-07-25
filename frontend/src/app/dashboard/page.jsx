"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/todo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/todo",
        { text: todo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prev) => [...prev, res.data]); // ✅ update state
      setTodo(""); // ✅ clear input
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    try {
      await axios.put(
  `http://localhost:8000/api/todo/${!currentStatus ? "complete" : "incomplete"}/${id}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, completed: !currentStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating checkbox", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {data.map((todoItem) => (
          <li key={todoItem._id}>
            <input
              type="checkbox"
              checked={todoItem.completed}
              onChange={() =>
                handleCheckboxChange(todoItem._id, todoItem.completed)
              }
            />
            <span
              style={{
                textDecoration: todoItem.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {todoItem.text}
            </span>
            <button onClick={() => handleDelete(todoItem._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
