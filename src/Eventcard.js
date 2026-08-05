import React from "react";
import { useNavigate } from "react-router-dom";

function EventCard({ id, image, title, description, category, date }) {
  const navigate = useNavigate();
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

        <button className="btn btn-primary" onClick={() => navigate(`/eventdetail/${id}`)}>
          View Details
        </button>

      </div>
    </div>
  );
}

export default EventCard;