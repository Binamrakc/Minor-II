import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isDarkMode, setIsDarkMode, isAdmin }) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false); // Handles desktop collapsed state
  const [mobileOpen, setMobileOpen] = useState(false);   // Handles mobile open state

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Trigger Navbar (Visible only on mobile viewports) */}
      <div className="d-lg-none bg-dark text-white p-3 d-flex align-items-center justify-content-between w-100 position-fixed top-0 start-0 z-3 shadow">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-primary rounded-circle" style={{ width: "32px", height: "32px" }}></div>
          <span className="fw-semibold small text-white">Hello, User</span>
        </div>
        <button 
          className="btn text-white p-0 border-0" 
          onClick={() => setMobileOpen(true)}
        >
          <i className="bi bi-list fs-3"></i>
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 z-3"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Base Container */}
      <div
        className="d-flex flex-column h-100 position-fixed position-lg-sticky top-0 start-0 z-3 z-lg-1 border-end shadow-sm"
        style={{
          width: mobileOpen ? "260px" : (isCollapsed ? "80px" : "260px"),
          minWidth: mobileOpen ? "260px" : (isCollapsed ? "80px" : "260px"),
          transition: "width 0.25s ease, min-width 0.25s ease, transform 0.3s ease, background-color 0.2s ease",
          backgroundColor: isDarkMode ? "#131313" : "#ffffff",
          borderColor: isDarkMode ? "#222222" : "#f0f0f0",
          transform: mobileOpen ? "translateX(0)" : "", // Driven by desktop media query layout
        }}
        id="responsive-sidebar"
      >
        {/* Profile Header Block */}
        <div 
          className={`p-3 d-flex align-items-center border-bottom justify-content-between ${isCollapsed ? "justify-content-center px-2" : "px-4"}`}
          style={{ borderColor: isDarkMode ? "#222222" : "#f8f9fa", minHeight: "80px" }}
        >
          <div className="d-flex align-items-center gap-3 overflow-hidden">
            <div 
              className="rounded-circle bg-primary overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center text-white fw-bold" 
              style={{ width: "42px", height: "42px", background: "linear-gradient(135deg, #007bff, #5e17eb)" }}
            >
              U
            </div>
            {(!isCollapsed || mobileOpen) && (
              <div className="text-truncate">
                <div className="small text-muted lh-1 mb-1" style={{ fontSize: "0.75rem" }}>Hello,</div>
                <div className="fw-bold text-truncate" style={{ color: isDarkMode ? "#ffffff" : "#111111", fontSize: "0.9rem" }}>
                  Adiwara Bestari
                </div>
              </div>
            )}
          </div>

          {/* Toggle Trigger Arrow Button (Desktop Side Expansion Control) */}
          <button 
            className="btn p-1 border-0 d-none d-lg-inline-flex rounded-circle hover-bg-toggle" 
            style={{ color: isDarkMode ? "#888" : "#aaa" }}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i className={`bi bi-chevron-${isCollapsed ? "right" : "left"} fs-6`}></i>
          </button>

          {/* Close Panel Button (Mobile view specific) */}
          <button 
            className="btn p-0 border-0 d-lg-none" 
            style={{ color: isDarkMode ? "#666" : "#aaa" }}
            onClick={() => setMobileOpen(false)}
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        {/* Theme Switching Widget Panel */}
        <div className={`pt-4 pb-2 ${isCollapsed ? "px-2 text-center" : "px-4"}`}>
          {isCollapsed && !mobileOpen ? (
            <button
              className="btn p-0 border-0"
              style={{ color: isDarkMode ? "#ffc107" : "#5e17eb" }}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <i className={`bi bi-${isDarkMode ? "moon-stars" : "sun"} fs-4`}></i>
            </button>
          ) : (
            <>
              <div className="small text-muted mb-2 fw-medium" style={{ fontSize: "0.75rem" }}>Theme</div>
              <div className="p-1 d-flex rounded-3" style={{ backgroundColor: isDarkMode ? "#1d1d1d" : "#f4f4f4" }}>
                <button 
                  className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-2 border-0 py-1 ${!isDarkMode ? "bg-white text-dark shadow-sm fw-medium" : "text-muted"}`}
                  style={{ borderRadius: "6px", fontSize: "0.8rem" }}
                  onClick={() => setIsDarkMode(false)}
                >
                  <i className="bi bi-sun"></i> Light
                </button>
                <button 
                  className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-2 border-0 py-1 ${isDarkMode ? "bg-dark text-white shadow-sm fw-medium" : "text-muted"}`}
                  style={{ borderRadius: "6px", fontSize: "0.8rem" }}
                  onClick={() => setIsDarkMode(true)}
                >
                  <i className="bi bi-moon-stars"></i> Dark
                </button>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Nav Item List */}
        <div className={`flex-grow-1 py-3 overflow-y-auto ${isCollapsed ? "px-2" : "px-3"}`}>
          <ul className="nav nav-pills flex-column gap-1">
            
            {[
              { path: "/", label: "Dashboard", icon: "house" },
              { path: "/contact", label: "Contact Us", icon: "telephone" },
              { path: "/CreateEvent", label: "Create Event", icon: "plus-circle" },
              ...(isAdmin ? [
                { path: "/users", label: "Users", icon: "person" },
                { path: "/AdminReview", label: "Admin Review", icon: "shield-check" },
              ] : []),
              { path: "/Setting", label: "Settings", icon: "gear" },
            ].map((item) => {
              const active = isActive(item.path);
              return (
                <li className="nav-item" key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`nav-link d-flex align-items-center px-3 py-2 fw-medium border-0 transition-all ${active ? "active-pill" : ""} ${isCollapsed ? "justify-content-center px-2" : "gap-3"}`}
                    style={{ 
                      color: active ? "#5e17eb" : (isDarkMode ? "#a0a0a0" : "#555555"),
                      fontSize: "0.95rem"
                    }}
                    title={isCollapsed ? item.label : ""}
                    onClick={() => setMobileOpen(false)}
                  >
                    <i className={`bi bi-${item.icon}${active ? "-fill" : ""} fs-5`}></i>
                    {(!isCollapsed || mobileOpen) && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}

          </ul>
        </div>

        {/* Global Footer Logout Block */}
        <div className={`p-3 border-top ${isCollapsed ? "text-center" : ""}`} style={{ borderColor: isDarkMode ? "#222222" : "#f8f9fa" }}>
          <Link 
            to="/login" 
            className={`nav-link d-flex align-items-center fw-semibold border-0 rounded-3 text-danger ${isCollapsed ? "justify-content-center p-2" : "gap-3 px-3 py-2"}`}
            style={{ fontSize: "0.95rem" }}
            title={isCollapsed ? "Logout" : ""}
            onClick={() => setMobileOpen(false)}
          >
            <i className="bi bi-box-arrow-right fs-5"></i>
            {(!isCollapsed || mobileOpen) && <span>Logout</span>}
          </Link>
        </div>

      </div>

      {/* Embedded CSS Engine Rules */}
      <style>{`
        /* Mobile Breakpoint Configurations */
        @media (max-width: 991.98px) {
          #responsive-sidebar {
            transform: ${mobileOpen ? "translateX(0)" : "translateX(-100%)"} !important;
            position: fixed !important;
            z-index: 1050 !important;
            width: 260px !important;
            min-width: 260px !important;
          }
        }
        
        /* Desktop Base Overrides */
        @media (min-width: 992px) {
          #responsive-sidebar {
            transform: none !important;
            position: sticky !important;
          }
        }

        .nav-link {
          background: transparent !important;
          border-radius: 8px;
          transition: background 0.15s ease, color 0.15s ease, padding 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          background-color: ${isDarkMode ? "#1d1d1d" : "#f8f9fa"} !important;
        }

        .active-pill {
          background-color: ${isDarkMode ? "#281b4d" : "#f4efff"} !important;
          color: #5e17eb !important;
        }

        .hover-bg-toggle {
          transition: background-color 0.2s;
        }
        .hover-bg-toggle:hover {
          background-color: ${isDarkMode ? "#292929" : "#f0f0f0"};
        }
      `}</style>
    </>
  );
}

export default Sidebar;