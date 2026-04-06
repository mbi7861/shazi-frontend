"use client";

import { useState } from "react";
import SearchWidget from "./SearchWidget";
import SearchModal from "./SearchModal";

/**
 * SearchContainer — Orchestrates the floating search button and modal.
 * Drop this into the layout alongside other floating widgets.
 */
const SearchContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SearchWidget onClick={() => setIsOpen(true)} />
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SearchContainer;
