import React from "react";

function EventCard({ image, title, description, category, date }) {
  return (
    <div className="card shadow-sm border-0" style={{ maxWidth: "420px" }}>
      <img
        src={image}
        className="card-img-top"
        alt="event"
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body">

        {/* Category + Date */}
        <div className="d-flex justify-content-between mb-2">
          <span className="badge bg-danger">{category}</span>
          <small className="text-muted">{date}</small>
        </div>

        <h5 className="card-title fw-bold">{title}</h5>

        <p className="card-text text-muted">
          {description}
        </p>

        <button className="btn btn-primary">
          View Details
        </button>

      </div>
    </div>
  );
}

export default EventCard;