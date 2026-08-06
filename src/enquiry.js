import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Badge,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";

function SellerInquiry() {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInquiries = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view inquiries.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/inquiry", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setError(data.message || "Failed to load inquiries.");
          return;
        }

        // Backend returns: id, email, phone, description, time
        const mapped = (data || []).map((item) => ({
          id: item.id,
          email: item.email,
          phone: item.phone,
          message: item.description,
          date: item.time,
          status: "Pending", // not persisted on backend yet
        }));

        setInquiries(mapped);
      } catch (err) {
        setError("Backend not reachable (check server/CORS).");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

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
    // Status is local-only — no backend endpoint to persist it yet
    alert("Status updated (not yet saved to backend).");
    setSelectedInquiry(null);
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Customer Inquiries</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="bg-white p-4 rounded shadow-sm">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.length === 0 && !error ? (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No inquiries yet.
                </td>
              </tr>
            ) : (
              inquiries.map((item) => (
                <tr key={item.id}>
                  <td>{item.email}</td>

                  <td>{item.phone}</td>

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
              ))
            )}
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
                <strong>Email:</strong> {selectedInquiry.email}
              </p>

              <p>
                <strong>Phone:</strong> {selectedInquiry.phone}
              </p>

              <p>
                <strong>Message:</strong> {selectedInquiry.message}
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

                  <option value="Completed">Completed</option>

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
              href={`https://wa.me/${selectedInquiry.phone}?text=Hello, I received your inquiry.`}
              target="_blank"
            >
              WhatsApp
            </Button>
          )}

          <Button variant="primary" onClick={handleSubmit}>
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