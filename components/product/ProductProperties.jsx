"use client";

import React from "react";

const ProductProperties = ({ properties }) => {
    if (!properties || properties.length === 0) {
        return null;
    }

    return (
        <div className="overflow-x-auto">
            <ul className="list-disc pl-5 text-gray-700">
                {properties.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductProperties;

