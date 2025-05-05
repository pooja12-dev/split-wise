import { Plus } from "lucide-react";

export default function ExpensesHeader({ onAddExpense, user }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium">
        {user ? `Expenses for ${user.email}` : "Expenses"}
      </h2>
      <button
        onClick={onAddExpense }
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
      >
        <Plus size={16} className="mr-2" />
        Add expense
      </button>
    </div>
  );
}
