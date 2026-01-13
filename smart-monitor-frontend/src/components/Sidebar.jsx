import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarCheck, Timer, BarChart3, Users } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  { name: "Attendance", path: "/attendance", icon: <CalendarCheck size={18} /> },
  { name: "Productivity", path: "/productivity", icon: <Timer size={18} /> },
  { name: "Reports", path: "/reports", icon: <BarChart3 size={18} /> },
  { name: "Users", path: "/users", icon: <Users size={18} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-72 px-4 py-5 border-r dark:border-zinc-800 dark:bg-gradient-to-b dark:from-zinc-950 dark:to-zinc-900 border-zinc-200 bg-white/60 backdrop-blur">
      <div className="text-xl font-bold mb-8">
        Smart Monitor <span className="text-blue-400">⚡</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive ? "bg-blue-500/20 text-blue-300" : "text-zinc-300 hover:bg-zinc-800/50"}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
