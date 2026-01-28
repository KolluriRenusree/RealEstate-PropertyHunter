import { useState } from "react";

const PropertyCard = ({
  property,
  isWishlisted,
  onToggleWishlist,
  onDelete,
  onEdit
}) => {
  const images = Array.isArray(property.images) ? property.images : [];
  const [activeImage, setActiveImage] = useState(images[0] || null);

  return (
    <div style={styles.card}>
      {/* ❤️ Wishlist Button (BUYER ONLY) */}
      {onToggleWishlist && (
        <button
          onClick={() => onToggleWishlist(property._id)}
          style={styles.wishlistBtn}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      )}

      {/* MAIN IMAGE */}
      {activeImage ? (
        <div style={styles.imageWrap}>
          <img src={activeImage} alt={property.title} style={styles.mainImg} />
        </div>
      ) : (
        <p style={{ color: "#777" }}>No image available</p>
      )}

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div style={styles.thumbRow}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property ${index + 1}`}
              onClick={() => setActiveImage(img)}
              style={{
                ...styles.thumbImg,
                border:
                  activeImage === img
                    ? "2px solid #00d4ff"
                    : "1px solid rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
      )}

      {/* DETAILS */}
      <div style={styles.details}>
        <h3 style={styles.title}>{property.title}</h3>

        <div style={styles.badgeRow}>
          <span style={styles.badge}>📍 {property.location}</span>
          <span style={styles.badge}>🏠 {property.type}</span>
        </div>

        <p style={styles.price}>₹ {property.price}</p>

        {property.description && (
          <p style={styles.desc}>{property.description}</p>
        )}

        {/* SELLER ACTIONS */}
        {(onEdit || onDelete) && (
          <div style={styles.btnRow}>
            {onEdit && (
              <button style={styles.editBtn} onClick={() => onEdit(property)}>
                ✏️ Edit
              </button>
            )}
            {onDelete && (
              <button
                style={styles.deleteBtn}
                onClick={() => onDelete(property._id)}
              >
                🗑 Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "100%",
    maxWidth: 540,
    borderRadius: 20,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 14px 40px rgba(0,0,0,0.15)",
    marginBottom: 26,
    position: "relative",
    fontFamily: "Arial, sans-serif",
    transition: "0.25s",
  },

  wishlistBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 22,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(0,0,0,0.15)",
    width: 42,
    height: 42,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
  },

  imageWrap: {
    width: "100%",
    height: 260,
    overflow: "hidden",
    background: "#f1f5f9",
  },

  mainImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.3s",
  },

  thumbRow: {
    display: "flex",
    gap: 10,
    padding: "12px 14px",
    overflowX: "auto",
    background: "#f9fafb",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },

  thumbImg: {
    width: 70,
    height: 55,
    borderRadius: 10,
    objectFit: "cover",
    cursor: "pointer",
    transition: "0.2s",
  },

  details: {
    padding: "18px 18px 20px",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0f172a",
  },

  badgeRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },

  badge: {
    padding: "6px 10px",
    fontSize: 13,
    fontWeight: "bold",
    borderRadius: 999,
    background: "rgba(0, 212, 255, 0.12)",
    border: "1px solid rgba(0, 212, 255, 0.35)",
    color: "#0072ff",
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111",
  },

  desc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#444",
    marginBottom: 14,
  },

  btnRow: {
    display: "flex",
    gap: 12,
    marginTop: 10,
  },

  editBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(135deg,#00c6ff,#0072ff)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
  },

  deleteBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
  },
};

export default PropertyCard;
