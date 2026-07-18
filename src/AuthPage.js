import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    try {
       const res = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          type: "danger",
          msg: data.message || "Login failed!",
        });
        return;
      }
      localStorage.setItem("token", data.token);
      setStatus({
        type: "success",
        msg: "Login successful!",
      });
localStorage.setItem("user", JSON.stringify(data.user));  
      setLoginData({
        email: "",
        password: ""
      });
      navigate("/profile");
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
        <h2 className="text-center mb-4">Login</h2>

        {status.msg && (
          <div className={`alert alert-${status.type}`} role="alert">
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don’t have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;