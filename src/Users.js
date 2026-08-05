import React, { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Status ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this user?")) return;

    fetch(`http://localhost:8080/admin/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Status ${res.status}: ${text}`);
        }
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err.message));
  };

  const openEdit = (user) => setEditingUser({ ...user });
  const cancelEdit = () => setEditingUser(null);

  const handleEditField = (field, value) => {
    setEditingUser((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (!editingUser) return;
    setSavingId(editingUser.id);

    fetch(`http://localhost:8080/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: editingUser.id,
        name: editingUser.name,
        address: editingUser.address,
        phone: editingUser.phone,
        age: Number(editingUser.age),
        status: editingUser.status,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Status ${res.status}: ${text}`);
        }
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...editingUser } : u))
        );
        setEditingUser(null);
      })
      .catch((err) => console.error("Error updating user:", err.message))
      .finally(() => setSavingId(null));
  };

  return (
    <div className="col-lg-10 mt-4">
      <h3 className="mb-4">Users List</h3>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th style={{ width: "200px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "admin"
                          ? "bg-success"
                          : user.status === "seller"
                          ? "bg-info text-dark"
                          : "bg-primary"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => openEdit(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingUser && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5 className="mb-3">Edit User</h5>

              <div className="mb-2">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={editingUser.name || ""}
                  onChange={(e) => handleEditField("name", e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Address</label>
                <input
                  className="form-control"
                  value={editingUser.address || ""}
                  onChange={(e) => handleEditField("address", e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  value={editingUser.phone || ""}
                  onChange={(e) => handleEditField("phone", e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  value={editingUser.age || ""}
                  onChange={(e) => handleEditField("age", e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={editingUser.status}
                  onChange={(e) => handleEditField("status", e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  disabled={savingId === editingUser.id}
                  onClick={saveEdit}
                >
                  {savingId === editingUser.id ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users