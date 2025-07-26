import connectDB from "@/lib/config/db";
import Todo from "@/lib/model/TodoModel";
import { AuthMiddleware } from "@/lib/middleware/AuthMiddleware";
import { NextResponse } from "next/server";

export async function GET(request) {
    connectDB();
    const result = await AuthMiddleware(request);

    if (result instanceof Response) {
        return result;
    }

  const user = result.user;
  try {
    const todos = await Todo.find({ userId: user.user_id }).sort({ time: -1 });
    return NextResponse.json({todos},{status:200});
  } catch (error) {
    console.error("Error getting todos:", error);
    return NextResponse.json({ message: "Failed to get todos" },{status:500});
  }
}