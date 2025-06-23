const express = require("express");
const Todo = require("../models/todo");
const authenticateJWT = require("../middleware/auth");

const router = express.Router();

router.use(authenticateJWT);

// Create a todo
router.post("/", async (req, res) => {
  console.log("BODY:", req.body);
  const todo = new Todo({
    task: req.body.task,
    user: req.user.sub,
  });
  await todo.save();
  res.status(201).json(todo);
});

// Get user's todos
router.get("/", async (req, res) => {
  const todos = await Todo.find({ user: req.user.sub });
  res.json(todos);
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.sub },
      { task: req.body.task },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  const result = await Todo.deleteOne({
    _id: req.params.id,
    user: req.user.sub,
  });
  if (result.deletedCount === 0)
    return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

module.exports = router;
