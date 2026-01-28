import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/admin/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>👥 Manage Users</h2>
        <p style={styles.subHeading}>
          Admin can view and delete users (except admin accounts).
        </p>

        <Link to="/admin" style={styles.backLink}>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {loading ? (
          <div style={styles.loadingBox}>Loading users...</div>
        ) : users.length === 0 ? (
          <div style={styles.emptyBox}>
            <h3 style={styles.emptyTitle}>No Users Found</h3>
            <p style={styles.emptyText}>No user has registered yet.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {users.map((u) => (
              <div key={u._id} style={styles.card}>
                <div style={styles.userTop}>
                  <div style={styles.userAvatar}>
                    {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={styles.userName}>{u.name || "Unnamed User"}</h3>
                    <p style={styles.userEmail}>{u.email}</p>
                  </div>

                  <span style={styles.roleBadge}>{u.role}</span>
                </div>

                {u.role !== "admin" ? (
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(u._id)}
                  >
                    🗑️ Delete User
                  </button>
                ) : (
                  <div style={styles.adminNote}>Admin account cannot be deleted</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #0f172a, #0b3d91)",
    paddingBottom: 60,
  },

  header: {
    padding: "45px 30px 20px",
    textAlign: "center",
    color: "#fff",
  },

  heading: {
    fontSize: 34,
    marginBottom: 8,
  },

  subHeading: {
    maxWidth: 650,
    margin: "0 auto",
    opacity: 0.9,
    lineHeight: 1.5,
    marginBottom: 14,
  },

  backLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    opacity: 0.9,
  },

  content: {
    padding: "40px 30px",
    background: "#f9fafb",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: 520,
  },

  loadingBox: {
    padding: 18,
    borderRadius: 14,
    fontWeight: "bold",
    width: "fit-content",
    margin: "0 auto",
    background: "linear-gradient(135deg,#7dd3fc,#38bdf8)",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  },

  emptyBox: {
    maxWidth: 520,
    margin: "0 auto",
    background: "#fff",
    padding: "35px 25px",
    borderRadius: 18,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },

  emptyTitle: {
    fontSize: 22,
    marginBottom: 10,
  },

  emptyText: {
    color: "#555",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 18,
  },

  card: {
    borderRadius: 18,
    background: "#fff",
    padding: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
    border: "1px solid #eee",
  },

  userTop: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    marginBottom: 14,
  },

  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    background: "linear-gradient(135deg,#00d4ff,#0072ff)",
  },

  userName: {
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
  },

  userEmail: {
    margin: 0,
    fontSize: 13,
    color: "#555",
    marginTop: 3,
  },

  roleBadge: {
    padding: "7px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: "bold",
    background: "#eff6ff",
    border: "1px solid #dbeafe",
    color: "#0b3d91",
    textTransform: "capitalize",
  },

  deleteBtn: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
  },

  adminNote: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    textAlign: "center",
    fontWeight: "bold",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    color: "#334155",
  },
};

export default AdminUsers;
