import { Outlet } from "react-router-dom";
import AmbientBG from "../components/AmbientBG";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout() {
  return (
    <>
      <AmbientBG />

    <div className="min-h-screen flex dark:bg-zinc-950 dark:text-zinc-100 bg-[#f6f7fb] text-zinc-900">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
      </>
  );
}
