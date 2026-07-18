import React, { useEffect, useState } from "react";
import EventCard from "./Eventcard.js";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const API = "http://localhost:8080";

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await fetch(`${API}/dashboard/events`);
        const data = await res.json();

        // Backend can return either:
        // 1) []  (array directly)
        // 2) { events: [] }
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (data && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          console.log("Unexpected response from /dashboard/events:", data);
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch approved events:", err);
        setEvents([]);
      }
    };

    fetchApproved();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Current Events</h2>

      <div className="row g-4">
        {events.length === 0 ? (
          <p>No approved events yet.</p>
        ) : (
          events.map((event) => (
            <div className="col-md-4" key={event.id}>
              <EventCard
                image={event.image ? `${API}${event.image}` : "https://picsum.photos/500/300"}
                title={event.title}
                description={event.description}
                category={event.category}
                date={event.date}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;