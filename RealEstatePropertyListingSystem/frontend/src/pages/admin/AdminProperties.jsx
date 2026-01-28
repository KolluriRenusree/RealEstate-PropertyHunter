import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/property")
      .then((res) => setProperties(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>🏠 All Properties</h2>
        <p style={styles.subHeading}>
          Admin can view all listed properties in the platform.
        </p>

        <Link to="/admin" style={styles.backLink}>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {loading ? (
          <div style={styles.loadingBox}>Loading properties...</div>
        ) : properties.length === 0 ? (
          <div style={styles.emptyBox}>
            <h3 style={styles.emptyTitle}>No Properties Found</h3>
            <p style={styles.emptyText}>No seller has posted any property yet.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {properties.map((p) => (
              <div key={p._id} style={styles.card}>
                <h3 style={styles.cardTitle}>{p.title}</h3>

                <p style={styles.info}>
                  <strong>Price:</strong> ₹{p.price}
                </p>

                <p style={styles.info}>
                  <strong>Location:</strong> {p.location || "Not Available"}
                </p>

                <p style={styles.info}>
                  <strong>Type:</strong> {p.type || "Not Available"}
                </p>

                <p style={styles.desc}>
                  {p.description
                    ? p.description.slice(0, 90) + (p.description.length > 90 ? "..." : "")
                    : "No description provided."}
                </p>

                {/* Owner Info */}
                <div style={styles.ownerBox}>
                  <p style={styles.ownerText}>
                    <strong>Owner:</strong> {p.owner?.email || "Unknown"}
                  </p>
                </div>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: 20,
  },

  card: {
    borderRadius: 18,
    background: "#fff",
    padding: 22,
    boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
    border: "1px solid #eee",
    transition: "0.2s",
  },

  cardTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: "#0f172a",
    fontWeight: "bold",
  },

  info: {
    margin: "6px 0",
    fontSize: 14,
    color: "#333",
  },

  desc: {
    marginTop: 12,
    fontSize: 13,
    color: "#555",
    lineHeight: 1.5,
  },

  ownerBox: {
    marginTop: 14,
    padding: "10px 12px",
    borderRadius: 12,
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
  },

  ownerText: {
    fontSize: 13,
    color: "#0f172a",
    margin: 0,
  },
};

export default AdminProperties;
