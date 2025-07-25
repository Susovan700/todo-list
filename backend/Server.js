import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import connectDB from "./Config/db.js";
import AuthRouter from "./Router/AuthRouter.js";
import TodoRouter from "./Router/TodoRouter.js";

const app = express();
dotenv.config(); 

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/todo", TodoRouter);

app.get("/", (req, res) => {
  res.send("🚀 Todo App API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
