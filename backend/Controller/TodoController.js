import Todo from "../Model/TodoModel.js";

// GET all todos
export async function getTodos(req, res) {
  try {
    const todos = await Todo.find({ userId: req.user.user_id }).sort({ time: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error getting todos:", error);
    res.status(500).json({ message: "Failed to get todos" });
  }
}

// GET completed todos
export async function getTodosbyComplete(req, res) {
  try {
    const todos = await Todo.find({ userId: req.user.user_id, completed: true }).sort({ time: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error getting completed todos:", error);
    res.status(500).json({ message: "Failed to get completed todos" });
  }
}

// GET incomplete todos
export async function getTodosbyIncomplete(req, res) {
  try {
    const todos = await Todo.find({ userId: req.user.user_id, completed: false }).sort({ time: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error getting incomplete todos:", error);
    res.status(500).json({ message: "Failed to get incomplete todos" });
  }
}

// POST create todo
export async function createTodo(req, res) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Todo text is required" });
  }

  try {
    const newTodo = await Todo.create({
      text,
      userId: req.user.user_id,
      completed: false,
      time: new Date() // Add time field
    });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
}

// PUT update todo text
export async function updateTodo(req, res) {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.user_id },
      { text },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
}

// PUT mark as complete
export async function completeTodo(req, res) {
  const { id } = req.params;
  
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.user_id },
      { completed: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error marking todo as complete:", error);
    res.status(500).json({ message: "Failed to complete todo" });
  }
}

// PUT mark as incomplete
export async function incompleteTodo(req, res) {
  const { id } = req.params;

  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.user_id },
      { completed: false },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error marking todo as incomplete:", error);
    res.status(500).json({ message: "Failed to mark todo as incomplete" });
  }
}

// DELETE todo
export async function deleteTodo(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Todo.findOneAndDelete({ _id: id, userId: req.user.user_id });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
}
