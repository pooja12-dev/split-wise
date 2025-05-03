import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // Import login function
import { setUser } from "../slice/userSlice"; // Import setUser action

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login({ email, password }, dispatch); // Pass dispatch to login
      console.log("Successfully signed in user:", user);
      navigate("/dashboard"); // Redirect to the expenses page after successful login
    } catch (err) {
      console.error("Signin failed:", err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Your Signin form here */}
      <form onSubmit={handleSignin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signin;
