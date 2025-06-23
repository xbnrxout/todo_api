const Todo = require("../models/todo");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    console.log("[POST /todos] Incoming body:", req.body); // <- add this line

    const todo = new Todo(req.body);
    const saved = await todo.save();
    console.log("[POST /todos] Saved:", saved); // <- add this too

    res.status(201).json(saved);
  } catch (err) {
    console.error("[POST /todos] Error:", err.message);
    next(err);
  }
};
