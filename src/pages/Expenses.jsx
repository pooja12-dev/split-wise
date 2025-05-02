import { Plus, Filter, Search } from 'lucide-react';

export default function Expenses() {
  // Example expenses data
  const expenses = [
    { id: 1, title: 'Dinner', amount: 45.00, date: '2023-05-01', category: 'Food', paidBy: 'John', yourShare: 15.00 },
    { id: 2, title: 'Groceries', amount: 32.50, date: '2023-04-25', category: 'Food', paidBy: 'You', yourShare: 16.25 },
    { id: 3, title: 'Movie tickets', amount: 24.00, date: '2023-04-18', category: 'Entertainment', paidBy: 'You', yourShare: 12.00 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Expenses</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md flex items-center">
          <Plus size={16} className="mr-2" />
          Add expense
        </button>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
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

        {expenses.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No expenses yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <li key={expense.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {expense.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(expense.date).toLocaleDateString()} • {expense.category}
                    </p>
                    <p className="text-xs text-gray-500">
                      {expense.paidBy === 'You' ? 'You paid' : `${expense.paidBy} paid`} ${expense.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className={`text-sm font-medium ${expense.paidBy === 'You' ? 'text-green-600' : 'text-red-600'}`}>
                      {expense.paidBy === 'You' ? '+' : '-'}${expense.yourShare.toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}