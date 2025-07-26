import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import User from "@/lib/model/UserModel";
import { generatejwt } from "@/lib/util/jwtutil";
import bcrypt from "bcrypt";

export async function POST(request) {
connectDB();
  const {username, email, password } = await request.json();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" },{status:409});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generatejwt(newUser.id, newUser.email);
    return NextResponse.json({ token },{status:201});
  } catch (error) {
    return NextResponse.json({ message: "Signup Failed", error },{status:500});
  }
}