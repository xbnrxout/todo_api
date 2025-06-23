require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./db/mongoose");

const todoRoutes = require("./routes/todo   ");

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Mount the todos routes at /api/v1/todos
app.use("/api/v1/todos", todoRoutes);

const PORT = process.env.PORT || 5050;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
