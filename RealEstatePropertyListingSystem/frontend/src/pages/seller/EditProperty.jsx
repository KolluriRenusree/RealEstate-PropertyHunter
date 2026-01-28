import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

const EditProperty = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // property passed from MyProperties

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) {
      navigate("/seller/my-properties");
      return;
    }

    setForm({
      title: state.title || "",
      price: state.price || "",
      location: state.location || "",
      type: state.type || "",
      description: state.description || "",
    });
  }, [state, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.price || !form.location || !form.type) {
      setError("Please fill all required fields *");
      return;
    }

    setLoading(true);

    try {
      await axios.put(`/property/${state._id}`, form);
      alert("✅ Property updated successfully");
      navigate("/seller/my-properties");
    } catch (error) {
      setError(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.topBar}>
          <div>
            <h2 style={styles.heading}>✏️ Edit Property</h2>
            <p style={styles.subHeading}>
              Update details for <strong>{state?.title}</strong>
            </p>
          </div>

          <Link to="/seller/my-properties" style={styles.backLink}>
            ← Back
          </Link>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Title *</label>
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Price *</label>
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Location *</label>
              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Property Type *</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? "Updating..." : "Update Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "45px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(135deg, #0f172a, #0b3d91)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: 820,
    background: "#fff",
    borderRadius: 18,
    padding: "30px 28px",
    boxShadow: "0 20px 55px rgba(0,0,0,0.35)",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 15,
    marginBottom: 18,
  },

  heading: {
    fontSize: 28,
    marginBottom: 6,
    color: "#111",
  },

  subHeading: {
    fontSize: 14,
    color: "#666",
  },

  backLink: {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 14,
    color: "#0b3d91",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #dbeafe",
    background: "#eff6ff",
  },

  errorBox: {
    padding: 12,
    borderRadius: 12,
    background: "rgba(254,226,226,0.75)",
    border: "1px solid rgba(185,28,28,0.35)",
    color: "#b91c1c",
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },

  input: {
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#f9fafb",
    outline: "none",
    fontSize: 15,
  },

  textarea: {
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#f9fafb",
    outline: "none",
    fontSize: 15,
    minHeight: 110,
    resize: "vertical",
  },

  btn: {
    marginTop: 10,
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    background: "linear-gradient(135deg,#00d4ff,#0072ff)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
  },
};

export default EditProperty;
