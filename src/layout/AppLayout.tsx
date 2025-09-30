import { Outlet } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen">
      <AppSidebar />
      <Backdrop />
      <div
        className={`transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-16"
        }`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-7xl md:p-6">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
