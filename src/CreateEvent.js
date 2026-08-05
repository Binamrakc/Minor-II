import React from "react";
import { Carousel } from "react-bootstrap";

function PropertyDetails() {
  const property = {
    title: "Luxury Apartment",
    price: "NPR 25,000/month",
    location: "Kathmandu, Nepal",
    description:
      "This beautiful apartment offers spacious rooms, modern facilities, 24-hour security, parking space, and easy access to nearby markets and schools.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    ],
  };

  return (
    <div className="container py-4">

      {/* Top image section */}
      <div className="shadow rounded overflow-hidden mb-4">
        <Carousel>
          {property.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image}
                alt={`Property ${index}`}
                className="w-100"
                style={{
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Overview section */}
      <div className="card shadow border-0">
        <div className="card-body">
          <h2>{property.title}</h2>

          <h4 className="text-success mb-3">
            {property.price}
          </h4>

          <p>
            <strong>Location:</strong> {property.location}
          </p>

          <hr />

          <h4>Overview</h4>

          <p className="text-muted">
            {property.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;