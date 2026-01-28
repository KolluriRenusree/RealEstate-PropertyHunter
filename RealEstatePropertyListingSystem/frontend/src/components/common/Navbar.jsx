import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <header
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #ddd",
        background: "#fff",
      }}
    >
      <Link to="/" style={{ fontWeight: "bold", textDecoration: "none" }}>
        RealEstate
      </Link>

      <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {user.role === "buyer" && (
          <>
            <Link to="/buyer/properties">Browse Properties</Link>
            <Link to="/buyer/wishlist">Wishlist</Link>
          </>
        )}

        {user.role === "seller" && (
          <>
            <Link to="/seller">Dashboard</Link>
            <Link to="/seller/my-properties">My Properties</Link>
            <Link to="/seller/add-property">Add Property</Link>
          </>
        )}

        {user.role === "admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/properties">Properties</Link>
          </>
        )}

        <span>{user.email}</span>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Navbar;
