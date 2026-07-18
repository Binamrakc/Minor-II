import React from "react";
import { Link } from "react-router-dom";

function Settings() {
  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar already exists */}
        {/* Main Content */}
        <div className="col-lg-10 p-4">

          <h2 className="mb-4">Settings</h2>

          <div className="row g-4">

            {/* About User */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">About User</h5>
                  <p className="card-text">
                    View your profile information and account details.
                  </p>
             <Link to="/profile">     <button className="btn btn-primary">
                    View Profile
                  </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <p className="card-text">
                    Update your account password securely.
                  </p>
              <Link to="/change-password"> <button className="btn btn-warning">
                    Change Password
                  </button>
                  </Link> 
                </div>
              </div>
            </div>

            {/* Theme Mode */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Theme Mode</h5>
                  <p className="card-text">
                    Switch between light and dark mode.
                  </p>

                  <button className="btn btn-dark me-2">
                    Dark Mode
                  </button>

                  <button className="btn btn-light border">
                    Light Mode
                  </button>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-danger">Logout</h5>
                  <p className="card-text">
                    Sign out from your account.
                  </p>
                  <button className="btn btn-danger">
                    Logout
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;