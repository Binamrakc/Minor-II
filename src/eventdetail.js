import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PropertyDetails() {
  const navigate = useNavigate();

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

  const property = {
    title: "Luxury Apartment",
    price: "NPR 25,000/month",
    location: "Kathmandu, Nepal",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    area: "1500 sq. ft.",

    description:
      "This luxurious apartment provides a spacious living room, a modern kitchen, comfortable bedrooms, attached bathrooms, and a private balcony. It is situated in a peaceful environment close to schools, hospitals, supermarkets, and public transportation.",

    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    ],
  };

  return (
    <div className="container py-4">
      {/* Images */}

      <div className="shadow rounded overflow-hidden mb-4">
        <Carousel>
          {property.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image}
                alt="Property"
                className="d-block w-100"
                style={{
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Property card */}

      <div className="card border-0 shadow">
        <div className="card-body p-4">
          <h2 className="fw-bold">{property.title}</h2>

          <h4 className="text-success mt-3">{property.price}</h4>

          <p className="mt-3">
            <strong>Location:</strong> {property.location}
          </p>

          <hr />

          {/* Overview */}

          <h3 className="mb-3">Overview</h3>

          <p className="text-muted">
            {property.description}
          </p>

          <p className="text-muted">
            The apartment offers modern architecture, excellent ventilation,
            natural lighting, and high-quality finishing. Residents can enjoy
            nearby shopping centres, schools, restaurants, and healthcare
            facilities.
          </p>

          <hr />

          {/* Property details */}

          <h3 className="mb-4">Property Details</h3>

          <div className="row">
            <div className="col-md-3 col-6 mb-3">
              <div className="border rounded p-3 text-center">
                <h6>Bedrooms</h6>
                <strong>{property.bedrooms}</strong>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-3">
              <div className="border rounded p-3 text-center">
                <h6>Bathrooms</h6>
                <strong>{property.bathrooms}</strong>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-3">
              <div className="border rounded p-3 text-center">
                <h6>Parking</h6>
                <strong>{property.parking}</strong>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-3">
              <div className="border rounded p-3 text-center">
                <h6>Area</h6>
                <strong>{property.area}</strong>
              </div>
            </div>
          </div>

          <hr />

          {/* Facilities */}

          <h3 className="mb-3">Facilities</h3>

          <div className="row">
            <div className="col-md-6">
              <ul>
                <li>Twenty-four-hour security</li>
                <li>Parking area</li>
                <li>Water supply</li>
              </ul>
            </div>

            <div className="col-md-6">
              <ul>
                <li>High-speed internet</li>
                <li>Modern kitchen</li>
                <li>Nearby hospitals and schools</li>
              </ul>
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

          <button
            className="btn btn-success mt-3 mb-4"
            onClick={addComment}
          >
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

export default PropertyDetails;