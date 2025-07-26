"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [userName, setUserName] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/todo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.todos);
        
        // Get user name from localStorage or token if available
        const storedUserName = localStorage.getItem("userName") || "User";
        setUserName(storedUserName);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    try {
      setSubmitting(true);
      const res = await axios.post(
        "http://localhost:8000/api/todo",
        { text: todo.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prev) => [...prev, res.data]);
      setTodo("");
    } catch (error) {
      console.error("Error adding todo", error);
    } finally {
      setSubmitting(false);
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
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

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

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      // Redirect to login page or refresh
      window.location.href = "/login"; // Adjust this to your login route
    }
  };

  const handleBack = () => {
    // You can customize this based on your routing
    window.history.back();
  };

  const clearCompleted = () => {
    if (!window.confirm("Delete all completed todos?")) return;
    
    const completedTodos = data.filter(todo => todo.completed);
    completedTodos.forEach(todo => handleDelete(todo._id));
  };

  // Filter todos based on current filter
  const filteredData = data.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // all
  });

  // Statistics
  const totalTodos = data.length;
  const completedTodos = data.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          <span>Loading your todos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-top">
          <button className="back-button" onClick={handleBack} title="Go Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <button className="logout-button" onClick={handleLogout} title="Logout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
        
        <div className="welcome-section">
          <h1>Welcome back, {userName}! 👋</h1>
          <p>Let's get things done today</p>
        </div>

        {/* Statistics */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{totalTodos}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completedTodos}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{pendingTodos}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* Add Todo Form */}
      <div className="add-todo-section">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="input-container">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              disabled={submitting}
              maxLength={200}
            />
            <div className="character-count">{todo.length}/200</div>
          </div>
          <button type="submit" disabled={submitting || !todo.trim()}>
            {submitting ? (
              <>
                <div className="spinner"></div>
                Adding...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Task
              </>
            )}
          </button>
        </form>
      </div>

      {/* Filter and Actions */}
      <div className="filter-section">
        <div className="filter-buttons">
          <button 
            className={filter === "all" ? "active" : ""} 
            onClick={() => setFilter("all")}
          >
            All ({totalTodos})
          </button>
          <button 
            className={filter === "pending" ? "active" : ""} 
            onClick={() => setFilter("pending")}
          >
            Pending ({pendingTodos})
          </button>
          <button 
            className={filter === "completed" ? "active" : ""} 
            onClick={() => setFilter("completed")}
          >
            Completed ({completedTodos})
          </button>
        </div>
        
        {completedTodos > 0 && (
          <button className="clear-completed" onClick={clearCompleted}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Clear Completed
          </button>
        )}
      </div>

      {/* Todo List */}
      <div className="todo-list-section">
        <h3>Your Tasks</h3>
        {filteredData.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h4>
              {filter === "all" 
                ? "No tasks yet!" 
                : filter === "completed" 
                ? "No completed tasks" 
                : "No pending tasks"
              }
            </h4>
            <p>
              {filter === "all" 
                ? "Add your first task above to get started" 
                : `Switch to "${filter === "completed" ? "pending" : "completed"}" to see other tasks`
              }
            </p>
          </div>
        ) : (
          <ul className="todo-list">
            {filteredData.map((todoItem, index) => (
              <li key={todoItem._id} className={`todo-item ${todoItem.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={todoItem.completed}
                      onChange={() =>
                        handleCheckboxChange(todoItem._id, todoItem.completed)
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                  
                  <div className="todo-text">
                    <span className="task-text">{todoItem.text}</span>
                    <span className="task-number">#{index + 1}</span>
                  </div>
                </div>
                
                <div className="todo-actions">
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(todoItem._id)}
                    title="Delete task"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Progress Bar */}
      {totalTodos > 0 && (
        <div className="progress-section">
          <div className="progress-header">
            <span>Overall Progress</span>
            <span>{Math.round((completedTodos / totalTodos) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedTodos / totalTodos) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}