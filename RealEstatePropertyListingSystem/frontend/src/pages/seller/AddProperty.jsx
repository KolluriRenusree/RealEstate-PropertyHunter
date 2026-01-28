import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.price || !form.location || !form.type) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      images.forEach((img) => formData.append("images", img));

      await axios.post("/property/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Property added successfully ✅");
      navigate("/seller/my-properties");
    } catch (err) {
      setError(err.response?.data?.message || "Add property failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🏠 Add Property</h2>
        <p style={styles.subHeading}>
          Fill property details and upload images (max 5).
        </p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Title *</label>
              <input
                name="title"
                placeholder="Eg: 2BHK Apartment"
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
                placeholder="Eg: 6500000"
                value={form.price}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Location *</label>
              <input
                name="location"
                placeholder="Eg: Hyderabad"
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
              placeholder="Write a short description..."
              value={form.description}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Upload Images (max 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={styles.file}
            />

            {images.length > 0 && (
              <div style={styles.fileInfo}>
                ✅ {images.length} image(s) selected
              </div>
            )}
          </div>

          <button disabled={loading} style={styles.btn}>
            {loading ? "Adding..." : "Add Property"}
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

  heading: {
    fontSize: 28,
    marginBottom: 6,
    color: "#111",
  },

  subHeading: {
    fontSize: 14,
    color: "#666",
    marginBottom: 18,
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

  file: {
    padding: 10,
    borderRadius: 12,
    border: "1px dashed #aaa",
    background: "#f9fafb",
    cursor: "pointer",
  },

  fileInfo: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "bold",
    color: "#0b3d91",
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

export default AddProperty;
