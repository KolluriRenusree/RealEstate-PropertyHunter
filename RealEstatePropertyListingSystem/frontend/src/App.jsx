import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import BuyerLayout from "./layouts/BuyerLayout";
import SellerLayout from "./layouts/SellerLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BrowseProperties from "./pages/buyer/BrowseProperties";
import Wishlist from "./pages/buyer/Wishlist";

import SellerDashboard from "./pages/seller/SellerDashboard";
import AddProperty from "./pages/seller/AddProperty";
import MyProperties from "./pages/seller/MyProperties";
import EditProperty from "./pages/seller/EditProperty";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProperties from "./pages/admin/AdminProperties";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/buyer"
          element={
            <ProtectedRoute role="buyer">
              <BuyerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<BuyerDashboard />} />
          <Route path="properties" element={<BrowseProperties />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        <Route
          path="/seller"
          element={
            <ProtectedRoute role="seller">
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SellerDashboard />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="my-properties" element={<MyProperties />} />
          <Route path="edit-property" element={<EditProperty />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="properties" element={<AdminProperties />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
