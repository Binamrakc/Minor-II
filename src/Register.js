import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
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
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
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
        password: ""
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
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>

        {status.msg && (
          <div className={`alert alert-${status.type}`} role="alert">
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={registerData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Create Account
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;