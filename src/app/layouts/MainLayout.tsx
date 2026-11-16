
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">

      <Header
        onMenuClick={() => {
          setIsSidebarOpen((prev) => !prev);
        }}
      />

      <div className="grid min-w-0 flex-1 grid-cols-1 md:grid-cols-[256px_minmax(0,1fr)]">

        <Sidebar isOpen={isSidebarOpen} />

        <main className="min-w-0 w-full">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;
