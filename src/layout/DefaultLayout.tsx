import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarMobile from "../components/SidebarMobile";

export default function DefaultLayout() {
  return (
    <>
      <div className="flex min-h-screen">
        <aside className="hidden md:block w-72 shrink-0 sticky top-0 h-screen boxe">
          <Sidebar />
        </aside>

        <main className="flex-1 content overflow-x-auto">
          <Outlet />
        </main>
      </div>

      <div className="md:hidden">
        <SidebarMobile />
      </div>
    </>
  );
}