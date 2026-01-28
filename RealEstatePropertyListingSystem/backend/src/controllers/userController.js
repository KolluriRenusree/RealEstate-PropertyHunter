const User = require("../models/User");

exports.toggleWishlist = async (req, res) => {
  const user = await User.findById(req.user.userId);

  const propertyId = req.params.propertyId;

  const index = user.wishlist.indexOf(propertyId);

  if (index === -1) {
    user.wishlist.push(propertyId);
  } else {
    user.wishlist.splice(index, 1);
  }

  await user.save();
  res.json(user.wishlist);
};

exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.user.userId)
    .populate("wishlist");

  res.json(user.wishlist);
};
