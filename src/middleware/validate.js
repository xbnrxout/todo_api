const Joi = require("joi");
const jwt = require("jsonwebtoken");

const validateTodo = (req, res, next) => {
  const schema = Joi.object({
    task: Joi.string().min(1).max(256).required(),
    completed: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body, { stripUnknown: true });
  if (error) {
    return res.status(400).json({ error: error.details.map((d) => d.message) });
  }
  next();
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or malformed token" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET not set");
    return res.status(500).json({ message: "Internal server error" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

module.exports = { validateTodo, authenticateJWT };
