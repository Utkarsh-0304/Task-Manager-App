import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="app h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-row flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <div className="flex-1 flex flex-col p-[1rem] gap-[1rem] min-w-0 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
