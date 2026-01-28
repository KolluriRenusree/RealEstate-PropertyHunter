import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  return (
    <div style={styles.page}>
      {/* Background Header Strip */}
      <div style={styles.topBg}></div>

      {/* Main Content Container */}
      <main style={styles.main}>
        <div style={styles.card}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #0b3d91)",
    fontFamily: "Arial, sans-serif",
    padding: "40px 20px",
  },

  topBg: {
    height: 120,
    borderRadius: 25,
    marginBottom: 25,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  main: {
    maxWidth: 1200,
    margin: "0 auto",
  },

  card: {
    background: "#fff",
    borderRadius: 22,
    padding: "25px 25px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
    minHeight: "75vh",
  },
};

export default BuyerLayout;
