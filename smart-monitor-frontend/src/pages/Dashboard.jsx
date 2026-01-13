import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import PageTransition from "../components/PageTransition";
import ChartTooltip from "../components/ChartTooltip";
import { SkeletonCard, Skeleton } from "../components/Skeleton";
import FocusMeter from "../components/FocusMeter";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { Clock, ShieldCheck, AlertTriangle, TrendingUp } from "lucide-react";
import api from "../api/axios";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/dashboard/summary").then(res => setSummary(res.data)).catch(()=>{});
  }, []);

  const attendance = summary?.attendancePercent ?? 86;
  const focus = summary?.focusScore ?? 78;
  const distractions = summary?.distractionsToday ?? 6;
  const hoursToday = summary?.studyTimeToday ?? "4h 20m";
  const weeklyFocus = summary?.weeklyFocus ?? [
    { day: "Mon", focus: 72 },{ day: "Tue", focus: 81 },{ day: "Wed", focus: 65 },
    { day: "Thu", focus: 79 },{ day: "Fri", focus: 85 },{ day: "Sat", focus: 60 },{ day: "Sun", focus: 90 },
  ];
  const studyHours = summary?.studyHours ?? [
    { day: "Mon", hours: 3.2 },{ day: "Tue", hours: 4.8 },{ day: "Wed", hours: 2.5 },
    { day: "Thu", hours: 5.1 },{ day: "Fri", hours: 4.3 },{ day: "Sat", hours: 1.9 },{ day: "Sun", hours: 6.0 },
  ];

  if (!summary) {
    return (
      <PageTransition>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl glass"><Skeleton className="h-4 w-28" /><Skeleton className="h-28 w-full mt-4" /></div>
            <div className="p-5 rounded-3xl glass lg:col-span-2"><Skeleton className="h-4 w-40" /><Skeleton className="h-64 w-full mt-4" /></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl glass"><Skeleton className="h-4 w-24" /><Skeleton className="h-64 w-full mt-4" /></div>
            <div className="p-5 rounded-3xl glass"><Skeleton className="h-4 w-24" /><Skeleton className="h-64 w-full mt-4" /></div>
          </div>
        </div>
      </PageTransition>
    );
  }

  const attendanceData = [
    { name: "Present", value: attendance },
    { name: "Absent", value: 100 - attendance },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Attendance %" value={`${attendance}%`} sub="Weekly attendance" icon={<ShieldCheck />} />
        <StatCard title="Study Time Today" value={hoursToday} sub="Goal: 6h" icon={<Clock />} />
        <StatCard title="Distractions" value={distractions} sub="Apps opened" icon={<AlertTriangle />} />
        <StatCard title="Improvement" value="+12%" sub="From last week" icon={<TrendingUp />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FocusMeter score={focus} />

        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 lg:col-span-2">
          <p className="text-sm text-zinc-400 mb-3">Weekly Focus Trend</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyFocus}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<ChartTooltip title="Weekly Focus" />} cursor={{ strokeDasharray: "4 4" }} />
                <Line type="monotone" dataKey="focus" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800">
          <p className="text-sm text-zinc-400 mb-3">Attendance</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendanceData} dataKey="value" innerRadius={50} outerRadius={80}>
                  {attendanceData.map((_, idx) => (<Cell key={idx} />))}
                </Pie>
                <Tooltip content={<ChartTooltip title="Attendance Breakdown" unit="%" />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800">
          <p className="text-sm text-zinc-400 mb-3">Study Hours</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyHours}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<ChartTooltip title="Study Hours" unit="h" />} />
                <Bar dataKey="hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
