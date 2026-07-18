import React, { useState } from "react";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("category", formData.category);
    fd.append("date", formData.date);
    fd.append("description", formData.description);
    fd.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:8080/events", {
        method: "POST",
         headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Event saved successfully");

      setFormData({
        title: "",
        category: "",
        date: "",
        description: "",
        image: null,
      });

    } catch (err) {
      console.error(err);
      alert("Error saving event");
    }
  };

  return (
    <div className="col-lg-5 mt-4">
      <h3 className="mb-4">Create Event</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          Save Event
        </button>

      </form>
    </div>
  );
}

export default CreateEvent;