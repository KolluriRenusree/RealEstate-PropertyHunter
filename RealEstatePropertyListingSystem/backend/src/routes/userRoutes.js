const express = require("express");
const auth = require("../middleware/authMiddleware");
const { toggleWishlist, getWishlist } = require("../controllers/userController");

const router = express.Router();

router.post("/wishlist/:propertyId", auth, toggleWishlist);
router.get("/wishlist", auth, getWishlist);

module.exports = router;
