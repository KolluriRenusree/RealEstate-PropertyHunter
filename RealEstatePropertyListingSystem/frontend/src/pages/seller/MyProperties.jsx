import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";
import useAuth from "../../context/useAuth";

const MyProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/property");

        const myProps = res.data.filter((p) => p.owner?.email === user.email);

        setProperties(myProps);
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchProperties();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await axios.delete(`/property/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete property");
    }
  };

  const handleEdit = (property) => {
    navigate("/seller/edit-property", { state: property });
  };

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingBox}>Loading your properties...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.heading}>My Properties 🏠</h2>
        <p style={styles.subHeading}>
          Manage your posted properties here (Edit/Delete anytime).
        </p>

        <div style={styles.headerBtns}>
          <Link to="/seller" style={styles.backLink}>
            ← Back to Seller Dashboard
          </Link>

          <Link to="/seller/add-property" style={{ textDecoration: "none" }}>
            <button style={styles.addBtn}>+ Add Property</button>
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {properties.length === 0 ? (
          <div style={styles.emptyBox}>
            <h3 style={styles.emptyTitle}>No properties found 😔</h3>
            <p style={styles.emptyText}>
              You haven't posted any properties yet. Add your first listing now!
            </p>

            <Link to="/seller/add-property" style={{ textDecoration: "none" }}>
              <button style={styles.emptyBtn}>Add Property</button>
            </Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {properties.map((property) => (
              <div key={property._id} style={styles.cardWrap}>
                <PropertyCard
                  property={property}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
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
    padding: "45px 30px 25px",
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
    marginBottom: 16,
  },

  headerBtns: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginTop: 18,
  },

  backLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    opacity: 0.9,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.10)",
  },

  addBtn: {
    padding: "10px 18px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
    background: "linear-gradient(135deg,#7dd3fc,#38bdf8)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.18)",
  },

  content: {
    padding: "40px 30px",
    background: "#f9fafb",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: 520,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 22,
  },

  cardWrap: {
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    background: "#fff",
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
    marginBottom: 10,
    fontSize: 22,
  },

  emptyText: {
    marginBottom: 18,
    color: "#555",
    lineHeight: 1.5,
  },

  emptyBtn: {
    padding: "12px 22px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    background: "linear-gradient(135deg,#7dd3fc,#38bdf8)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.18)",
  },

  loadingPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #0f172a, #0b3d91)",
    padding: 20,
  },

  loadingBox: {
    padding: 18,
    borderRadius: 14,
    fontWeight: "bold",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
  },
};

export default MyProperties;
