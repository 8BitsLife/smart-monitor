import PageTransition from "../components/PageTransition";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Reports() {
  const [report, setReport] = useState(null      );

  useEffect(() => {
    api.get("/reports/weekly").then(res => setReport(res.data)).catch(()=>{});
  }, []);

  return (
    <PageTransition>

    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
        <h2 className="text-lg font-semibold mb-2">Weekly Summary</h2>
        <p className="text-zinc-400">
          You improved your focus score by <span className="text-green-400 font-semibold">{report?.improvement ?? "+12%"}</span> this week.
        </p>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700">Export PDF</button>
          <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700">Share Report</button>
        </div>
      </div>
    </div>
  
    </PageTransition>
  );
}
