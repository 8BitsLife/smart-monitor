import PageTransition from "../components/PageTransition";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

export default function Productivity() {
  const [seconds, setSeconds] = useState(0      );
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stop = async () => {
    setRunning(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
    // save session
    try {
      await api.post("/productivity/session", { durationSeconds: seconds, distractions: 0 });
    } catch {}
  };

  const reset = () => {
    setRunning(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setSeconds(0);
  };

  const format = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  return (
    <PageTransition>

    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Productivity</h1>

      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
        <p className="text-sm text-zinc-400 mb-2">Study Timer</p>
        <h2 className="text-4xl font-bold mb-6">{format(seconds)}</h2>

        <div className="flex gap-3">
          <button onClick={start} className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700">Start</button>
          <button onClick={stop} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700">Stop</button>
          <button onClick={reset} className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700">Reset</button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
        <p className="text-sm text-zinc-400 mb-4">Detected Distractions (demo)</p>
        <ul className="space-y-2 text-zinc-300">
          <li>📱 Instagram - 5 min</li>
          <li>🎮 BGMI - 12 min</li>
          <li>📺 YouTube - 8 min</li>
        </ul>
      </div>
    </div>
  
    </PageTransition>
  );
}
