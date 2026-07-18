import React, { useState } from "react";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    try {
      const res = await fetch(`http://localhost:8080/check-email/${email}`,{
            method: "GET",
     headers: {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token")
}
    });
       const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "danger", msg: "Email not found" });
        return;
      }

      setEmailVerified(true);

    } catch (err) {
      setStatus({
        type: "danger",
        msg: "Server not reachable"
      });
    }
  };

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatus({
        type: "danger",
        msg: "Passwords do not match"
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/change-password", {
        method: "PUT",
        headers: {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token")
},
        body: JSON.stringify({
          email: email,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: "danger",
          msg: data.message || "Password change failed"
        });
        return;
      }

      setStatus({
        type: "success",
        msg: "Password updated successfully"
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {
      setStatus({
        type: "danger",
        msg: "Server error"
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px" }}>
        <h3 className="mb-4">Change Password</h3>

        {status.msg && (
          <div className={`alert alert-${status.type}`}>
            {status.msg}
          </div>
        )}

        {!emailVerified && (
          <form onSubmit={handleEmailCheck}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100">
              Verify Email
            </button>
          </form>
        )}

        {emailVerified && (
          <form onSubmit={handlePasswordUpdate}>

            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="form-control"
                value={passwordData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="form-control"
                value={passwordData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-success w-100">
              Update Password
            </button>

          </form>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;