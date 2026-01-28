const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    price: { type: Number, required: true, index: true },

    location: { type: String, required: true, index: true },

    description: String,

    type: {
      type: String,
      enum: ["house", "apartment", "land", "villa", "commercial"],
      required: true,
      index: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
