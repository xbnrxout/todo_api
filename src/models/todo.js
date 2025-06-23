const mongoose = require("mongoose");
const sanitize = require("mongo-sanitize");

const TodoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TodoSchema.pre("save", function (next) {
  this.task = sanitize(this.task);
  next();
});

module.exports = mongoose.model("Todo", TodoSchema);
