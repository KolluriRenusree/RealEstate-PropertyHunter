const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  deleteUser,
  updateSellerSubscription,
  getAdminStats
} = require("../controllers/adminController");

const router = express.Router();

// 📊 Admin dashboard stats
router.get("/stats", auth, role(["admin"]), getAdminStats);

// 👥 Get all users (ADMIN)
router.get("/users", auth, role(["admin"]), getAllUsers);

// ❌ Delete user (ADMIN)
router.delete("/users/:id", auth, role(["admin"]), deleteUser);

// 🔄 Update seller subscription (ADMIN)
router.put("/users/:id/subscription", auth, role(["admin"]), updateSellerSubscription);

module.exports = router;
