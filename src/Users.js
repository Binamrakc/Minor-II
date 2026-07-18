import React, { useEffect, useState } from 'react'

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // remove from UI without reload
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="col-lg-10 mt-4">
      <h3 className="mb-4">Users List</h3>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th style={{ width: "180px" }}>Actions</th>
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
                        user.role === "owner"
                          ? "bg-success"
                          : "bg-primary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2">
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
    </div>
  );
}




export default Users
