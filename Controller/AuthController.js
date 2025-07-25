import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import { generatejwt } from "../util/jwtutil.js";

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    const token = generatejwt(user.id, user.email);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed", error });
  }
}
export async function registerUser(req, res) {
  const { username, email, password } = req.body; // ← include username
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,  // ← add this
      email,
      password: hashedPassword,
    });
    const token = generatejwt(newUser.id, newUser.email);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Signup Failed", error });
  }
}

