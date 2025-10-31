import React from "react";

const Button = ({ type, children }) => {
  return (
    <button type={type} className="btn btn-success">
      {children}
    </button>
  );
};

export default Button;
