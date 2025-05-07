import React, { useState } from "react";
import { supabase } from "./supabaseClient"; // Import Supabase client
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle the signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Start loading
      console.log("Attempting signup with:", {
        firstName,
        lastName,
        email,
        password,
      });

      const response = await axios.post(
        "http://localhost:3001/api/user-signup",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }
      );

      console.log("API Response:", response);

      if (response.status === 200) {
        // Handle successful signup
        console.log("Signup successful:", response.data);
        setLoading(false);
        navigate("/login"); // Navigate to the login page after successful signup
      }
    } catch (error) {
      setLoading(false);

      // Check if error.response exists and is properly formatted
      if (error.response) {
        const errorMessage =
          error.response.data.error ||
          error.response.data.message ||
          "An error occurred during signup.";
        console.error("Error Response Data:", error.response.data);
        setError(errorMessage); // Set the dynamic error message
      } else {
        // Generic network or other unexpected error
        console.error("Unexpected Error:", error.message);
        setError(
          "An unexpected error occurred. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h2>

        {/* Display error message */}
        {error && (
          <div className="bg-red-500 text-white text-center py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:text-blue-700 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
