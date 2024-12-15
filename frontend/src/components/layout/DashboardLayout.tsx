import { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { DashboardLayoutProps } from "../../interfaces/Dashboard";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { user, logout } = useIsAuthenticated();

  const onLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen max-w-[100rem] mx-auto">
      {/* Sidebar */}
      <SideBar
        onLogout={onLogout}
        onOpenBarClick={() => setSidebarOpen(false)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <TopBar
          user={user}
          onLogout={onLogout}
          onOpenBarClick={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-2 md:p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;