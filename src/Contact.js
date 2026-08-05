import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    // Retrieve authentication token
    const token = localStorage.getItem("token"); // or wherever your JWT token is saved

    if (!token) {
      setStatus({ type: "danger", msg: "You must be logged in to send a message." });
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Passes context to Go auth middleware
        },
        body: JSON.stringify({
          email: form.email,
          phone: form.phone,
          description: form.message, // Mapped 'message' to 'description'
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({ type: "danger", msg: data.message || "Failed to submit request." });
        return;
      }

      setStatus({ type: "success", msg: "Inquiry sent successfully!" });
      setForm({ email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ type: "danger", msg: "Backend not reachable (check server/CORS)." });
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row min-vh-50 justify-content-center">
        {/* LEFT SIDE */}
        <div
          className="col-lg-5 text-white p-4 rounded-start"
          style={{
            background: "linear-gradient(135deg, #1f2937, #111827)",
          }}
        >
          <h1 className="mb-4">Contact Ghar Basai</h1>

          <h5>Mailing Address</h5>
          <p>Kathmandu, Nepal</p>
          <p>info@gharbasai.com.np</p>
          <p>+977-1-4528046</p>

          <div className="my-4">
            <iframe
              title="map"
              width="100%"
              height="200"
              style={{ borderRadius: "10px", border: 0 }}
              src="https://maps.google.com/maps?q=kathmandu&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 bg-light p-4 rounded-end">
          {status.msg && (
            <div className={`alert alert-${status.type}`} role="alert">
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label font-weight-bold">Your Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label font-weight-bold">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="+977-9800000000"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label font-weight-bold">Inquiry Message</label>
              <textarea
                className="form-control"
                name="message"
                rows="5"
                placeholder="Write your property inquiry details..."
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button className="btn btn-dark w-100 py-2" type="submit">
              SEND INQUIRY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;