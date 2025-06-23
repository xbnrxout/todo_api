// middleware/roleCheck.js
module.exports = function roleCheck(requiredRole) {
  return function (req, res, next) {
    const user = req.user;
    if (!user || user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};
