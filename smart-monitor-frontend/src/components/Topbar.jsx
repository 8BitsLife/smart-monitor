import { Search, Bell, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const today = new Date().toDateString();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b
      dark:border-zinc-800 dark:bg-zinc-950/60
      border-zinc-200 bg-white/60
      sticky top-0 backdrop-blur">
      <div>
        <h2 className="text-lg font-semibold">Smart Monitor Dashboard</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{today}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border
          dark:bg-zinc-900 dark:border-zinc-800
          bg-white border-zinc-200">
          <Search size={16} className="text-zinc-500 dark:text-zinc-400" />
          <input className="bg-transparent outline-none text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            placeholder="Search..." />
        </div>

        <button className="p-2 rounded-xl border transition
          dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800
          bg-white border-zinc-200 hover:bg-zinc-100">
          <Bell size={18} />
        </button>

        <button onClick={toggleTheme}
          className="p-2 rounded-xl border transition
            dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800
            bg-white border-zinc-200 hover:bg-zinc-100"
          title="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="px-3 py-2 rounded-xl glass glow text-sm flex items-center gap-2 dark:text-zinc-100 text-zinc-900">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
            {user?.name?.[0] || "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Signed in</p>
            <p className="font-semibold">{user?.name || "User"}</p>
          </div>
        </div>

        <button onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-500/15 text-red-600 dark:text-red-300 hover:bg-red-500/25 transition">
          Logout
        </button>
      </div>
    </header>
  );
}
