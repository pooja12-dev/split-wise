import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ExpensesHeader from "../components/ExpensesHeader";
import ExpenseFilters from "../components/ExpensesFilters";
import ExpenseList from "../components/ExpensesList";
import { fetchExpenses, addExpense } from "../services/expenseService";
import { supabase } from "../pages/supabaseClient"; // Import supabase client

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  // State variables for input fields
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [expenseDescription, setExpenseDescription] = useState(""); // Added description state
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedTagId, setSelectedTagId] = useState(null);

  const [currentUser, setCurrentUser] = useState(null); // User data

  // Fetch the expenses when the component loads
  useEffect(() => {
    const loadExpenses = async () => {
      setLoading(true);
      try {
        const data = await fetchExpenses(); // Fetch expenses without passing userId here
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  // Fetch user data from Supabase
  const getUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      console.log(user);

      if (error || !user) {
        throw new Error("User not authenticated");
      }

      setCurrentUser(user); // Set the user in state
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  // Call getUser to retrieve the authenticated user
  useEffect(() => {
    getUser();
  }, []);

  // Add an expense
  const handleAddExpense = async () => {
    if (!currentUser) {
      console.error("User not authenticated");
      return; // If no user, don't proceed
    }

    const expenseData = {
      name: expenseName,
      amount: expenseAmount,
      type: expenseType,
      description: expenseDescription,
      user_id: currentUser.id, // Include the authenticated user's ID
      group_id: selectedGroupId, // Optional if you want to include group
      tag_id: selectedTagId, // Optional if you want to include tag
    };

    try {
      const result = await addExpense(expenseData); // Call addExpense with user data
      console.log("Expense added successfully:", result);
      // You can handle the response or show a success message here
    } catch (error) {
      console.error("Failed to add expense:", error);
      // Handle the error or show an error message to the user
    }
  };

  return (
    <div>
      <ExpensesHeader onAddExpense={handleAddExpense} />
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <ExpenseFilters />
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading expenses...
          </div>
        ) : expenses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No expenses yet</div>
        ) : (
          <ExpenseList expenses={expenses} />
        )}
      </div>
    </div>
  );
}
