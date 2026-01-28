import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      <div style={styles.container}>
        {/* Left panel */}
        <div style={styles.leftPanel}>
          <h1 style={styles.brand}>🏡 RealEstateHub</h1>

          <p style={styles.tagline}>
            Create a new account to explore properties, list your own properties
            and start connecting with buyers & sellers.
          </p>

          <div style={styles.featureList}>
            <p style={styles.feature}>✅ Buyer & Seller Roles</p>
            <p style={styles.feature}>🏠 Post & Manage Properties</p>
            <p style={styles.feature}>🔐 Secure Authentication</p>
          </div>

          <Link to="/" style={styles.backHome}>
            ← Back to Home
          </Link>
        </div>

        {/* Register form */}
        <form onSubmit={handleSubmit} style={styles.card}>
          <h2 style={styles.title}>Create Account ✨</h2>
          <p style={styles.subtitle}>Register to continue</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Select Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p style={styles.bottomText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a, #0b3d91)",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: 20,
  },

  blob1: {
    position: "absolute",
    top: "-120px",
    left: "-120px",
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#00d4ff,#0072ff)",
    filter: "blur(30px)",
    opacity: 0.55,
  },

  blob2: {
    position: "absolute",
    bottom: "-140px",
    right: "-140px",
    width: 380,
    height: 380,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
    filter: "blur(35px)",
    opacity: 0.45,
  },

  container: {
    width: "100%",
    maxWidth: 950,
    display: "flex",
    flexWrap: "wrap",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 20px 55px rgba(0,0,0,0.45)",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.15)",
    zIndex: 1,
  },

  leftPanel: {
    flex: 1,
    minWidth: 320,
    padding: "50px 40px",
    color: "#fff",
    background:
      "linear-gradient(135deg, rgba(255,65,108,0.15), rgba(0,212,255,0.18))",
  },

  brand: {
    fontSize: 30,
    marginBottom: 14,
  },

  tagline: {
    fontSize: 16,
    lineHeight: 1.6,
    opacity: 0.9,
    marginBottom: 22,
  },

  featureList: {
    marginBottom: 30,
  },

  feature: {
    margin: "10px 0",
    fontSize: 15,
    opacity: 0.95,
  },

  backHome: {
    display: "inline-block",
    marginTop: 10,
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    opacity: 0.9,
  },

  card: {
    flex: 1,
    minWidth: 320,
    padding: "50px 40px",
    background: "#fff",
  },

  title: {
    fontSize: 26,
    marginBottom: 6,
    color: "#111",
  },

  subtitle: {
    marginBottom: 22,
    color: "#666",
    fontSize: 14,
  },

  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "12px 12px",
    marginBottom: 14,
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 15,
    background: "#f9fafb",
  },

  select: {
    width: "100%",
    padding: "12px 12px",
    marginBottom: 14,
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 15,
    background: "#f9fafb",
    cursor: "pointer",
  },

  btn: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.18)",
  },

  bottomText: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 14,
    color: "#444",
  },

  link: {
    color: "#ff416c",
    fontWeight: "bold",
    textDecoration: "none",
  },

  errorBox: {
    color: "#b91c1c",
    marginBottom: 14,
    padding: 10,
    border: "1px solid rgba(185, 28, 28, 0.35)",
    borderRadius: 10,
    background: "rgba(254, 226, 226, 0.8)",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
  },
};

export default Register;
