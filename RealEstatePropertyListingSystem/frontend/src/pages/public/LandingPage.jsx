import { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [hoverLogin, setHoverLogin] = useState(false);
  const [hoverRegister, setHoverRegister] = useState(false);

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.nav}>
        <div style={styles.logo}>🏡 Property Hunter</div>

        <div style={styles.navLinks}>
          {/* Login (Glass Button) */}
          <Link
            to="/login"
            style={{
              ...styles.navLogin,
              ...(hoverLogin ? styles.navLoginHover : {}),
            }}
            onMouseEnter={() => setHoverLogin(true)}
            onMouseLeave={() => setHoverLogin(false)}
          >
            Login
          </Link>

          {/* Register (SkyBlue Button) */}
          <Link
            to="/register"
            style={{
              ...styles.navRegister,
              ...(hoverRegister ? styles.navRegisterHover : {}),
            }}
            onMouseEnter={() => setHoverRegister(true)}
            onMouseLeave={() => setHoverRegister(false)}
          >
            Register
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>
            Real Estate{" "}
            <span style={{ color: "#00d4ff" }}>Property Listing</span> System
          </h1>

          <p style={styles.heroSubtitle}>
            A modern MERN-based platform that connects buyers and sellers,
            simplifies property management, and provides secure role-based
            access.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/login">
              <button style={{ ...styles.btn, ...styles.btnPrimary }}>
                Login 
              </button>
            </Link>

            <Link to="/register">
              <button style={{ ...styles.btn, ...styles.btnSecondary }}>
                Register
              </button>
            </Link>
          </div>

          <div style={styles.badges}>
            <span style={styles.badge}>Secure Login</span>
            <span style={styles.badge}>Fast Search</span>
            <span style={styles.badge}>Wishlist</span>
          </div>
        </div>

        <div style={styles.heroRight}>
          <img
            src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
            alt="Real Estate"
            style={styles.heroImg}
          />
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Platform Features</h2>

        <div style={styles.featureGrid}>
          <FeatureCard
            icon="🛒"
            title="Buyers"
            text="Browse properties, apply filters, and save favorites to wishlist."
            gradient="linear-gradient(135deg,#00c6ff,#0072ff)"
          />

          <FeatureCard
            icon="🏠"
            title="Sellers"
            text="Add, edit, and manage your property listings with full control."
            gradient="linear-gradient(135deg,#f7971e,#ffd200)"
          />

          <FeatureCard
            icon="🛡️"
            title="Admins"
            text="Monitor users, manage properties, and maintain platform integrity."
            gradient="linear-gradient(135deg,#ff416c,#ff4b2b)"
          />
        </div>
      </section>

      {/* WHY */}
      <section style={styles.why}>
        <h2 style={styles.sectionTitle}>Why This Project?</h2>

        <p style={styles.whyText}>
          This project demonstrates a complete MERN stack application with
          authentication, authorization, CRUD operations, image uploads, and
          role-based workflows — designed with scalability and clarity in mind.
        </p>
      </section>

      {/* FINAL CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Get Started Today </h2>
        <p style={styles.ctaText}>
          Create an account and explore properties instantly.
        </p>

        <Link to="/register">
          <button style={{ ...styles.btn, ...styles.btnPrimary, fontSize: 18 }}>
            Create an Account
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} RealEstateHub | Built with MERN</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, text, gradient }) => {
  return (
    <div style={styles.featureCard}>
      <div style={{ ...styles.featureIcon, background: gradient }}>{icon}</div>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureText}>{text}</p>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #0f172a, #0b3d91)",
    minHeight: "100vh",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px 40px",
    alignItems: "center",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
  },

  logo: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },

  navLinks: {
    display: "flex",
    gap: 14,
    alignItems: "center",
  },

  /* ✅ Navbar Buttons */
  navLogin: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    padding: "10px 18px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.10)",
    transition: "0.2s",
  },

  navLoginHover: {
    background: "rgba(255,255,255,0.18)",
    transform: "translateY(-1px)",
  },

  navRegister: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    padding: "10px 18px",
    borderRadius: 12,
    background: "linear-gradient(135deg,#00d4ff,#0072ff)",
    boxShadow: "0 10px 22px rgba(0,0,0,0.25)",
    transition: "0.2s",
  },

  navRegisterHover: {
    transform: "translateY(-2px) scale(1.03)",
    boxShadow: "0 14px 28px rgba(0,0,0,0.35)",
  },

  hero: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "60px 40px",
    color: "#fff",
  },

  heroLeft: { maxWidth: 520 },

  heroTitle: {
    fontSize: 42,
    marginBottom: 15,
    lineHeight: 1.2,
  },

  heroSubtitle: {
    fontSize: 18,
    marginBottom: 25,
    opacity: 0.9,
  },

  heroButtons: {
    display: "flex",
    gap: 14,
    marginBottom: 18,
  },

  btn: {
    padding: "12px 22px",
    fontSize: 16,
    cursor: "pointer",
    borderRadius: 10,
    border: "none",
    fontWeight: "bold",
  },

  btnPrimary: {
    background: "linear-gradient(135deg,#00d4ff,#0072ff)",
    color: "#fff",
    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
  },

  btnSecondary: {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.25)",
  },

  badges: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  badge: {
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    fontSize: 14,
  },

  heroRight: { maxWidth: 520 },

  heroImg: {
    width: 460,
    maxWidth: "100%",
    borderRadius: 18,
    boxShadow: "0px 18px 45px rgba(0,0,0,0.45)",
    border: "2px solid rgba(255,255,255,0.2)",
  },

  section: {
    padding: "70px 40px",
    background: "#f9fafb",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  sectionTitle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
    color: "#111",
  },

  featureGrid: {
    display: "flex",
    justifyContent: "center",
    gap: 28,
    flexWrap: "wrap",
  },

  featureCard: {
    width: 280,
    padding: 26,
    borderRadius: 18,
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    margin: "0 auto 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 28,
  },

  featureTitle: { fontSize: 20, marginBottom: 10 },

  featureText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 1.5,
  },

  why: {
    padding: "70px 40px",
    background: "linear-gradient(135deg,#eef2ff,#f0f9ff)",
  },

  whyText: {
    maxWidth: 750,
    margin: "0 auto",
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    lineHeight: 1.7,
  },

  cta: {
    padding: "70px 40px",
    textAlign: "center",
    background: "linear-gradient(135deg,#0b3d91,#0f172a)",
    color: "#fff",
  },

  ctaTitle: {
    fontSize: 30,
    marginBottom: 10,
  },

  ctaText: {
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 20,
  },

  footer: {
    padding: 20,
    background: "#000",
    color: "#bbb",
    textAlign: "center",
    fontSize: 14,
  },
};

export default LandingPage;
