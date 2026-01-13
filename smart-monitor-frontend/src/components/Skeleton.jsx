import clsx from "clsx";

export function Skeleton({ className }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl",
        "bg-zinc-200/80 dark:bg-zinc-800/60",
        "border border-zinc-300/40 dark:border-zinc-700/40",
        "shadow-[0_0_30px_rgba(59,130,246,0.08)] dark:shadow-[0_0_30px_rgba(59,130,246,0.12)]",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10" />
      <div className="absolute inset-0 opacity-30 animate-pulse bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-3xl p-5 glass">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
      <Skeleton className="h-10 w-32 mt-4" />
      <Skeleton className="h-3 w-40 mt-2" />
    </div>
  );
}
