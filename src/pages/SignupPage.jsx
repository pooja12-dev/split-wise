import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      password.length < 8 ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include a number and special character";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //form validation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signup with:", { name, email, password });
      // Add your signup logic here
    }
  };
  //handling form submission

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/user-signup",
        {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }
      );

      // Handle success
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  //handlesignup from supabase

  document
    .getElementById("signupForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      await handleSignup(name, email, password);
    });
  // Attach Event Listener to signup form

  const navigateToHome = () => navigate("/");
  const navigateToLogin = () => navigate("/login");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-50"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animation: `float ${
                Math.random() * 10 + 10
              }s infinite ease-in-out`,
            }}
          />
        ))}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(10px, 15px) rotate(90deg);
            }
            50% {
              transform: translate(15px, 5px) rotate(180deg);
            }
            75% {
              transform: translate(5px, 10px) rotate(270deg);
            }
          }
        `}</style>
      </div>

      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Sign Up</h2>
          <button
            onClick={navigateToHome}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Back
          </button>
        </div>

        <form
          className="space-y-5"
          id="signupForm"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <label className="block text-blue-200 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-blue-200 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-blue-200 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-blue-200 mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: "" });
              }}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSignup}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all mt-6"
          >
            Create Account
          </button>

          <div className="text-center text-blue-200 mt-4">
            Already have an account?{" "}
            <button
              onClick={navigateToLogin}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
