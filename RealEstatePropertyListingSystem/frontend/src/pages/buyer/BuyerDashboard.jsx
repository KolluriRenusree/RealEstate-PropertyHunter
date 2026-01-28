import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

const BuyerDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={styles.page}>
      {/* Header Section */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Buyer Dashboard</h2>
        <p style={styles.subHeading}>
          Welcome back <strong>{user?.name}</strong> 👋
        </p>
      </div>

      {/* Profile Card */}
      <div style={styles.profileCard}>
        <h3 style={styles.cardTitle}>Profile Details</h3>

        <div style={styles.profileGrid}>
          <p style={styles.infoText}>
            <strong>Name:</strong> {user?.name}
          </p>
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
        <Link to="/buyer/properties" style={styles.link}>
          <div style={{ ...styles.actionCard, ...styles.actionCardBlue }}>
            <h4 style={styles.actionTitle}>🏠 Browse Properties</h4>
            <p style={styles.actionText}>
              View all available listings and explore properties.
            </p>
          </div>
        </Link>

        <Link to="/buyer/wishlist" style={styles.link}>
          <div style={{ ...styles.actionCard, ...styles.actionCardBlue }}>
            <h4 style={styles.actionTitle}>💖 Wishlist</h4>
            <p style={styles.actionText}>
              View properties you saved to shortlist later.
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
    fontSize: 16,
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
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
    border: "1px solid rgba(255,255,255,0.12)",
  },

  // ✅ EXACT SAME BLUE FOR BOTH CARDS
  actionCardBlue: {
    background: "linear-gradient(135deg,#00c6ff,#0072ff)",
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

export default BuyerDashboard;
