import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWishlist = async () => {
      try {
        const res = await axios.get("/user/wishlist");
        if (isMounted) {
          setWishlist(res.data);
        }
      } catch (error) {
        console.error("Failed to load wishlist", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleWishlist = async (propertyId) => {
    await axios.post(`/user/wishlist/${propertyId}`);

    setWishlist((prev) =>
      prev.filter((property) => property._id !== propertyId)
    );
  };

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingBox}>Loading wishlist...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>My Wishlist 💖</h2>
        <p style={styles.subHeading}>
          Your saved properties are shown here. You can remove anytime.
        </p>

        <Link to="/buyer" style={styles.backLink}>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {wishlist.length === 0 ? (
          <div style={styles.emptyBox}>
            <h3 style={{ marginBottom: 10 }}>Your wishlist is empty 😔</h3>
            <p style={{ marginBottom: 18, color: "#555" }}>
              Browse properties and add them to your wishlist.
            </p>

            <Link to="/buyer/properties" style={{ textDecoration: "none" }}>
              <button style={styles.browseBtn}>Browse Properties</button>
            </Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {wishlist.map((property) => (
              <div key={property._id} style={styles.cardWrap}>
                <PropertyCard
                  property={property}
                  isWishlisted={true}
                  onToggleWishlist={toggleWishlist}
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
    padding: "45px 30px 22px",
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

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
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

  browseBtn: {
    padding: "12px 22px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    background: "linear-gradient(135deg,#00d4ff,#0072ff)",
    boxShadow: "linear-gradient(135deg,#00d4ff,#0072ff)",
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

export default Wishlist;
