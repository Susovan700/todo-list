"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TestForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("✅ handleSubmit triggered");
    e.preventDefault();
    console.log(`Submitted: ${username}, ${email}, ${password}`);
    const res = await axios.post("http://localhost:8000/api/auth/login", {
      email,
      password,
    });
    const token = res.data.token;
    if (token != null) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
