import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Go Backend Base URL
const API_BASE_URL = "http://localhost:8080";

function AuthPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Handle both JSON objects and plain text responses from Go
      let resText = await res.text();
      let data = {};
      try {
        data = JSON.parse(resText);
      } catch {
        data = { message: resText };
      }

      if (!res.ok) {
        setStatus({
          type: "danger",
          msg: data.message || "Login failed! Please check your credentials.",
        });
        setLoading(false);
        return;
      }

      // Save token and user details to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setStatus({
        type: "success",
        msg: "Login successful! Redirecting...",
      });

      setLoginData({
        email: "",
        password: ""
      });

      // Redirect after brief delay
      setTimeout(() => {
        navigate("/"); // Or navigate("/setting")
      }, 1000);

    } catch (err) {
      setStatus({
        type: "danger",
        msg: "Backend not reachable. Ensure Go server is running on http://localhost:8080."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
      style={{ backgroundColor: "#5e17eb", padding: "24px" }}
    >
      <div 
        className="card border-0 shadow-lg overflow-hidden w-100" 
        style={{ 
          maxWidth: "1020px", 
          borderRadius: "32px", 
          backgroundColor: "#ffffff"
        }}
      >
        <div className="row g-0">
          
          {/* Left Section: Illustration Background */}
          <div 
            className="col-lg-6 d-none d-lg-flex flex-column align-items-center justify-content-center position-relative p-5"
            style={{ 
              backgroundColor: "#f4f3ff",
              minHeight: "600px"
            }}
          >
            {/* Custom SVG Illustration */}
            <div className="w-70 text-center mb-4 position-relative" style={{ zIndex: 2 }}>
              <svg width="280" height="240" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="90" r="45" fill="#e2dcff" />
                <circle cx="140" cy="110" r="50" fill="#e8e4ff" />
                <rect x="35" y="40" width="45" height="30" rx="6" fill="#f0ebff" stroke="#cbbfff" strokeWidth="2" />
                <rect x="125" y="45" width="40" height="35" rx="6" fill="#f0ebff" stroke="#cbbfff" strokeWidth="2" />
                <path d="M55 130 C 55 70, 95 70, 95 130" stroke="#5e17eb" strokeWidth="4" strokeLinecap="round" />
                <path d="M110 145 C 110 85, 145 95, 135 155" stroke="#5c62ec" strokeWidth="4" strokeLinecap="round" />
                <circle cx="95" cy="70" r="16" fill="#ffffff" className="shadow-sm" />
                <path d="M91 70 L 94 73 L 99 67" stroke="#5e17eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            <div className="text-center px-4 position-relative" style={{ zIndex: 2 }}>
              <h3 className="fw-bold mb-2" style={{ color: "#0b1354" }}>Welcome to GharBasai</h3>
              <p className="text-muted small">Manage workspaces, connect with your pipeline, and organize operations flawlessly.</p>
            </div>

            {/* Background geometric accents */}
            <div className="position-absolute translate-middle-y" style={{ width: "90px", height: "45px", background: "rgba(220, 214, 255, 0.4)", top: "15%", left: "5%", transform: "rotate(-12deg)", borderRadius: "8px" }}></div>
            <div className="position-absolute" style={{ width: "70px", height: "55px", background: "rgba(230, 226, 255, 0.5)", bottom: "10%", right: "8%", transform: "rotate(18deg)", borderRadius: "8px" }}></div>
          </div>

          {/* Right Section: Form Fields */}
          <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
            <div className="mx-auto w-100" style={{ maxWidth: "400px" }}>
              
              <h2 className="lh-1 mb-1 fw-bold" style={{ color: "#0b1354", fontSize: "2.2rem" }}>Hello,</h2>
              <h4 className="mb-4 fw-normal text-muted" style={{ fontSize: "1.4rem" }}>Welcome back</h4>

              {status.msg && (
                <div className={`alert alert-${status.type} py-2 small`} role="alert">
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control custom-underline-input"
                    placeholder="Email address"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control custom-underline-input"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Styled purple button with loading state */}
                <button 
                  type="submit" 
                  className="btn w-100 text-white mb-3 d-flex align-items-center justify-content-center gap-2"
                  style={{ 
                    backgroundColor: "#5c62ec", 
                    borderRadius: "8px", 
                    padding: "10px", 
                    fontWeight: "500"
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {/* Redirection link */}
              <div className="small mb-4 text-muted">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none fw-bold"
                  style={{ color: "#5c62ec", fontSize: "inherit" }}
                  onClick={() => navigate("/register")}
                >
                  Click here
                </button>
              </div>

             

            </div>
          </div>

        </div>
      </div>

      {/* Underline Styles */}
      <style>{`
        .custom-underline-input {
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-radius: 0 !important;
          padding: 12px 2px !important;
          box-shadow: none !important;
          background-color: transparent !important;
          color: #0b1354 !important;
          font-size: 0.95rem;
        }
        .custom-underline-input::placeholder {
          color: #cbd5e1 !important;
          opacity: 1;
        }
        .custom-underline-input:focus {
          border-bottom: 1.5px solid #5c62ec !important;
        }
      `}</style>
    </div>
  );
}

export default AuthPage;