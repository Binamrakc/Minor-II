import React, { useEffect, useState } from "react";

function ViewProfile() {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);

  useEffect(() => {

    if (!storedUser) return;

    fetch(`http://localhost:8080/profile/${storedUser.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => console.log("Failed to load profile"));

  }, []);

  if (!profile) {
    return <div className="container mt-5">Loading profile...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4">My Profile</h2>

        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.gmail}</p>
        <p><strong>ID:</strong> {profile.id}</p>

      </div>
    </div>
  );
}

export default ViewProfile;