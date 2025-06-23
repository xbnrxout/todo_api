const express = require("express");
const router = express.Router();
const { validateTodo } = require("../middleware/validate");
const { getTodos, createTodo } = require("../controllers/todo.controller");

router.get("/", getTodos);
router.post("/", validateTodo, createTodo);

module.exports = router;
