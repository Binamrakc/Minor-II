import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isDarkMode }) {
  const navigate = useNavigate();
  
  // State elements mapped directly to your DB INDEX columns
  const [searchParams, setSearchParams] = useState({
    location: "",      // Matches: idx_prop_add(address, city)
    propertyType: "",  // Matches: idx_prop_type(property_type)
    maxPrice: ""       // Matches: idx_price(price)
  });

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    if (searchParams.location) queryParams.append("query", searchParams.location);
    if (searchParams.propertyType) queryParams.append("type", searchParams.propertyType);
    if (searchParams.maxPrice) queryParams.append("price", searchParams.maxPrice);

    navigate(`/?${queryParams.toString()}`);
  };

  const navClass = `navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} border-bottom py-3 px-4 shadow-sm custom-navbar-wrapper`;

  return (
    <nav className={navClass} style={{ transition: 'background-color 0.2s ease, color 0.2s ease' }}>
      <div className="container-fluid px-0">
        
        {/* Brand Container with Logo and requested "GharBasai" text */}
        <Link to="/" className="navbar-brand d-flex align-items-center me-4 text-decoration-none">
          <img src="/ghar.png" width="42" height="42" alt="Ghar Logo" />
          <span 
            className="ms-2 fw-bold custom-brand-text" 
            style={{ 
              fontSize: "1.1rem", 
              letterSpacing: "-0.3px",
              color: isDarkMode ? "#ffffff" : "#000000" 
            }}
          >
            GharBasai
          </span>
        </Link>

        {/* Mobile Navbar Collapse Trigger */}
        <button 
          className="navbar-toggler border-0 shadow-none p-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#mentorSearchNavbarContent" 
          aria-controls="mentorSearchNavbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Panel Structure */}
        <div className="collapse navbar-collapse" id="mentorSearchNavbarContent">
          
          {/* Centered Pill-Shaped Compound Search Form */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="d-flex align-items-center position-relative mx-auto my-3 my-lg-0 w-100" 
            style={{ maxWidth: "650px" }}
          >
            {/* Embedded Left Magnifying Glass Icon */}
            <div className="position-absolute start-0 ms-3 text-muted pointer-events-none" style={{ zIndex: 5 }}>
              <i className="bi bi-search" style={{ fontSize: "0.95rem" }}></i>
            </div>

            {/* Pill Field Group containing specific DB Index target inputs */}
            <div className="d-flex w-100 align-items-center bg-input-pill rounded-pill border px-5 py-1">
              
              {/* Index Input 1: Address/City Keyword (idx_prop_add) */}
              <input 
                type="text" 
                name="location"
                className="form-control bg-transparent border-0 shadow-none py-1 custom-placeholder-fix" 
                placeholder="Search location or city..." 
                value={searchParams.location}
                onChange={handleInputChange}
                style={{ fontSize: "0.9rem" }}
              />

              {/* Index Input 2: Property Type Selector (idx_prop_type) */}
              <select
                name="propertyType"
                className="form-select bg-transparent border-0 shadow-none py-0 text-muted border-start rounded-0 ps-2 pe-4 d-none d-md-block"
                value={searchParams.propertyType}
                onChange={handleInputChange}
                style={{ width: "auto", fontSize: "0.85rem", cursor: "pointer" }}
              >
                <option value="">Type</option>
                <option value="Concert">Concert</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
              </select>

              {/* Index Input 3: Budget Scope Max Selector (idx_price) */}
              <select
                name="maxPrice"
                className="form-select bg-transparent border-0 shadow-none py-0 text-muted border-start rounded-0 ps-2 pe-4 d-none d-md-block"
                value={searchParams.maxPrice}
                onChange={handleInputChange}
                style={{ width: "auto", fontSize: "0.85rem", cursor: "pointer" }}
              >
                <option value="">Price</option>
                <option value="10000">Under 10k</option>
                <option value="20000">10k - 20k</option>
                <option value="50000">20k - 50k</option>
              </select>

              <button type="submit" className="d-none">Submit</button>
            </div>
          </form>

          {/* Right Action Authentication Button Layout */}
          <div className="navbar-nav d-flex align-items-center gap-2 me-3">
            <Link to="/about" className="nav-link text-muted px-3" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
              About Us
            </Link>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <Link 
              to="/login" 
              className="btn px-4 py-2 text-dark bg-transparent border-dark hover-login-btn"
              style={{ borderRadius: "6px", fontSize: "0.95rem", fontWeight: "500", border: "1px solid #111" }}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="btn text-white px-4 py-2 border-0 btn-orange-action shadow-none"
              style={{ backgroundColor: "#f57c00", borderRadius: "6px", fontSize: "0.95rem", fontWeight: "500" }}
            >
              Sign up
            </Link>
          </div>

        </div>
      </div>

      {/* Embedded CSS Style Engine */}
      <style>{`
        .custom-navbar-wrapper {
          min-height: 72px;
        }
        .bg-input-pill {
          background-color: #f5f5f5;
          border-color: #e2e2e2 !important;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .bg-input-pill:focus-within {
          border-color: #b5b5b5 !important;
          background-color: #ffffff;
        }
        .custom-placeholder-fix::placeholder {
          color: #9e9e9e !important;
        }
        .hover-login-btn:hover {
          background-color: #f5f5f5 !important;
        }
        .btn-orange-action:hover {
          background-color: #e67200 !important;
        }

        /* Support for global dark/light theme triggers */
        [data-theme="dark"] .custom-navbar-wrapper {
          background-color: #1a1a1a !important;
          border-color: #2d2d2d !important;
        }
        [data-theme="dark"] .custom-brand-text {
          color: #ffffff !important;
        }
        [data-theme="dark"] .bg-input-pill {
          background-color: #2b2b2b;
          border-color: #444444 !important;
        }
        [data-theme="dark"] .bg-input-pill input,
        [data-theme="dark"] .bg-input-pill select {
          color: #ffffff !important;
        }
        [data-theme="dark"] .hover-login-btn {
          color: #ffffff !important;
          border-color: #ffffff !important;
        }
        [data-theme="dark"] .hover-login-btn:hover {
          background-color: #2b2b2b !important;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;