"use client";
import React from "react";

function Textarea({ label, error, ...props }) {
  return (
    <label className="block text-sm">
      {label}
      <textarea
        {...props}
        className={`mt-1 w-full border px-3 py-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        rows={3}
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </label>
  );
}

export default Textarea;