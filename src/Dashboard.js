import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "./Eventcard.js";

function Dashboard() {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/dashboard")
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load events"))
      .finally(() => setLoading(false));
  }, []);

  const getFirstImage = (event) => {
    try {
      const urls = JSON.parse(event.image || "[]");
      return Array.isArray(urls) && urls.length > 0 ? urls[0] : null;
    } catch {
      return null;
    }
  };

  // Filter client-side based on navbar's query params.
  // "query" matches title or description; "type" matches category.
  // "price" has no equivalent field on events, so it's ignored here.
  const query = (searchParams.get("query") || "").toLowerCase().trim();
  const type = (searchParams.get("type") || "").toLowerCase().trim();

  const filteredEvents = events.filter((event) => {
    const matchesQuery =
      !query ||
      event.title?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query);

    const matchesType =
      !type || event.category?.toLowerCase() === type;

    return matchesQuery && matchesType;
  });

  if (loading) return <div className="container py-4">Loading…</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Current Events</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {filteredEvents.length === 0 ? (
          <p>{query || type ? "No matching events found." : "No approved events yet."}</p>
        ) : (
          filteredEvents.map((event) => (
            <div className="col-md-4" key={event.id}>
              <EventCard
                id={event.id}
                image={getFirstImage(event) || "https://picsum.photos/500/300"}
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