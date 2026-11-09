import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";

function MainLayout() {
  return (
    <div className="min-h-screen">
    <Header/>

      <div className="grid grid-cols-1 md:grid-cols-[256px_minmax(0,1fr)] min-w-0">

          <Sidebar/>
      
        <main className="min-w-0 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;