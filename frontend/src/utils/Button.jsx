import React from "react";

const Button = ({ type, children, className = "btn-success" }) => {
  return (
    <button type={type} className={`btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
