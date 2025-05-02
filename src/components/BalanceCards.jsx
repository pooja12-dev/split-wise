import React from "react";

const BalanceCards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-5">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">Your balance</h3>
          <p className="text-3xl font-semibold">$0.00</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm mt-5">
          <h3 className="text-sm text-gray-500 mb-2">You get</h3>
          <p className="text-3xl font-semibold">$0.00</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm mt-5">
          <h3 className="text-sm text-gray-500 mb-2">You owe</h3>
          <p className="text-3xl font-semibold">$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCards;
