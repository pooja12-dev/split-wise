import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Activity,
  FileText,
  CreditCard,
  Users,
  PlusCircle,
  Heart,
  Lightbulb,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", name: "Home", icon: Home, route: "/dashboard/home" },
    {
      id: "activity",
      name: "Activity",
      icon: Activity,
      route: "/dashboard/activity",
    },
    {
      id: "expenses",
      name: "Expenses",
      icon: FileText,
      route: "/dashboard/expenses",
    },
    {
      id: "accounts",
      name: "Accounts",
      icon: CreditCard,
      route: "/dashboard/accounts",
    },
    {
      id: "groups",
      name: "Groups",
      icon: CreditCard,
      route: "/dashboard/groups",
    },
    { id: "tags", name: "tags", icon: Home, route: "/dashboard/tags" },
  ];

  const handleMenuItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.route); // Navigate to the corresponding route
  };

  return (
    <div className="w-64 bg-white h-screen border-r flex flex-col">
      <div className="p-4 border-b flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <span className="text-white font-bold">S</span>
        </div>
        <h1 className="text-lg font-semibold">SplitMyExpenses</h1>
      </div>

      <nav className="flex-1">
        <ul className="py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item)} // Handle navigation
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left ${
                    activeItem === item.id
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Your groups
        </h3>
        <button className="w-full text-left py-2 px-4 rounded-md bg-purple-50 text-purple-600 mb-4">
          <span className="flex items-center">
            <PlusCircle size={16} className="mr-2" />
            New group
          </span>
        </button>

        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Your friends
        </h3>
        
        <button className="w-full text-left py-2 px-4 rounded-md bg-purple-50 text-purple-600 mb-4">
          <span className="flex items-center">
            <Users size={16} className="mr-2" />
            Tags
          </span>
        </button>
      </div>

      <div className="mt-auto border-t">
        <ul className="py-2">
          <li>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
              <Heart size={20} />
              <span>Support the site</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
              <Lightbulb size={20} />
              <span>Submit an idea</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
