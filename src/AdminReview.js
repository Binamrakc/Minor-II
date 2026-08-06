import React, { useEffect, useState } from "react";

export default function AdminReview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null); // event shown in the detail modal

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/admin/review", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        // No client-side status filter needed — the backend already
        // returns only pending listings.
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message || "Failed to load pending listings"))
      .finally(() => setLoading(false));
  }, []);

  const review = async (id, action) => {
    try {
      const res = await fetch("http://localhost:8080/admin/review", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ id, action }) // matches ReviewRequest{ID, Action}
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Failed to ${action} listing`);
      }
      setEvents((prev) => prev.filter((e) => e.id !== id));
      // Close the modal if the reviewed listing was open in it
      setSelected((prev) => (prev && prev.id === id ? null : prev));
    } catch (err) {
      setError(err.message || `Failed to ${action} listing`);
    }
  };

  const handleApprove = (id) => review(id, "accept");
  const handleReject = (id) => review(id, "reject");

  // model.Listing's json tags: id, title, description, propertytype, price,
  // listingtype, propertystatus, status, address, city, date, image.
  // event.image is Imageurl — a JSON-encoded array string (see CreateEvent's
  // imageJSON), so it still needs parsing even though the tag is singular.
  const getImages = (event) => {
    try {
      const urls = JSON.parse(event.image || "[]");
      return Array.isArray(urls) ? urls : [];
    } catch {
      return [];
    }
  };

  const resolveUrl = (img) =>
    img.startsWith("http") ? img : `http://localhost:8080${img}`;

  if (loading) return <div className="container mt-4">Loading…</div>;

  return (
    <div className="container mt-4">
      <h3>Pending Listings</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && events.length === 0 && <p className="text-muted">No pending listings.</p>}
      <div className="row">
        {events.map((event) => {
          const images = getImages(event);
          const img = images[0] || null;
          return (
            <div className="col-lg-4 mb-4" key={event.id}>
              <div className="card shadow-sm h-100">
                {img && (
                  <img
                    src={resolveUrl(img)}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: 200 }}
                    alt=""
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <span className="badge bg-warning text-dark align-self-start">
                    {event.propertytype}
                  </span>
                  <h5 className="mt-2">{event.title}</h5>
                  <p className="mb-1">{event.description}</p>
                  <p className="text-muted small">
                    {event.address}, {event.city} — {event.price}
                  </p>
                  <div className="mt-auto d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setSelected(event)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprove(event.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(event.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop show"
            onClick={() => setSelected(null)}
          />
          {/* Modal */}
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            onClick={() => setSelected(null)}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selected.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelected(null)}
                  />
                </div>
                <div className="modal-body">
                  {getImages(selected).length > 0 && (
                    <div className="row mb-3">
                      {getImages(selected).map((src, i) => (
                        <div className="col-6 col-md-3 mb-2" key={i}>
                          <img
                            src={resolveUrl(src)}
                            alt={`${selected.title} ${i + 1}`}
                            className="img-fluid rounded"
                            style={{ objectFit: "cover", height: 100, width: "100%" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <dl className="row mb-0">
                    <dt className="col-sm-4">Property type</dt>
                    <dd className="col-sm-8">{selected.propertytype}</dd>

                    <dt className="col-sm-4">Listing type</dt>
                    <dd className="col-sm-8">{selected.listingtype}</dd>

                    <dt className="col-sm-4">Price</dt>
                    <dd className="col-sm-8">{selected.price}</dd>

                    <dt className="col-sm-4">Property status</dt>
                    <dd className="col-sm-8">{selected.propertystatus}</dd>

                    <dt className="col-sm-4">Review status</dt>
                    <dd className="col-sm-8">{selected.status}</dd>

                    <dt className="col-sm-4">Address</dt>
                    <dd className="col-sm-8">{selected.address}</dd>

                    <dt className="col-sm-4">City</dt>
                    <dd className="col-sm-8">{selected.city}</dd>

                    {selected.date && (
                      <>
                        <dt className="col-sm-4">Date</dt>
                        <dd className="col-sm-8">{selected.date}</dd>
                      </>
                    )}

                    <dt className="col-sm-4">Description</dt>
                    <dd className="col-sm-8">{selected.description}</dd>
                  </dl>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={() => handleApprove(selected.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(selected.id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}