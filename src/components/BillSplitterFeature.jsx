import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Bill Splitter Feature Component
const BillSplitter = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 rounded-lg shadow-lg">
      <div className="relative mb-6">
        {/* Scroll Icon */}
        <div className="relative">
          <div className="w-24 h-32 bg-purple-300 rounded-lg transform rotate-3"></div>
          <div className="absolute top-0 left-0 w-24 h-32 bg-indigo-300 rounded-lg transform -rotate-3 flex flex-col justify-center items-center">
            <div className="w-12 h-1 bg-gray-600 rounded-full my-1"></div>
            <div className="w-12 h-1 bg-gray-600 rounded-full my-1"></div>
            <div className="w-12 h-1 bg-gray-600 rounded-full my-1"></div>
          </div>
          
          {/* Alarm Clock */}
          <div className="absolute -right-4 -top-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-1 h-3 bg-white absolute transform rotate-45"></div>
                <div className="w-1 h-2 bg-white absolute transform -rotate-45"></div>
              </div>
            </div>
          </div>
          
          {/* Coins */}
          <div className="absolute -left-4 bottom-0 flex">
            <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
            <div className="w-5 h-5 bg-yellow-500 rounded-full -ml-2"></div>
            <div className="w-5 h-5 bg-yellow-600 rounded-full -ml-2"></div>
          </div>
        </div>
      </div>
      
      <h3 className="text-white text-center font-medium text-lg mb-1">Bill Pay & Splitter</h3>
      
      <div className="bg-white rounded-lg p-6 w-full max-w-xs">
        <h2 className="text-3xl font-bold text-center mb-2">Just 1 Click Split Your Bill</h2>
        <p className="text-gray-600 text-center mb-6">
          Easy way to split bills with your friends, colleague & anyone.
        </p>
        <div className="flex justify-center">
          <button className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center">
            <ArrowRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default BillSplitter;