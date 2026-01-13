export default function ChartTooltip({ active, payload, label, unit = "", title }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-2xl px-4 py-3 border backdrop-blur-xl
      shadow-lg shadow-[0_0_25px_rgba(59,130,246,0.15)]
      dark:bg-zinc-950/70 dark:border-zinc-800
      bg-white/70 border-zinc-200">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{title || label}</p>

      <div className="mt-2 space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color || "#3b82f6" }} />
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{p.name || p.dataKey}</p>
            </div>
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{p.value}{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
