import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login Page Component
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Login with:", { email, password });
    // Implement your login logic here
  };

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
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
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
          <h2 className="text-3xl font-bold text-white">Login</h2>
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Back
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-blue-200 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-blue-200 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-blue-200">
                Remember me
              </label>
            </div>

            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Login
          </button>

          <div className="text-center text-blue-200">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
