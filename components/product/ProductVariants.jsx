"use client";

import React from "react";

const ProductVariants = ({ variations, selectedOptions, onOptionSelect }) => {
    if (!variations || variations.length === 0) return null;

    return (
        <>
            {variations.map(variation => (
                <div key={variation.id} className="mt-4">
                    <p className="font-medium text-gray-700">{variation.name}</p>

                    <div className="flex gap-2 mt-1 flex-wrap">
                        {variation.options.map(option => (
                            <button
                                key={option.id}
                                onClick={() => onOptionSelect(variation.id, option)}
                                className={`px-3 py-1.5 border rounded-full text-sm transition ${
                                    selectedOptions[variation.id] === option.id
                                        ? "bg-primary-light0 text-white border-primary"
                                        : "bg-gray-100 text-gray-800 border-gray-300"
                                }`}
                            >
                                {option.value}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductVariants;
