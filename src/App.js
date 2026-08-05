import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Contact from './Contact.js';
import Dashboard from './Dashboard.js';
import EventDescription from './eventdetail.js';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import Users from './Users.js';
import CreateEvent from './CreateEvent.js';
import AdminReview from './AdminReview.js';
import AppSettings from './AppSetting.js';
import AuthPage from './AuthPage.js';
import RegisterPage from './Register.js';
import ViewProfile from './ViewProfile.js';
import ChangePassword from './Password.js';
import AIChatbox from './Chatbox.js';
import AboutPage from './aboutus.js';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = storedUser?.role === "admin" || storedUser?.role === "owner";

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    document.body.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <div 
      className="d-flex flex-column min-vh-100 app-root"
      style={{ 
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        transition: "background-color 0.2s ease, color 0.2s ease" 
      }}
    >
      {/* Pass the theme to the Navbar so it also shifts */}
      <Navbar isDarkMode={isDarkMode} />

      <div className="d-flex flex-grow-1 position-relative">
        
        <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isAdmin={isAdmin} />

        {/* 
          This route body pane forces background changes explicitly 
          so child sub-pages automatically adjust.
        */}
        <div 
          className="flex-grow-1 w-100 p-3 p-md-4 pt-5 pt-lg-4 overflow-x-hidden"
          style={{ 
            backgroundColor: "var(--bg)",
            color: "var(--text)",
            transition: "background-color 0.2s ease, color 0.2s ease"
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
            <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
            <Route path="/eventdetail/:id" element={<EventDescription isDarkMode={isDarkMode} />} />
            <Route path="/users" element={isAdmin ? <Users isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
            <Route path="/CreateEvent" element={<CreateEvent isDarkMode={isDarkMode} />} />
            <Route path="/AdminReview" element={isAdmin ? <AdminReview isDarkMode={isDarkMode} /> : <Navigate to="/" replace />} />
            <Route path="/login" element={<AuthPage isDarkMode={isDarkMode} />} />
            <Route path="/register" element={<RegisterPage isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} />} />
            <Route path="/setting" element={<AppSettings isDarkMode={isDarkMode} />} />
            <Route path="/profile" element={<ViewProfile isDarkMode={isDarkMode} />} />
            <Route path="/change-password" element={<ChangePassword isDarkMode={isDarkMode} />} />
            <Route path="/email" element={<ChangePassword isDarkMode={isDarkMode} />} />
          </Routes>
          
          <AIChatbox isDarkMode={isDarkMode} />
        </div>

      </div>
    </div>
  );
}

export default App;