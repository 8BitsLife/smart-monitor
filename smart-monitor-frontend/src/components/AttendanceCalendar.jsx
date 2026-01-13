import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function startOfMonth(date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function endOfMonth(date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0); }
function pad2(n) { return String(n).padStart(2, "0"); }
function toISODate(d) { return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }

export default function AttendanceCalendar({ logs = [] }) {
  const [cursor, setCursor] = useState(() => new Date());

  const statusByDate = useMemo(() => {
    const map = new Map();
    logs.forEach((l) => map.set(l.date, l.status));
    return map;
  }, [logs]);

  const days = useMemo(() => {
    const first = startOfMonth(cursor);
    const last = endOfMonth(cursor);
    const shift = (first.getDay() + 6) % 7; // monday=0
    const totalDays = last.getDate();
    const grid = [];
    for (let i=0;i<shift;i++) grid.push(null);
    for (let d=1; d<=totalDays; d++) grid.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (grid.length % 7 !== 0) grid.push(null);
    return grid;
  }, [cursor]);

  const monthLabel = cursor.toLocaleString("en-US", { month: "long", year: "numeric" });
  const prevMonth = () => setCursor((c) => new Date(c.getFullYear(), c.getMonth()-1, 1));
  const nextMonth = () => setCursor((c) => new Date(c.getFullYear(), c.getMonth()+1, 1));
  const todayIso = toISODate(new Date());

  return (
    <div className="rounded-3xl border p-5 shadow-sm
      dark:bg-zinc-900/40 dark:border-zinc-800
      bg-white border-zinc-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold">{monthLabel}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Green = Present, Red = Absent</p>
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth}
            className="p-2 rounded-xl border transition
              dark:bg-zinc-950 dark:border-zinc-800 dark:hover:bg-zinc-800
              bg-zinc-50 border-zinc-200 hover:bg-zinc-100">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextMonth}
            className="p-2 rounded-xl border transition
              dark:bg-zinc-950 dark:border-zinc-800 dark:hover:bg-zinc-800
              bg-zinc-50 border-zinc-200 hover:bg-zinc-100">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-xs font-semibold mb-2 text-zinc-500 dark:text-zinc-400">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d)=>(
          <div key={d} className="p-2 text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((date, idx) => {
          if (!date) return <div key={idx} className="h-12 rounded-xl" />;
          const iso = toISODate(date);
          const status = statusByDate.get(iso);
          const isToday = iso === todayIso;

          let cellClass = "bg-zinc-50 border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800";
          if (status === "PRESENT") cellClass = "bg-green-500/15 border-green-500/30";
          if (status === "ABSENT") cellClass = "bg-red-500/15 border-red-500/30";

          return (
            <div key={idx}
              className={`h-12 rounded-2xl border flex items-center justify-center font-semibold text-sm cursor-pointer transition ${cellClass} ${isToday ? "ring-2 ring-blue-500/40" : ""}`}
              title={status ? status : "No log"}
              onClick={() => alert(`${iso} : ${status || "No log"}`)}>
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
