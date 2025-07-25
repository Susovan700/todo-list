import { Router } from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
import {
  getTodos,
  getTodosbyComplete,
  getTodosbyIncomplete,
  createTodo,
  updateTodo,
  completeTodo,
  incompleteTodo,
  deleteTodo,
} from "../Controller/TodoController.js";

const TodoRouter = Router();

// GET Routes
TodoRouter.get("/", AuthMiddleware, getTodos);
TodoRouter.get("/complete", AuthMiddleware, getTodosbyComplete);
TodoRouter.get("/incomplete", AuthMiddleware, getTodosbyIncomplete);

// POST Route
TodoRouter.post("/", AuthMiddleware, createTodo);

// PUT Routes
TodoRouter.put("/:id", AuthMiddleware, updateTodo);
TodoRouter.put("/complete/:id", AuthMiddleware, completeTodo);
TodoRouter.put("/incomplete/:id", AuthMiddleware, incompleteTodo);

// DELETE Route
TodoRouter.delete("/:id", AuthMiddleware, deleteTodo);

export default TodoRouter;
