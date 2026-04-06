"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { productService } from "@/services/productService";
import SearchResultCard from "./SearchResultCard";

/**
 * SearchModal — Full-screen search overlay with debounced product search.
 *
 * Features:
 *  - Auto-focuses the input on open
 *  - Debounced API calls (400ms)
 *  - Loading / empty / error states
 *  - Close on Escape or backdrop click
 *  - Displays product results via SearchResultCard
 */
const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset state when closing
      setQuery("");
      setResults([]);
      setSearched(false);
      setLoading(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Debounced search
  const handleSearch = useCallback(
    (value) => {
      setQuery(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (!value.trim()) {
        setResults([]);
        setSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);

      debounceRef.current = setTimeout(async () => {
        try {
          const res = await productService.searchProducts(value.trim());
          setResults(res.products || []);
        } catch {
          setResults([]);
        } finally {
          setLoading(false);
          setSearched(true);
        }
      }, 400);
    },
    []
  );

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div
        className="search-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Search Bar */}
        <div className="search-modal-header">
          <div className="search-modal-input-wrapper">
            <Search size={20} className="search-modal-input-icon" />
            <input
              ref={inputRef}
              id="search-modal-input"
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for jewellery…"
              className="search-modal-input"
              autoComplete="off"
            />
            {query && (
              <button
                aria-label="Clear search"
                onClick={() => handleSearch("")}
                className="search-modal-clear-btn"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            aria-label="Close search"
            onClick={onClose}
            className="search-modal-close-btn"
          >
            <X size={22} />
          </button>
        </div>

        {/* Results Area */}
        <div className="search-modal-results">
          {loading && (
            <div className="search-modal-status">
              <Loader2 size={28} className="animate-spin" />
              <span>Searching…</span>
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="search-modal-status">
              <p className="search-modal-empty-title">No products found</p>
              <p className="search-modal-empty-sub">
                Try a different keyword or browse our collections
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="search-modal-count">
                {results.length} product{results.length !== 1 ? "s" : ""} found
              </p>
              <div className="search-modal-grid">
                {results.map((product) => (
                  <SearchResultCard
                    key={product.id}
                    product={product}
                    onClose={onClose}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && !searched && (
            <div className="search-modal-status">
              <Search size={36} className="opacity-20" />
              <p className="search-modal-empty-sub">
                Start typing to search our products
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
