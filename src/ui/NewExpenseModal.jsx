import { useState } from "react";
import { X, Users, Tag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { addExpense } from "../services/expenseService"; // Import your backend service
import { selectUser } from "../slice/userSlice"; // Import the user selector

export default function NewExpenseModal({ onClose }) {
  const [expenseData, setExpenseData] = useState({
    description: "",
    amount: "",
    paidBy: "you",
    date: new Date().toISOString().split("T")[0],
    category: "",
    splitWith: [],
    splitType: "equal",
  });

  const user = useSelector(selectUser); // Get the logged-in user from Redux
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // Handle error if no user is logged in
      alert("Please log in to add an expense.");
      return;
    }

    try {
      // Prepare the expense data for submission to backend
      const expenseToSubmit = {
        expenses: expenseData.description,
        amount: parseFloat(expenseData.amount),
       
        user_id: user.id, // Use user ID from the logged-in user
        group_id: null, // Add group_id if needed
      
      };

      // Call the backend service to add the expense
      await addExpense(expenseToSubmit, user.id);

      // After successful expense addition, close the modal
      onClose();
      alert("Expense added successfully");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Add an expense</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={expenseData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What was this expense for?"
                required
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={expenseData.amount}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Tag size={16} className="text-gray-400" />
                </div>
                <select
                  id="category"
                  name="category"
                  value={expenseData.category}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a category</option>
                  <option value="food">Food & Drink</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="home">Home</option>
                  <option value="transportation">Transportation</option>
                  <option value="utilities">Utilities</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save expense
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
