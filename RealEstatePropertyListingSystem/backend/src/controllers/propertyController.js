const Property = require("../models/Property");
const User = require("../models/User");
const subscriptionPlans = require("../config/subscriptionPlans");

// ==========================
// ADD PROPERTY
// ==========================
exports.addProperty = async (req, res) => {
  try {
    const { title, price, location, description, type } = req.body;

    const seller = await User.findById(req.user.userId);

    if (!seller || seller.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can add properties" });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => file.path);
    }

    const property = new Property({
      title,
      price,
      location,
      description,
      type,
      images: imageUrls,
      owner: seller._id
    });

    await property.save();

    res.status(201).json({ message: "Property added successfully", property });
  } catch (error) {
    res.status(500).json({ message: "Add property failed" });
  }
};

// ==========================
// GET ALL PROPERTIES
// ==========================
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

// ==========================
// UPDATE PROPERTY
// ==========================
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // seller can only update own property
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, price, location, description, type } = req.body;

    property.title = title;
    property.price = price;
    property.location = location;
    property.description = description;
    property.type = type;

    await property.save();

    res.json({ message: "Property updated successfully", property });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ==========================
// DELETE PROPERTY
// ==========================
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
