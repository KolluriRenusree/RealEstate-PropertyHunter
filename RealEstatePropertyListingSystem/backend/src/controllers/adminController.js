const User = require("../models/User");
const Property = require("../models/Property");
const subscriptionPlans = require("../config/subscriptionPlans");

// ==========================
// GET ALL USERS (ADMIN)
// ==========================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==========================
// DELETE USER (ADMIN)
// ==========================
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete admin" });
    }

    await user.deleteOne();
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==========================
// UPDATE SELLER SUBSCRIPTION
// ==========================
exports.updateSellerSubscription = async (req, res) => {
  try {
    const { plan } = req.body;
    const sellerId = req.params.id;

    if (!subscriptionPlans[plan]) {
      return res.status(400).json({ message: "Invalid subscription plan" });
    }

    const seller = await User.findById(sellerId);

    if (!seller || seller.role !== "seller") {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.subscription.plan = plan;

    if (subscriptionPlans[plan].durationDays) {
      seller.subscription.expiresAt = new Date(
        Date.now() +
          subscriptionPlans[plan].durationDays * 24 * 60 * 60 * 1000
      );
    } else {
      seller.subscription.expiresAt = null;
    }

    await seller.save();

    res.json({
      message: `Seller upgraded to ${plan} plan`,
      subscription: seller.subscription
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==========================
// 📊 ADMIN DASHBOARD STATS
// ==========================
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBuyers = await User.countDocuments({ role: "buyer" });
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalProperties = await Property.countDocuments();

    const freeSellers = await User.countDocuments({
      role: "seller",
      "subscription.plan": "free"
    });

    const basicSellers = await User.countDocuments({
      role: "seller",
      "subscription.plan": "basic"
    });

    const premiumSellers = await User.countDocuments({
      role: "seller",
      "subscription.plan": "premium"
    });

    res.json({
      users: {
        total: totalUsers,
        buyers: totalBuyers,
        sellers: totalSellers,
        admins: totalAdmins
      },
      properties: {
        total: totalProperties
      },
      subscriptions: {
        free: freeSellers,
        basic: basicSellers,
        premium: premiumSellers
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
