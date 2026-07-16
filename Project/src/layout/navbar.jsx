// src/components/layout/Navbar.jsx
import { useState } from "react";

// small pagoda-roof mark, reused from the auth card so the brand feels consistent
function PagodaMark() {
  return (
    <svg width="22" height="14" viewBox="0 0 56 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 2L34 10H22L28 2Z" fill="#C89B3C" />
      <rect x="20" y="10" width="16" height="2" fill="#A0223B" />
      <path d="M28 12L40 22H16L28 12Z" fill="#A0223B" />
      <rect x="12" y="22" width="32" height="2.5" fill="#062A5E" />
      <path d="M28 24.5L46 33.5H10L28 24.5Z" fill="#A0223B" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function Navbar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: wire up to real search logic / routing
    console.log("Searching for:", search);
  };

  return (
    <header className="relative w-full bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-5 flex-nowrap overflow-x-auto">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <PagodaMark />
          <span className="font-display text-crimson text-xl leading-none">Ghar Bhada</span>
        </a>

        <span className="h-5 w-px bg-hairline shrink-0" />

        {/* Links */}
        <nav className="flex items-center gap-5 text-sm font-semibold text-charcoal shrink-0">
          <a href="/" className="whitespace-nowrap border-b-2 border-transparent hover:border-gold pb-0.5">
            Home
          </a>
          <a href="/contact" className="whitespace-nowrap border-b-2 border-transparent hover:border-gold pb-0.5">
            Contact Us
          </a>
        </nav>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center flex-1 min-w-[140px] max-w-sm">
          <div className="flex items-center flex-1 border border-hairline rounded-full pl-3.5 pr-1.5 py-1 bg-cream focus-within:border-gold">
            <span className="text-charcoal-soft shrink-0">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a rental..."
              className="flex-1 min-w-0 text-sm px-2 py-1 bg-transparent text-charcoal outline-none placeholder:text-charcoal-soft"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-full bg-crimson text-paper text-xs font-semibold hover:bg-crimson-dark shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* Login */}
        
          href="/login"
          className="ml-auto shrink-0 whitespace-nowrap px-5 py-1.5 rounded-full border-2 border-himal-blue text-himal-blue text-sm font-semibold hover:bg-himal-blue hover:text-paper"
        >
          Login
        </a>
      </div>

      {/* carved tricolor trim, matching the auth card */}
      <div className="h-[3px] bg-gradient-to-r from-crimson via-gold to-himal-blue" />
    </header>
  );
}