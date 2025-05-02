import React from 'react';

const WelcomeBanner = () => (
  <div className="relative w-full min-h-[400px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-200 to-green-300 flex flex-col justify-center items-center px-4 py-8 md:py-16">
    {/* Background Illustration */}
    <img
      src="https://example.com/splitwise-background.jpg" // Replace with an app-specific background
      alt="Shared Expenses"
      className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
    />

    {/* Overlay Content */}
    <div className="relative z-10 w-full flex flex-col items-center">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/icon.png" // Replace with Splitwise-like logo
          alt="Splitwise Logo"
          className="w-14 h-14 md:w-20 md:h-20 mb-2"
        />
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">Splitwise</h1>
      </div>

      {/* Welcome Message */}
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 drop-shadow">
        Welcome to Your Expense Tracker
      </h2>
      <p className="text-base md:text-lg text-white mb-8 max-w-xl text-center drop-shadow">
        Effortlessly track and split your shared expenses with friends and family.
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {/* Total Balance Card */}
        <div className="bg-white bg-opacity-90 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-sm md:text-base font-semibold text-gray-700">Total Balance</span>
          <span className="text-xl md:text-2xl font-bold text-blue-600">$1,275.00</span>
          <span className="text-xs text-green-500 mt-1">+8.12% from last month</span>
        </div>

        {/* Groups Card */}
        <div className="bg-white bg-opacity-90 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-sm md:text-base font-semibold text-gray-700 mb-2">Your Groups</span>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm">Family</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs md:text-sm">Friends</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs md:text-sm">Travel</span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs md:text-sm">Work</span>
          </div>
        </div>

        {/* Recent Bills Card */}
        <div className="bg-white bg-opacity-90 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-sm md:text-base font-semibold text-gray-700">Recent Bills</span>
          <span className="text-xl md:text-2xl font-bold text-blue-600">Dinner: $50.00</span>
          <span className="text-xs text-gray-500 mt-1">Split between 3 people</span>
        </div>
      </div>
    </div>
  </div>
);

export default WelcomeBanner;
