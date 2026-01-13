import PageTransition from "../components/PageTransition";
import { useEffect, useState } from "react";
import api from "../api/axios";
import AttendanceCalendar from "../components/AttendanceCalendar";

export default function Attendance() {
  const [logs, setLogs] = useState([]      );

  useEffect(() => {
    api.get("/attendance/me").then((res) => setLogs(res.data));
  }, []);

  return (
    <PageTransition>

    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Attendance</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Calendar view + logs table</p>
      </div>

      <AttendanceCalendar logs={logs} />

      <div className="rounded-3xl border p-5 shadow-sm
        dark:bg-zinc-900/40 dark:border-zinc-800
        bg-white border-zinc-200">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-4">Attendance Logs</p>

        <table className="w-full text-left">
          <thead>
            <tr className="text-zinc-500 text-sm">
              <th className="py-2">Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l, i) => (
              <tr key={i} className="border-t dark:border-zinc-800 border-zinc-200">
                <td className="py-3">{l.date}</td>
                <td className={l.status === "PRESENT" ? "text-green-500" : "text-red-500"}>
                  {l.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  
    </PageTransition>
  );
}
