const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  addProperty,
  getAllProperties,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");

const router = express.Router();

// ==========================
// ADD PROPERTY (SELLER / ADMIN)
// ==========================
router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["seller", "admin"]),
  upload.array("images", 5),
  addProperty
);

// ==========================
// GET ALL PROPERTIES
// ==========================
router.get("/", getAllProperties);

// ==========================
// UPDATE PROPERTY (SELLER / ADMIN)
// ==========================
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["seller", "admin"]),
  updateProperty
);

// ==========================
// DELETE PROPERTY (SELLER / ADMIN)
// ==========================
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["seller", "admin"]),
  deleteProperty
);

module.exports = router;
