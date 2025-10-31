import React from "react";

const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 rounded-lg px-4 py-2 outline-none transition-all duration-200 placeholder-gray-400 ${className}`}
      rows={5}
      {...props}
    ></textarea>
  );
};
export default Textarea;
