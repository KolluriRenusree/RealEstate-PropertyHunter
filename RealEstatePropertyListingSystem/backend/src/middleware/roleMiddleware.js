//backend\src\middleware\roleMiddleware.js
module.exports = function(requiredRoles) {
  return (req, res, next) => {

    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission."
      });
    }

    next();
  };
};
