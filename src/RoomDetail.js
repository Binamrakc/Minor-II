import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import events from './eventData.js';

function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Room details not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        ← Back to listings
      </button>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="ratio ratio-16x9">
              <img
                src={event.gallery[0]}
                className="card-img-top rounded-top"
                alt={event.title}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="card-body">
              <h2 className="fw-bold mb-3">{event.title}</h2>
              <p className="text-muted mb-4">{event.description}</p>

              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge bg-primary">{event.category}</span>
                <span className="badge bg-secondary">{event.price}</span>
                <span className="badge bg-info text-dark">{event.area}</span>
              </div>

              <div className="row mb-4">
                <div className="col-4">
                  <div className="border rounded p-3 text-center">
                    <strong>{event.rooms}</strong>
                    <div className="text-muted">Rooms</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border rounded p-3 text-center">
                    <strong>{event.bathrooms}</strong>
                    <div className="text-muted">Baths</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border rounded p-3 text-center">
                    <strong>{event.date}</strong>
                    <div className="text-muted">Available</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Room Gallery</h5>
                <div className="row g-3">
                  {event.gallery.map((src, index) => (
                    <div className="col-4" key={index}>
                      <img
                        src={src}
                        alt={`${event.title} ${index + 1}`}
                        className="img-fluid rounded"
                        style={{ minHeight: '100px', objectFit: 'cover', width: '100%' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Features</h5>
                <div className="d-flex flex-wrap gap-2">
                  {event.features.map((feature) => (
                    <span key={feature} className="badge bg-light text-dark border">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/contact')}
              >
                More Details
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="mb-3">Overview</h5>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item">Price: {event.price}</li>
              <li className="list-group-item">Rooms: {event.rooms}</li>
              <li className="list-group-item">Bathrooms: {event.bathrooms}</li>
              <li className="list-group-item">Area: {event.area}</li>
              <li className="list-group-item">Available from: {event.date}</li>
            </ul>
            <p className="text-muted">For a faster response, fill out the contact form and mention this listing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
