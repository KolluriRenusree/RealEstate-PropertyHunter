import { Outlet, NavLink } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>🏠 Seller Panel</h2>
        <p style={styles.subtitle}>Manage your property listings</p>

        <nav style={styles.nav}>
          <NavLink
            to="/seller"
            end
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/seller/my-properties"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            📋 My Properties
          </NavLink>

          <NavLink
            to="/seller/add-property"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            ➕ Add Property
          </NavLink>
        </nav>

        <div style={styles.footer}>
          <p style={styles.footerText}>RealEstateHub Seller</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <div style={styles.mainCard}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#f3f4f6",
  },

  sidebar: {
    width: 260,
    padding: "25px 18px",
    background: "linear-gradient(135deg, #0f172a, #0b3d91)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "10px 0 30px rgba(0,0,0,0.3)",
  },

  logo: {
    marginBottom: 6,
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    marginBottom: 24,
    fontSize: 13,
    opacity: 0.85,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    padding: "12px 14px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    transition: "0.2s",
  },

  activeLink: {
    background: "linear-gradient(135deg,#7dd3fc,#38bdf8)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
    border: "none",
  },

  footer: {
    marginTop: 35,
    paddingTop: 10,
    borderTop: "1px solid rgba(255,255,255,0.15)",
    textAlign: "center",
  },

  footerText: {
    fontSize: 12,
    opacity: 0.8,
  },

  main: {
    flex: 1,
    padding: "35px 30px",
  },

  mainCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: 18,
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    minHeight: "90vh",
  },
};

export default SellerLayout;
