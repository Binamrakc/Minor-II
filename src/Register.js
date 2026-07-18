import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
function RegisterPage() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    age: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    if (registerData.password !== confirmPassword) {
      setStatus({
        type: "danger",
        msg: "Passwords do not match",
      });
      return;
    }

    try {
      const payload = {
        ...registerData,
        phone: parseInt(registerData.phone, 10),
        age: parseInt(registerData.age, 10)
      };

      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          type: "danger",
          msg: data.message || "Registration failed!",
        });
        return;
      }

      setStatus({
        type: "success",
        msg: "Registered successfully!",
      });

      setRegisterData({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        age: ""
      });
      setConfirmPassword("");

    } catch (err) {
      setStatus({
        type: "danger",
        msg: "Backend not reachable (check server/CORS)."
      });
    }
  };

  return (
    <div 
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
      style={{ backgroundColor: "#5e17eb", padding: "20px" }}
    >
      <div 
        className="card border-0 shadow-lg row flex-row overflow-hidden position-relative" 
        style={{ 
          width: "100%", 
          maxWidth: "1000px", 
          borderRadius: "30px", 
          backgroundColor: "#ffffff",
          minHeight: "650px"
        }}
      >
        {/* Left Section: Illustration & Graphics Placeholder */}
        <div 
          className="col-lg-6 d-none d-lg-flex flex-column align-items-center justify-content-center position-relative"
          style={{ 
            backgroundColor: "#f4f3ff", 
            backgroundImage: "radial-gradient(circle at 20% 30%, #e2dcff 0%, transparent 40%), radial-gradient(circle at 75% 80%, #e8e4ff 0%, transparent 35%)"
          }}
        >
          {/* Main Visual Placeholder */}
          <div className="text-center p-5 z-2">
            <div 
              className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm mb-4"
              style={{ width: "100px", height: "100px" }}
            >
              <i className="bi bi-person-plus-fill" style={{ fontSize: "3rem", color: "#5e17eb" }}></i>
            </div>
            <h3 style={{ color: "#0b1354", fontWeight: "700" }}>Join Us Today</h3>
            <p className="text-muted px-4">Create your account to unlock all features and start managing your workspace.</p>
          </div>

          {/* Floating decorative elements matching the image context */}
          <div className="position-absolute rounded shadow-sm opacity-50" style={{ width: "60px", height: "40px", background: "#dcd6ff", top: "15%", left: "10%", transform: "skewY(-10deg)" }}></div>
          <div className="position-absolute rounded shadow-sm opacity-50" style={{ width: "80px", height: "50px", background: "#e6e2ff", bottom: "12%", right: "8%", transform: "skewY(15deg)" }}></div>
        </div>

        {/* Right Section: Interactive Registration Form */}
        <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center">
          <div className="w-100" style={{ maxWidth: "420px", margin: "0 auto" }}>
            
            <h2 className="mb-1" style={{ color: "#0b1354", fontWeight: "700", fontSize: "2.2rem" }}>Hello,</h2>
            <h4 className="mb-4" style={{ color: "#0b1354", fontWeight: "600", fontSize: "1.6rem" }}>Create account</h4>

            {status.msg && (
              <div className={`alert alert-${status.type} py-2 small`} role="alert">
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {/* Custom Underlined Inputs matching the image style */}
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control custom-underline-input"
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control custom-underline-input"
                  placeholder="Email Address"
                  value={registerData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="address"
                  className="form-control custom-underline-input"
                  placeholder="Address"
                  value={registerData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-7">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control custom-underline-input"
                    placeholder="Phone"
                    value={registerData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-5">
                  <input
                    type="number"
                    name="age"
                    className="form-control custom-underline-input"
                    placeholder="Age"
                    value={registerData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control custom-underline-input"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control custom-underline-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Action Button */}
              <button 
                type="submit" 
                className="btn w-100 text-white mb-4 shadow-sm"
                style={{ 
                  backgroundColor: "#5c62ec", 
                  borderRadius: "8px", 
                  padding: "11px", 
                  fontWeight: "500",
                  letterSpacing: "0.5px"
                }}
              >
                Sign Up
              </button>
            </form>

            {/* Redirection Layer */}
            <div className="text-start mb-4 small" style={{ color: "#2c336b" }}>
              Already have an account?{" "}
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none fw-bold"
                style={{ color: "#5c62ec", fontSize: "inherit" }}
                onClick={() => navigate("/login")}
              >
                Click here
              </button>
            </div>

            {/* Mobile Stores Downloads Row */}
            <div className="d-flex gap-2 pt-2 border-top justify-content-start">
              <a href="#appstore" className="btn btn-dark d-flex align-items-center bg-black border-0 px-3 py-1" style={{ borderRadius: "6px" }}>
                <i className="bi bi-apple me-2" style={{ fontSize: "1.2rem" }}></i>
                <div className="text-start" style={{ lineHeight: "1" }}>
                  <small style={{ fontSize: "0.6rem", display: "block", color: "#a0a0a0" }}>Download on the</small>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>App Store</span>
                </div>
              </a>
              <a href="#playstore" className="btn btn-dark d-flex align-items-center bg-black border-0 px-3 py-1" style={{ borderRadius: "6px" }}>
                <i className="bi bi-play-btn-fill me-2" style={{ fontSize: "1.2rem", color: "#3bccff" }}></i>
                <div className="text-start" style={{ lineHeight: "1" }}>
                  <small style={{ fontSize: "0.6rem", display: "block", color: "#a0a0a0" }}>GET IT ON</small>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Google Play</span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Embedded page styles to configure the borderless inputs */}
      <style>{`
        .custom-underline-input {
          border: none !important;
          border-bottom: 1px solid #e0e0e0 !important;
          border-radius: 0 !important;
          padding: 10px 4px !important;
          box-shadow: none !important;
          background-color: transparent !important;
          color: #0b1354 !important;
          font-size: 0.95rem;
        }
        .custom-underline-input::placeholder {
          color: #b5b8d1 !important;
          opacity: 1;
        }
        .custom-underline-input:focus {
          border-bottom: 2px solid #5c62ec !important;
        }
        /* Removing browser styling arrows for age input */
        .custom-underline-input[type=number]::-webkit-inner-spin-button, 
        .custom-underline-input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
      `}</style>
    </div>
  );
}

export default RegisterPage;