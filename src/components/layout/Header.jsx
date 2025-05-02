import { Search, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Search for a friend or group"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <button className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white">
            P
          </div>
          <span className="text-sm font-medium">Pooja Harplani</span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
}