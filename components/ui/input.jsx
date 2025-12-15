"use client";
import React from "react";

function Input({ label, error, ...props }) {
  return (
    <label className="w-full text-sm">
      {label}
      <input
        {...props}
        className={`mt-1 w-full border px-3 py-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </label>
  );
}

export default Input;
