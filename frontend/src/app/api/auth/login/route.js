import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import User from "@/lib/model/UserModel";
import { generatejwt } from "@/lib/util/jwtutil";
import bcrypt from "bcrypt";

export async function POST(request) {
connectDB();
  const { email, password } = await request.json();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" },{status:401});
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Wrong Password" },{status:401});
    }
    const token = generatejwt(user.id, user.email);
    return NextResponse.json({token},{status:200});
  } catch (error) {
    return NextResponse.json({message: "Login Failed", error },{status:500});
  }
}