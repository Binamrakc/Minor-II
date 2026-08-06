import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EventDescription() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      name: "Ram Sharma",
      message: "The apartment looks wonderful.",
    },
    {
      name: "Sita Thapa",
      message: "Is the parking area available?",
    },
  ]);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:8080/event?id=${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setProperty(data))
      .catch((err) => setError(err.message || "Failed to load property"))
      .finally(() => setLoading(false));
  }, [id]);

  // event.image comes from the backend as a JSON-encoded array string
  // (see CreateEvent's imageJSON), e.g. '["http://localhost:8080/uploads/foo.jpg"]'
  // — not a plain URL — so it must be parsed before use.
  const getImages = (event) => {
    try {
      const urls = JSON.parse(event?.image || "[]");
      return Array.isArray(urls) ? urls : [];
    } catch {
      return [];
    }
  };

  const addComment = () => {
    if (comment.trim() === "") return;

    setComments([
      ...comments,
      {
        name: "Anonymous User",
        message: comment,
      },
    ]);

    setComment("");
  };

  if (loading) return <div className="container py-4">Loading…</div>;

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-4">
        <p>Property not found.</p>
      </div>
    );
  }

  const images = getImages(property);

  return (
    <div className="container py-4">
      {/* Images */}

      <div className="shadow rounded overflow-hidden mb-4">
        {images.length > 0 ? (
          <Carousel>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  alt={property.title}
                  className="d-block w-100"
                  style={{
                    height: "500px",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img
            src="https://picsum.photos/1200/500"
            alt={property.title}
            className="d-block w-100"
            style={{ height: "500px", objectFit: "cover" }}
          />
        )}
      </div>

      {/* Property card */}

      <div className="card border-0 shadow">
        <div className="card-body p-4">
          <h2 className="fw-bold">{property.title}</h2>

          <h4 className="text-success mt-3">{property.price}</h4>

          <p className="mt-3">
            <strong>Location:</strong> {property.address}, {property.city}
          </p>

          <hr />

          {/* Overview */}

          <h3 className="mb-3">Overview</h3>

          <p className="text-muted">{property.description}</p>

          <hr />

          {/* Property details */}

          <h3 className="mb-4">Property Details</h3>

          <div className="row">
            <div className="col-md-3 col-6 mb-3">
              <div className="border rounded p-3 text-center">
                <h6>Property Type</h6>
                <strong>{property.propertytype}</strong>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-3">
              <div className="border rounded p-3 text-center">
                <h6>Listing Type</h6>
                <strong>{property.listingtype}</strong>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-3">
              <div className="border rounded p-3 text-center">
                <h6>Status</h6>
                <strong>{property.propertystatus}</strong>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-3">
              <div className="border rounded p-3 text-center">
                <h6>City</h6>
                <strong>{property.city}</strong>
              </div>
            </div>
          </div>

          <hr />

          {/* Enquiry button */}

          <button
            className="btn btn-primary px-4"
            onClick={() => navigate("/contact")}
          >
            Make Enquiry
          </button>

          <hr className="my-4" />

          {/* Comments section */}

          <h3 className="mb-4">Comments</h3>

          <textarea
            className="form-control"
            rows="4"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button className="btn btn-success mt-3 mb-4" onClick={addComment}>
            Post Comment
          </button>

          {comments.map((item, index) => (
            <div className="card mb-3 shadow-sm" key={index}>
              <div className="card-body">
                <h6 className="fw-bold">{item.name}</h6>
                <p className="mb-0 text-muted">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventDescription;