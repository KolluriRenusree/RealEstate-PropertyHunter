//backend\src\middleware\authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Expect: Bearer token

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach to request (useful later)
    req.user = decoded;

    next(); // Allow request to continue

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error });
  }
};
