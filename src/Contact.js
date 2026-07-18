import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", msg: "" }); // optional feedback

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    try {
      const res = await fetch("http://localhost:8080/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

    

      if (!res.ok) {
        setStatus({ type: "danger", msg: data.error || "Submit failed" });
        return;
      }

      setStatus({ type: "success", msg: "Message sent successfully!" });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "danger", msg: "Backend not reachable (check server/CORS)." });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-50">
        {/* LEFT SIDE */}
        <div
          className="col-lg-5 text-white p-3 mx-2"
          style={{
            background: "linear-gradient(135deg, #2c2c94, #3498db)",
          }}
        >
          <h1 className="mb-4">Contact Us</h1>

          <h5>Mailing Address</h5>
          <p>524, Dasrath Chand Marga, Baluwatar, Kathmandu</p>
          <p>info@vogue.com.np</p>
          <p>+977-1-4528046</p>

          <div className="my-4">
            <iframe
              title="map"
              width="100%"
              height="200"
              style={{ borderRadius: "10px" }}
              src="https://maps.google.com/maps?q=kathmandu&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>

          <h5>Social Media Profiles</h5>
          <div className="d-flex gap-3 mt-3">
            <div className="bg-primary rounded-circle px-3 py-2">F</div>
            <div className="bg-dark rounded-circle px-3 py-2">I</div>
            <div className="bg-info rounded-circle px-3 py-2">L</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 bg-light p-5">
          {/* status message */}
          {status.msg && (
            <div className={`alert alert-${status.type}`} role="alert">
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone Number (Optional)"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <textarea
                className="form-control"
                name="message"
                rows="5"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button className="btn btn-dark w-100" type="submit">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;