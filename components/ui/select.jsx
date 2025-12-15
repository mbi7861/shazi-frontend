"use client";
import React from "react";

function Select({ label, error, children, ...props }) {
  return (
    <label className="w-full text-sm">
      {label}
      <select
        {...props}
        className={`mt-1 w-full border px-3 py-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </label>
  );
}

export default Select;