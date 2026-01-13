export default function FocusMeter({ score }) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800">
      <p className="text-sm text-zinc-400">Focus Score</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center">
          <span className="text-xl font-bold">{score}</span>
        </div>
        <div>
          <p className="font-semibold text-zinc-200">
            {score >= 80 ? "Excellent 🔥" : score >= 60 ? "Good ✅" : "Needs Improvement ⚠️"}
          </p>
          <p className="text-sm text-zinc-500">Based on study time & distractions</p>
        </div>
      </div>
    </div>
  );
}
