import React, { useEffect, useState } from "react";

export default function AdminReview() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/events", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {
        const pending = Array.isArray(data)
          ? data.filter(e => (e.status || "").toLowerCase() === "pending")
          : [];
        setEvents(pending);
      });
  }, []);

  const handleApprove = async (id) => {
    await fetch(`http://localhost:8080/events/${id}/approve`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:8080/admin/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>Pending Events</h3>

      <div className="row">
        {events.map(event => (
          <div className="col-lg-4 mb-4" key={event.id}>
            <div className="card shadow-sm">
              <img
                src={`http://localhost:8080${event.image}`}
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <span className="badge bg-warning text-dark">
                  {event.category}
                </span>

                <h5 className="mt-2">{event.title}</h5>
                <p>{event.description}</p>

                <button
                  className="btn btn-success me-2"
                  onClick={() => handleApprove(event.id)}
                >
                  Accept
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleReject(event.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}