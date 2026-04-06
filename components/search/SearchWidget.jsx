"use client";

import { Search } from "lucide-react";

/**
 * SearchWidget — Floating search button positioned above the WhatsApp widget.
 * Renders a fixed-position circular button in the bottom-right corner.
 */
const SearchWidget = ({ onClick }) => {
  return (
    <button
      id="search-widget-btn"
      aria-label="Search products"
      onClick={onClick}
      className="search-widget-btn"
    >
      <Search size={22} strokeWidth={2.2} />
    </button>
  );
};

export default SearchWidget;
