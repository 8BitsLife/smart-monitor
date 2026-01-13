export default function StatCard({ title, value, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 shadow">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{title}</p>
        <div className="text-zinc-300">{icon}</div>
      </div>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      {sub && <p className="text-sm text-zinc-500 mt-1">{sub}</p>}
    </div>
  );
}
