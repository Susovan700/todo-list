import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://susovansinhababu:yhpBDuL3ZWQyPkU6@todo-list-db.e40u232.mongodb.net/?retryWrites=true&w=majority&appName=todo-list-db");
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
