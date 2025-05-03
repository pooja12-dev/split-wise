import React from 'react';

export default function ExpenseList({ expenses }) {
  return (
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
                {expense.paidBy === 'You' ? 'You paid' : `${expense.paidBy} paid`} $
                {expense.amount.toFixed(2)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <span
                className={`text-sm font-medium ${
                  expense.paidBy === 'You' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {expense.paidBy === 'You' ? '+' : '-'}${expense.yourShare.toFixed(2)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
