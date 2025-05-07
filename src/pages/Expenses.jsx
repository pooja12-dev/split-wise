import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import ExpensesHeader from "../components/ExpensesHeader";
import ExpenseFilters from "../components/ExpensesFilters";
import ExpenseList from "../components/ExpensesList";
import { fetchExpenses, addExpense } from "../services/expenseService";
import NewExpenseModal from "../ui/NewExpenseModal";

export default function ExpensesPage() {
  const [showModal, setShowModal] = useState(false); // Modal state
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  // Access user from Redux store
  const user = useSelector((state) => state.user.user); // Get user from the Redux store
  console.log(user);

  useEffect(() => {
    const loadExpenses = async () => {
      setLoading(true);
      try {
        const data = await fetchExpenses(user?.id); // Fetch expenses for the authenticated user
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadExpenses();
    } else {
      console.error("User not authenticated");
    }
  }, [user]);

  const handleAddExpense = async () => {
    setShowModal(true); 
    const expenseData = {
      expenses: expenseName.trim(),
      amount: parseFloat(expenseAmount), // Convert to a number
      type: expenseType.trim(),
      description: expenseDescription.trim(),
    };
  
    // Check if the amount is a valid number
    if (isNaN(expenseData.amount) || expenseData.amount <= 0) {
      console.error("Invalid amount entered");
      return;
    }
  
    try {
      // Add the expense to the backend
      const response = await addExpense(expenseData, user?.id);
  
      // Assuming `response` contains the new expense
      const newExpense = response.expense;
  
      // Update the state to include the new expense
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  
      console.log("Expense added successfully");
  
      // Optionally, reset the input fields
      setExpenseName("");
      setExpenseAmount("");
      setExpenseType("");
      setExpenseDescription("");
    } catch (error) {
      console.error("Failed to add expense:", error.message);
    }
  };
  
  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div>
      {user ? (
        <>
          <ExpensesHeader onAddExpense={handleAddExpense} user={user} />
          {showModal && <NewExpenseModal onClose={closeModal} />}

          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <ExpenseFilters />
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Loading expenses...
              </div>
            ) : expenses.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No expenses yet
              </div>
            ) : (
              <ExpenseList expenses={expenses} />
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-red-500 mt-4">
          User not authenticated
        </div>
      )}
    </div>
  );
}
