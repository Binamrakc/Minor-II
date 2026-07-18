import React, { useState } from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className="bg-dark text-white vh-100 p-3"
      style={{
        width: collapsed ? "80px" : "220px",
        transition: "0.3s",
      }}
    >
      {/* Toggle Button */}
      <div className="mb-4 text-center">
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
      </div>

      <ul className="nav nav-pills flex-column">

        <li className="nav-item d-flex align-items-center mb-3">
  <Link to="/" className="nav-Link text-white d-flex align-items-center p-0">
    <span className="fs-4">🏠</span>
    {!collapsed && <span className="ms-3">Dashboard</span>}
  </Link>
</li>

        <li className="nav-item d-flex align-items-center mb-3">
            <Link to="/contact"className="nav-Link text-white d-flex align-items-center p-0">
          <span className="fs-4">📞</span>
          {!collapsed && <span className="ms-3">Contact Us</span>}
          </Link>
        </li>

        <li className="nav-item d-flex align-items-center mb-3">
            <Link to="/users"className="nav-Link text-white d-flex align-items-center p-0">
          <span className="fs-4">👤</span>
          {!collapsed && <span className="ms-3">Users</span>}
          </Link>
        </li>
          <li className="nav-item d-flex align-items-center mb-3">
            <Link to="/CreateEvent"className="nav-Link text-white d-flex align-items-center p-0">
          <span className="fs-4">➕</span>
          {!collapsed && <span className="ms-3">CreateEvent</span>}
          </Link>
        </li>
          <li className="nav-item d-flex align-items-center mb-3">
            <Link to="/AdminReview"className="nav-Link text-white d-flex align-items-center p-0">
          <span className="fs-4">🔐</span>
          {!collapsed && <span className="ms-3">AdminReview</span>}
          </Link>
        </li>

      <li className="nav-item d-flex align-items-center mb-3">
            <Link to="/login"className="nav-Link text-white d-flex align-items-center p-0">
          <span className="fs-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in-icon lucide-log-in"><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></svg></span>
          {!collapsed && <span className="ms-3">Login/Register</span>}
          </Link>
        </li>

      
        <li className="nav-item d-flex align-items-center mb-3">
            <Link to="/Setting"className="nav-Link text-white d-flex align-items-center p-0">
          <span className="fs-4">⚙️</span>
          {!collapsed && <span className="ms-3">Settings</span>}
          </Link>
        </li>
      <li className="nav-item d-flex align-items-center mb-3">
            <Link to="/chatbox"className="nav-Link text-white d-flex align-items-center p-0">
          <span className="fs-4">⚙️</span>
          {!collapsed && <span className="ms-3">Chatbox</span>}
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;