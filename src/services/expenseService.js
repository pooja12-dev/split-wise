import axiosInstance from "../axiosInstance";
import axios from "axios";

import { supabase } from "../pages/supabaseClient"; // Import Supabase client
const API_URL = "http://localhost:3001/api"; // Replace with your backend's URL

/**
 * Fetches all expenses for a specific user.
 * @param {number} userId - The ID of the user whose expenses are to be fetched.
 * @returns {Promise<Array>} - The list of expenses.
 */
export const fetchExpenses = async (userId) => {
  console.log("Fetching expenses for user:", userId); // Log userId
  try {
    const response = await axios.get(
      `http://localhost:3001/api/view-expenses`,
      {
        params: { user_id: userId },
      }
    );
    console.log("API Response:", response.data); // Log API response
    return response.data.success; // Ensure you're accessing the correct field
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

/**
 * Adds a new expense to the backend.
 * @param {Object} expense - The expense object to be added.
 * @returns {Promise<Object>} - The newly created expense.
 */
// services/expenseService.js
export const addExpense = async (expenseData, userId) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Log the payload for debugging
    console.log("Expense data:", expenseData);

    const expenseWithUser = { ...expenseData, user_id: userId };

    // Insert into Supabase
    const response = await supabase.from("expense").insert([expenseWithUser]);

    if (response.error) {
      throw response.error;
    }

    return response.data; // Return the added expense data
  } catch (error) {
    console.error("Error adding expense:", error.message);
    throw error;
  }
};

/**
 * Updates an existing expense.
 * @param {number} expenseId - The ID of the expense to update.
 * @param {Object} updates - The fields to update.
 * @returns {Promise<Object>} - The updated expense.
 */
export const updateExpense = async (expenseId, updates) => {
  try {
    const response = await axios.put(
      `${API_URL}/expenses/${expenseId}`,
      updates
    );
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

/**
 * Deletes an expense.
 * @param {number} expenseId - The ID of the expense to delete.
 * @returns {Promise<void>}
 */
export const deleteExpense = async (expenseId) => {
  try {
    await axios.delete(`${API_URL}/expenses/${expenseId}`);
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
