import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import events from "./eventData.js";

function EventDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventData = events.find((item) => item.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  if (!eventData) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Room details not found.</div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 px-4 px-md-5" style={{ backgroundColor: "#f8f9fb", minHeight: "100vh" }}>
      <div className="row g-4">
        {/* Left: Photo gallery */}
        <div className="col-lg-7">
          <div className="rounded-4 overflow-hidden shadow-sm mb-3 bg-dark" style={{ height: "420px" }}>
            <img
              src={eventData.gallery[activeImage]}
              alt={`${eventData.title} photo ${activeImage + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="d-flex gap-2 flex-wrap">
            {eventData.gallery.map((src, index) => (
              <div
                key={`${src}-${index}`}
                onClick={() => setActiveImage(index)}
                role="button"
                className="rounded-3 overflow-hidden"
                style={{
                  width: "84px",
                  height: "84px",
                  border: index === activeImage ? "2px solid #0d6efd" : "2px solid transparent",
                  cursor: "pointer",
                  opacity: index === activeImage ? 1 : 0.75,
                  transition: "opacity 0.15s ease",
                }}
              >
                <img
                  src={src}
                  alt={`${eventData.title} thumbnail ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Overview details */}
        <div className="col-lg-5">
          <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 h-100">
            <span className="badge bg-danger rounded-pill px-3 py-2 mb-3" style={{ fontSize: "0.8rem" }}>
              {eventData.category}
            </span>

            <h2 className="fw-bold mb-1" style={{ color: "#0b1354" }}>
              {eventData.title}
            </h2>

            <p className="fs-4 fw-semibold text-primary mb-3">
              {eventData.price}
              {eventData.listingtype === "rent" ? " / month" : ""}
            </p>

            <hr className="my-4" />

            <div className="mb-3">
              <h6 className="text-muted text-uppercase small mb-1">Date</h6>
              <p className="mb-0">{eventData.date}</p>
            </div>

            <div className="mb-3">
              <h6 className="text-muted text-uppercase small mb-1">Area</h6>
              <p className="mb-0">{eventData.area}</p>
            </div>

            <div className="mb-3">
              <h6 className="text-muted text-uppercase small mb-1">Rooms</h6>
              <p className="mb-0">{eventData.rooms}</p>
            </div>

            <div className="mb-3">
              <h6 className="text-muted text-uppercase small mb-1">Bathrooms</h6>
              <p className="mb-0">{eventData.bathrooms}</p>
            </div>

            <div className="mb-4">
              <h6 className="text-muted text-uppercase small mb-1">Description</h6>
              <p className="mb-0 text-muted">{eventData.description}</p>
            </div>

            <button
              className="btn btn-primary w-100 py-2 fw-semibold"
              style={{ borderRadius: "8px" }}
              onClick={() => navigate('/contact')}
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDescription;