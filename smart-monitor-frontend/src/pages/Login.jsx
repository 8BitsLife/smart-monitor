import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setErr("");
      await login(email, password);
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800">
        <h1 className="text-2xl font-bold mb-2">Sign in</h1>
        <p className="text-sm text-zinc-400 mb-6">Access your productivity dashboard.</p>

        {err && <p className="text-red-400 mb-3">{err}</p>}

        <div className="space-y-4">
          <input value={email} onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800" placeholder="Email" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800" placeholder="Password" type="password" />
          <button onClick={handleLogin}
            className="w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">
            Login
          </button>
          <button onClick={()=>{setEmail("demo@gmail.com");setPassword("demo123");}}
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
            Fill Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
