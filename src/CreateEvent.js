import React, { useState, useRef } from "react";

const MAX_IMAGES = 4;

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertytype: "apartment",
    price: "",
    listingtype: "sale",
    address: "",
    city: ""
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = MAX_IMAGES - imageFiles.length;
    if (remainingSlots <= 0) {
      setStatus({ type: "danger", msg: `You can only upload up to ${MAX_IMAGES} photos.` });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);
    const validFiles = [];
    const validPreviews = [];

    for (const file of filesToAdd) {
      if (!file.type.startsWith("image/")) {
        setStatus({ type: "danger", msg: "Please select valid image files only." });
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setStatus({ type: "danger", msg: "Each image must be smaller than 5MB." });
        continue;
      }
      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    }

    if (validFiles.length) {
      setImageFiles((prev) => [...prev, ...validFiles]);
      setImagePreviews((prev) => [...prev, ...validPreviews]);
      if (!status.type) setStatus({ type: "", msg: "" });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => {
      if (prev[index]) URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllImages = () => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImageFiles([]);
    setImagePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    // Basic client-side guard so we don't even try an empty/broken submit
    if (!imageFiles.length) {
      // Remove this block if images are optional in your flow
    }

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("propertytype", formData.propertytype);
    fd.append("price", formData.price);
    fd.append("listingtype", formData.listingtype);
    fd.append("address", formData.address);
    fd.append("city", formData.city);
    fd.append("propertystatus", "available");
    fd.append("status", "pending");

    // Append the actual File objects (not the blob preview URLs)
    imageFiles.forEach((file) => {
      fd.append("images", file);
    });

    try {
      const res = await fetch("http://localhost:8080/createevent", {
        method: "POST",
        headers: {
          // Do NOT set Content-Type manually — the browser must add the
          // multipart boundary itself when the body is a FormData instance.
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: fd,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to save property entry.");
      }

      setStatus({
        type: "success",
        msg: "Property listed for approval successfully!"
      });

      setFormData({
        title: "",
        description: "",
        propertytype: "apartment",
        price: "",
        listingtype: "sale",
        address: "",
        city: ""
      });
      handleRemoveAllImages();

    } catch (err) {
      console.error(err);
      setStatus({
        type: "danger",
        msg: err.message || "Error saving property information to database."
      });
    }
  };

  return (
    <div 
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
      style={{ backgroundColor: "#5e17eb", padding: "20px" }}
    >
      <div 
        className="card border-0 shadow-lg row flex-row overflow-hidden position-relative w-100" 
        style={{ 
          maxWidth: "1020px", 
          borderRadius: "32px", 
          backgroundColor: "#ffffff",
          minHeight: "660px"
        }}
      >
        {/* Left Section */}
        <div 
          className="col-lg-6 d-none d-lg-flex flex-column align-items-center justify-content-center position-relative p-5"
          style={{ 
            backgroundColor: "#f4f3ff", 
            backgroundImage: "radial-gradient(circle at 20% 30%, #e2dcff 0%, transparent 40%), radial-gradient(circle at 75% 80%, #e8e4ff 0%, transparent 35%)"
          }}
        >
          <div className="text-center p-4 z-2">
            <svg width="240" height="200" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              <circle cx="100" cy="90" r="70" fill="rgba(94, 23, 235, 0.06)" />
              <rect x="50" y="45" width="100" height="90" rx="12" fill="#ffffff" className="shadow-sm" stroke="#e2dcff" strokeWidth="2"/>
              <path d="M65 85 h70 M65 105 h50" stroke="#5c62ec" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              <circle cx="140" cy="55" r="22" fill="#5e17eb" />
              <path d="M134 55 L138 59 L147 50" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 style={{ color: "#0b1354", fontWeight: "700" }}>List Your Property</h3>
            <p className="text-muted small px-3">Provide precise parameters. Your submission will immediately hit verification queues for evaluation indexing.</p>
          </div>
          
          <div className="position-absolute rounded shadow-sm opacity-50" style={{ width: "60px", height: "40px", background: "#dcd6ff", top: "12%", left: "8%", transform: "skewY(-10deg)" }}></div>
          <div className="position-absolute rounded shadow-sm opacity-50" style={{ width: "80px", height: "50px", background: "#e6e2ff", bottom: "12%", right: "8%", transform: "skewY(15deg)" }}></div>
        </div>

        {/* Right Section: Form Management */}
        <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
          <div className="w-100 mx-auto" style={{ maxWidth: "420px" }}>
            
            <h2 className="mb-1 fw-bold" style={{ color: "#0b1354", fontSize: "2.1rem" }}>New Space,</h2>
            <h4 className="mb-4 text-muted fw-normal" style={{ fontSize: "1.4rem" }}>Add listing data</h4>

            {status.msg && (
              <div className={`alert alert-${status.type} py-2 small`} role="alert">
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Image Upload Section */}
              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="propertyImageInput"
                  disabled={imageFiles.length >= MAX_IMAGES}
                />

                {imagePreviews.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {imagePreviews.map((src, index) => (
                      <div className="position-relative" key={src} style={{ width: "90px", height: "90px" }}>
                        <img
                          src={src}
                          alt={`Property preview ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid #e2e8f0"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="btn btn-sm position-absolute"
                          style={{
                            top: "4px",
                            right: "4px",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "22px",
                            height: "22px",
                            padding: 0,
                            lineHeight: "1",
                            fontSize: "0.8rem"
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {imageFiles.length < MAX_IMAGES && (
                  <label
                    htmlFor="propertyImageInput"
                    className="d-flex flex-column align-items-center justify-content-center w-100"
                    style={{
                      border: "1.5px dashed #cbd5e1",
                      borderRadius: "12px",
                      padding: "20px",
                      cursor: "pointer",
                      color: "#94a3b8",
                      fontSize: "0.85rem"
                    }}
                  >
                    <i className="bi bi-image me-2" style={{ fontSize: "1.4rem", color: "#5c62ec" }}></i>
                    {imagePreviews.length === 0
                      ? `Click to upload up to ${MAX_IMAGES} property photos`
                      : `Add more (${MAX_IMAGES - imageFiles.length} left)`}
                  </label>
                )}
              </div>
              
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control custom-underline-input"
                  placeholder="Property Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row mb-3 g-3">
                <div className="col-6">
                  <select
                    name="propertytype"
                    className="form-select custom-underline-input"
                    value={formData.propertytype}
                    onChange={handleChange}
                    required
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="office">Office</option>
                  </select>
                </div>
                
                <div className="col-6">
                  <select
                    name="listingtype"
                    className="form-select custom-underline-input"
                    value={formData.listingtype}
                    onChange={handleChange}
                    required
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  name="price"
                  className="form-control custom-underline-input"
                  placeholder="Price Amount"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row mb-3 g-3">
                <div className="col-7">
                  <input
                    type="text"
                    name="address"
                    className="form-control custom-underline-input"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    name="city"
                    className="form-control custom-underline-input"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <textarea
                  name="description"
                  className="form-control custom-underline-input"
                  placeholder="Comprehensive description of architectural details..."
                  rows="2"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn w-100 text-white shadow-sm mt-2"
                style={{ 
                  backgroundColor: "#5c62ec", 
                  borderRadius: "8px", 
                  padding: "11px", 
                  fontWeight: "500",
                  letterSpacing: "0.5px"
                }}
              >
                Submit Listing
              </button>
            </form>

            <div className="d-flex gap-2 pt-4 border-top justify-content-start mt-4">
              <div className="btn btn-dark d-flex align-items-center bg-black border-0 px-3 py-1 opacity-70" style={{ borderRadius: "6px", cursor: "default" }}>
                <i className="bi bi-apple me-2" style={{ fontSize: "1.2rem" }}></i>
                <div className="text-start" style={{ lineHeight: "1" }}>
                  <small style={{ fontSize: "0.55rem", display: "block", color: "#a0a0a0" }}>Download on the</small>
                  <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>App Store</span>
                </div>
              </div>
              <div className="btn btn-dark d-flex align-items-center bg-black border-0 px-3 py-1 opacity-70" style={{ borderRadius: "6px", cursor: "default" }}>
                <i className="bi bi-google-play me-2" style={{ fontSize: "1.1rem", color: "#3bccff" }}></i>
                <div className="text-start" style={{ lineHeight: "1" }}>
                  <small style={{ fontSize: "0.55rem", display: "block", color: "#a0a0a0" }}>GET IT ON</small>
                  <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>Google Play</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .custom-underline-input {
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-radius: 0 !important;
          padding: 10px 2px !important;
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
        select.custom-underline-input {
          cursor: pointer;
          color: #4a5568 !important;
        }
        .custom-underline-input[type=number]::-webkit-inner-spin-button, 
        .custom-underline-input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
      `}</style>
    </div>
  );
}

export default CreateEvent;