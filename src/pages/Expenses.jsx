import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import ExpensesHeader from "../components/ExpensesHeader";
import ExpenseFilters from "../components/ExpensesFilters";
import ExpenseList from "../components/ExpensesList";
import { fetchExpenses, addExpense } from "../services/expenseService";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  
  // Access user from Redux store
  const user = useSelector((state) => state.user.user); // Get user from the Redux store

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
    if (!user) {
      console.error("User not authenticated");
      return; // If no user, don't proceed
    }

    const expenseData = {
      name: expenseName,
      amount: expenseAmount,
      type: expenseType,
      description: expenseDescription,
      user_id: user.id, // Use authenticated user's ID
    };

    try {
      const result = await addExpense(expenseData);
      console.log("Expense added successfully:", result);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <ExpensesHeader onAddExpense={handleAddExpense} />
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <ExpenseFilters />
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading expenses...</div>
            ) : expenses.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No expenses yet</div>
            ) : (
              <ExpenseList expenses={expenses} />
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-red-500 mt-4">User not authenticated</div>
      )}
    </div>
  );
}
