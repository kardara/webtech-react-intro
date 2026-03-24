import React from "react";

function Button({ title, onClick, bgColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-3 py-2 font-medium hover:opacity-90 ${bgColor}`}
    >
      {title}
    </button>
  );
}

export default Button;
