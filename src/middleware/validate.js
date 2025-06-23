const Joi = require("joi");

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

module.exports = { validateTodo };
