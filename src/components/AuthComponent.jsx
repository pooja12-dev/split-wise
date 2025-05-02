import { useState } from "react";

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const normalizeEmail = (email) => email.trim().toLowerCase();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return "";

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "Name is required";
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Invalid email format";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        setPasswordStrength(calculatePasswordStrength(value));
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    Object.keys(formData).forEach((key) => {
      if (!isLogin || key !== "name") {
        validateField(key, formData[key]);
      }
    });

    if (Object.values(errors).some((err) => err)) {
      return; // Stop submission if there are errors
    }

    const normalizedEmail = normalizeEmail(formData.email);

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem(normalizedEmail));
      if (!storedUser) {
        setErrors((prev) => ({
          ...prev,
          email: "User not signed up. Please sign up first.",
        }));
        return;
      }

      if (storedUser.password === formData.password) {
        alert("Login successful");
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "Invalid password",
        }));
      }
    } else {
      if (localStorage.getItem(normalizedEmail)) {
        setErrors((prev) => ({
          ...prev,
          email: "Email already registered. Please login.",
        }));
        return;
      }

      // Store user in localStorage
      localStorage.setItem(
        normalizedEmail,
        JSON.stringify({
          name: formData.name,
          email: normalizedEmail,
          password: formData.password,
        })
      );
      alert("Signup successful");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 p-1 rounded-full">
          <button
            className={`px-6 py-2 rounded-full ${
              isLogin ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => {
              setIsLogin(true);
              setErrors({});
            }}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              !isLogin ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => {
              setIsLogin(false);
              setErrors({});
            }}
          >
            Sign Up
          </button>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              name="name"
              type="text"
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={isLogin ? "Enter your password" : "Create a password"}
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          {!isLogin && (
            <p
              className={`text-sm ${
                passwordStrength === "Weak"
                  ? "text-red-500"
                  : passwordStrength === "Moderate"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthComponent;
