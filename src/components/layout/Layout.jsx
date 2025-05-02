import { Outlet } from 'react-router-dom';
import { useState, createContext } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './SideBar';
import Header from './Header';

// Create context for sidebar state
export const SidebarContext = createContext();

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}>
          {/* Overlay */}
          <div 
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
              sidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <Sidebar />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className={`hidden md:flex md:flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0'
        }`}>
          <div className="flex flex-col w-64">
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="relative z-10">
            <Header />
          </div>
          
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Mobile menu button */}
                <button
                  type="button"
                  className="md:hidden inline-flex items-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu size={24} />
                </button>

                {/* Render the child components here using Outlet */}
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
