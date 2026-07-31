import React, { useState } from "react";
import EventCard from "./Eventcard.js";

function Dashboard() {
  const [events] = useState([
    {
      id: 1,
      title: "Sample Event 1",
      description: "This is a dummy description for testing the frontend layout.",
      category: "Workshop",
      date: "2026-08-10",
      image: ""
    },
    {
      id: 2,
      title: "Sample Event 2",
      description: "Another sample description to display event card details properly.",
      category: "Seminar",
      date: "2026-08-15",
      image: ""
    }
  ]);

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
                image={event.image ? event.image : "https://picsum.photos/500/300"}
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