import React from 'react';
import { Filter, Search } from 'lucide-react';

export default function ExpenseFilters() {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Search expenses"
          />
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Most recent
          </button>
        </div>
      </div>
    </div>
  );
}
