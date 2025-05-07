import React from "react";

const Button = ({ variant, children, onClick, type }) => {
  const variantClasses = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500",
    secondary:
      "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500",
  };

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-md text-sm font-medium ${variantClasses[variant]} focus:outline-none focus:ring-2`}
    >
      {children}
    </button>
  );
};

export default Button;
