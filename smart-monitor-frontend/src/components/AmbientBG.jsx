export default function AmbientBG() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 dark:bg-zinc-950 bg-[#f6f7fb]" />

      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30 dark:opacity-35
                      bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
      <div className="absolute top-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-25 dark:opacity-30
                      bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500" />
      <div className="absolute -bottom-52 left-1/3 h-[620px] w-[620px] rounded-full blur-3xl opacity-20 dark:opacity-25
                      bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500" />

      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
           style={{
             backgroundImage:
               "linear-gradient(to right, rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.6) 1px, transparent 1px)",
             backgroundSize: "64px 64px",
           }}
      />
    </div>
  );
}
