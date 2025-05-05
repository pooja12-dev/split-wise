import React from "react";

export default function ExpenseList({ expenses }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Expense</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-100">
             
              <td className="border border-gray-300 px-4 py-2">{expense.expenses}</td>
              <td className="border border-gray-300 px-4 py-2">{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
