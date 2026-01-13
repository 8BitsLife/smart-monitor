import PageTransition from "../components/PageTransition";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]      );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("demo123");
  const [role, setRole] = useState("USER");

  const load = () => api.get("/users").then(res => setUsers(res.data));
  useEffect(() => { load(); }, []);

  const add = async () => {
    await api.post("/users", { name, email, password, role });
    setName(""); setEmail("");
    load();
  };

  const remove = async (id) => {
    await api.delete(`/users/${id}`);
    load();
  };

  return (
    <PageTransition>

    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Users</h1>

      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
        <h2 className="text-lg font-semibold">Add User</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800" placeholder="Name"/>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800" placeholder="Email"/>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800" placeholder="Password"/>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <option>USER</option>
            <option>ADMIN</option>
          </select>
        </div>
        <button onClick={add} className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700">+ Add User</button>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
        <h2 className="text-lg font-semibold mb-4">Registered Users</h2>
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between">
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-zinc-500">{u.email} · {u.role}</p>
              </div>
              <button onClick={()=>remove(u.id)} className="px-3 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    </PageTransition>
  );
}
