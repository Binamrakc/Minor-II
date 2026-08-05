import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Badge,
  Form,
} from "react-bootstrap";

function SellerInquiry() {
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "Ram Sharma",
      email: "ram@gmail.com",
      phone: "9779800000001",
      property: "Luxury Apartment",
      propertyType: "Flat",
      message: "I would like to visit the property.",
      date: "2026-08-05",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sita Thapa",
      email: "sita@gmail.com",
      phone: "9779800000002",
      property: "Modern Villa",
      propertyType: "Villa",
      message: "Is parking available?",
      date: "2026-08-05",
      status: "Completed",
    },
  ]);

  const handleStatusChange = (id, status) => {
    setInquiries((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );

    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({
        ...selectedInquiry,
        status,
      });
    }
  };

  const handleSubmit = () => {
    alert("Status updated successfully.");
    setSelectedInquiry(null);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Customer Inquiries</h2>

      <div className="bg-white p-4 rounded shadow-sm">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td>{item.email}</td>

                <td>
                  <Badge
                    bg={
                      item.status === "Completed"
                        ? "success"
                        : item.status === "Ineligible Inquiry"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {item.status}
                  </Badge>
                </td>

                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedInquiry(item)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        show={selectedInquiry !== null}
        onHide={() => setSelectedInquiry(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Inquiry Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedInquiry && (
            <>
              <p>
                <strong>Name:</strong> {selectedInquiry.name}
              </p>

              <p>
                <strong>Email:</strong> {selectedInquiry.email}
              </p>

              <p>
                <strong>Phone:</strong> {selectedInquiry.phone}
              </p>

              <p>
                <strong>Property:</strong> {selectedInquiry.property}
              </p>

              <p>
                <strong>Property Type:</strong>{" "}
                {selectedInquiry.propertyType}
              </p>

              <p>
                <strong>Message:</strong>{" "}
                {selectedInquiry.message}
              </p>

              <p>
                <strong>Date:</strong> {selectedInquiry.date}
              </p>

              <hr />

              <Form.Group>
                <Form.Label>
                  <strong>Status</strong>
                </Form.Label>

                <Form.Select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedInquiry.id,
                      e.target.value
                    )
                  }
                >
                  <option value="Pending">Pending</option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Ineligible Inquiry">
                    Ineligible Inquiry
                  </option>
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          {selectedInquiry && (
            <Button
              variant="success"
              href={`https://wa.me/${selectedInquiry.phone}?text=Hello ${selectedInquiry.name}, I received your inquiry regarding the ${selectedInquiry.property}.`}
              target="_blank"
            >
             
            </Button>
          )}

          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <Button
            variant="secondary"
            onClick={() => setSelectedInquiry(null)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SellerInquiry;