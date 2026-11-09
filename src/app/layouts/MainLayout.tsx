import { Outlet } from "react-router-dom";
import {useState} from "react"


import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";


function MainLayout() {

const [isSidebarOpen,setIsSidebarOpen]=useState(false)




  return (
    <div className="min-h-screen">
   <Header onMenuClick={() => {
  setIsSidebarOpen((prev) => !prev);
}} />

      <div className="grid grid-cols-1 md:grid-cols-[256px_minmax(0,1fr)] min-w-0">
<Sidebar isOpen={isSidebarOpen} />
      
        <main className="min-w-0 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;