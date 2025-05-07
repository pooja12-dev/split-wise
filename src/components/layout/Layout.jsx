import { Outlet } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "./SideBar";
import Header from "./Header";

// Create context for sidebar state
export const SidebarContext = createContext();

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      // Auto-collapse sidebar on smaller screens
      if (width < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="flex h-screen overflow-hidden">
        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Fixed positioning for mobile, relative for larger screens */}
        <aside
          className={`
            ${isMobile ? "fixed" : "relative"} 
            z-40 h-full
            ${
              isMobile
                ? sidebarOpen
                  ? "left-0"
                  : "-left-full"
                : sidebarOpen
                ? "w-52 lg:w-56"
                : "w-auto"
            }
            transition-all duration-300 ease-in-out
          `}
        >
          <div className="h-full bg-white border-r shadow-sm overflow-hidden">
            <Sidebar />

            {/* Toggle button for desktop - OUTSIDE the sidebar container */}
          </div>
        </aside>

        {/* Main content - Flex-grow to take remaining space */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm z-30">
            <div className="px-4 flex items-center justify-between h-16">
              {/* Mobile menu button */}
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-500 focus:outline-none"
                >
                  <Menu size={24} />
                </button>
              )}

              <Header />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
