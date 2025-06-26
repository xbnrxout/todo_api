const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  console.log("HEADERS:", req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT VERIFY ERROR:", err);
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    console.log("DECODED JWT:", user);
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
