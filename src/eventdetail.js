import React from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PropertyDetails() {
  const navigate = useNavigate();

  const property = {
    title: "Luxury Apartment",
    price: "NPR 25,000/month",
    location: "Kathmandu, Nepal",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    area: "1500 sq. ft.",

    description:
      "This luxurious apartment offers a spacious living room, a modern kitchen, comfortable bedrooms, attached bathrooms, and a private balcony with a beautiful city view. The property is located in a peaceful neighborhood close to schools, hospitals, shopping centers, and public transportation.",

    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    ],
  };

  return (
    <div className="container py-4">

      {/* Image section */}

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

      {/* Property information */}

      <div className="card shadow border-0">
        <div className="card-body p-4">

          <h2 className="fw-bold">{property.title}</h2>

          <h4 className="text-success mb-3">
            {property.price}
          </h4>

          <p>
            <strong>Location:</strong> {property.location}
          </p>

          <hr />

          <h3 className="mb-3">Overview</h3>

          <p className="text-muted">
            {property.description}
          </p>

          <hr />

          <h3 className="mb-3">Property Details</h3>

          <div className="row">
            <div className="col-md-3 mb-3">
              <strong>Bedrooms</strong>
              <p>{property.bedrooms}</p>
            </div>

            <div className="col-md-3 mb-3">
              <strong>Bathrooms</strong>
              <p>{property.bathrooms}</p>
            </div>

            <div className="col-md-3 mb-3">
              <strong>Parking</strong>
              <p>{property.parking}</p>
            </div>

            <div className="col-md-3 mb-3">
              <strong>Area</strong>
              <p>{property.area}</p>
            </div>
          </div>

          <hr />

          <h3 className="mb-3">Facilities</h3>

          <ul>
            <li>24-hour security service</li>
            <li>High-speed internet connection</li>
            <li>Water supply</li>
            <li>Nearby schools and hospitals</li>
            <li>Parking area</li>
            <li>Modern kitchen</li>
          </ul>

          <div className="mt-4">
            <button
              className="btn btn-primary px-4"
              onClick={() => navigate("/contact")}
            >
              Make Enquiry
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;