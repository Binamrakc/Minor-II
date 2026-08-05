import React from "react";
import EventCard from "./Eventcard.js";
import events from "./eventData.js";

function Dashboard() {
  const eventList = events;

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
                id={event.id}
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