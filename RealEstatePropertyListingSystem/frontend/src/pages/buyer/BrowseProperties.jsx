import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";

const BrowseProperties = () => {
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const props = await axios.get("/property");
        setProperties(props.data);

        const wish = await axios.get("/user/wishlist");
        setWishlist(wish.data.map((p) => p._id));
      } catch (err) {
        console.log("Error fetching properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleWishlist = async (id) => {
    await axios.post(`/user/wishlist/${id}`);
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Filter (frontend only)
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p?.title?.toLowerCase().includes(search.toLowerCase()) ||
      p?.location?.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      type === "all" ? true : (p?.type || "").toLowerCase() === type;

    return matchesSearch && matchesType;
  });

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Browse Properties</h2>
        <p style={styles.subHeading}>
          Explore available listings, add favorites to wishlist, and contact
          sellers.
        </p>

        {/* Search & Filters */}
        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder="Search by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Types</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
        </div>
      </div>

      {/* BODY */}
      <div style={styles.content}>
        {loading ? (
          <div style={styles.infoBox}>Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div style={styles.infoBox}>No properties found.</div>
        ) : (
          <div style={styles.grid}>
            {filteredProperties.map((property) => (
              <div key={property._id} style={styles.cardWrap}>
                <PropertyCard
                  property={property}
                  isWishlisted={wishlist.includes(property._id)}
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
    padding: "45px 30px 28px",
    textAlign: "center",
    color: "#fff",
  },

  heading: {
    fontSize: 34,
    marginBottom: 10,
  },

  subHeading: {
    maxWidth: 700,
    margin: "0 auto",
    opacity: 0.9,
    lineHeight: 1.5,
  },

  searchRow: {
    marginTop: 25,
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },

  searchInput: {
    width: 380,
    maxWidth: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.25)",
    outline: "none",
    fontSize: 15,
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
  },

  select: {
    width: 160,
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.25)",
    outline: "none",
    fontSize: 15,
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    cursor: "pointer",
  },

  content: {
    padding: "40px 30px",
    background: "#f9fafb",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: 500,
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

  infoBox: {
    textAlign: "center",
    padding: 18,
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #eee",
    color: "#333",
    fontWeight: 600,
    maxWidth: 420,
    margin: "0 auto",
  },
};

export default BrowseProperties;
