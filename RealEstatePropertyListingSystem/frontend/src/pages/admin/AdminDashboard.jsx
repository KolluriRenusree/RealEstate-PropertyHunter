import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Admin Dashboard 🛡️</h2>
        <p style={styles.subHeading}>
          Welcome back <strong>{user?.email}</strong>
        </p>
      </div>

      {/* Profile Card */}
      <div style={styles.profileCard}>
        <h3 style={styles.cardTitle}>Admin Info</h3>

        <div style={styles.profileGrid}>
          <p style={styles.infoText}>
            <strong>Email:</strong> {user?.email}
          </p>
          <p style={styles.infoText}>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <Link to="/admin/users" style={styles.link}>
          <div style={{ ...styles.actionCard, ...styles.cardSkyBlue }}>
            <h4 style={styles.actionTitle}>👥 Manage Users</h4>
            <p style={styles.actionText}>
              View, monitor and manage platform users.
            </p>
          </div>
        </Link>

        <Link to="/admin/properties" style={styles.link}>
          <div style={{ ...styles.actionCard, ...styles.cardBlue }}>
            <h4 style={styles.actionTitle}>🏠 View Properties</h4>
            <p style={styles.actionText}>
              See all property listings posted by sellers.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #0f172a, #0b3d91)",
    padding: "45px 25px",
  },

  header: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 35,
  },

  heading: {
    fontSize: 34,
    marginBottom: 8,
  },

  subHeading: {
    fontSize: 15,
    opacity: 0.9,
  },

  profileCard: {
    maxWidth: 900,
    margin: "0 auto 35px",
    background: "#fff",
    padding: 28,
    borderRadius: 18,
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
  },

  cardTitle: {
    marginBottom: 14,
    fontSize: 20,
    color: "#111",
  },

  profileGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 12,
  },

  infoText: {
    background: "#f9fafb",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #eee",
    color: "#333",
    fontSize: 15,
  },

  actions: {
    maxWidth: 900,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 18,
  },

  link: {
    textDecoration: "none",
  },

  actionCard: {
    borderRadius: 18,
    padding: 24,
    color: "#fff",
    cursor: "pointer",
    transition: "0.2s",
    boxShadow: "0 14px 35px rgba(0,0,0,0.25)",
  },

  // Card Colors
  cardSkyBlue: {
    background: "linear-gradient(135deg,#7dd3fc,#38bdf8)",
  },

  cardBlue: {
    background: "linear-gradient(135deg,#00d4ff,#0072ff)",
  },

  actionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },

  actionText: {
    fontSize: 14,
    opacity: 0.95,
    lineHeight: 1.5,
  },
};

export default AdminDashboard;
