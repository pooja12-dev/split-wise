import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login,getUserFromToken } from "../services/authService"; // Assuming this is where the login function is
import { setUser } from "../slice/userSlice"; // Make sure you import setUser action
import {jwtDecode} from "jwt-decode"; // Correct import // Make sure you import jwt-decode


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false); // State to trigger navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  


  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login({ email, password }, dispatch);
      console.log("Successfully signed in user:", user);
      setRedirect(true); // Set redirect to true after successful login
    } catch (err) {
      console.error("Signin failed:", err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("authToken="));

    if (token) {
      try {
        // Decode the token if it's a JWT
        const decodedToken = jwtDecode(token.split("=")[1]);
        console.log("Decoded Token:", decodedToken);

        // Optionally, fetch user from backend based on the decoded token
        // You can fetch the user from your backend if needed
        getUserFromToken(decodedToken).then((user) => {
          dispatch(setUser(user));
          setRedirect(true); // Redirect to dashboard if the user is found
        });
      } catch (err) {
        console.error("Token decoding failed", err);
      }
    }
  }, [dispatch, navigate]);


  useEffect(() => {
    // Automatically redirect if the user is already logged in (by checking if a token exists)
    if (redirect) {
      navigate("/dashboard");
    }
  }, [redirect, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign In
        </h2>
        <form onSubmit={handleSignin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 ${
              loading && "cursor-not-allowed opacity-50"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 hover:text-blue-700 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
