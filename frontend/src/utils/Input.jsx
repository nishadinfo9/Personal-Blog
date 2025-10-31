import React from "react";

const Input = ({ label, error, type = "text", className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-sm">
      {label && (
        <label className="text-gray-200 text-sm font-medium">{label}</label>
      )}

      <input
        type={type}
        className={`bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 rounded-lg px-4 py-2 outline-none transition-all duration-200 placeholder-gray-400 ${className}`}
        {...props}
      />

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
