require("dotenv").config();
const express = require("express");

const connectToDatabase = require("./db/mongoose");

const app = express();
app.use(express.json());

const errorHandler = require("./middleware/errorHandler");
const authenticateJWT = require("./middleware/auth");
const requireRole = require("./middleware/role");

const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.use(errorHandler);

// Apply JWT auth middleware to all /api/v1/todos requests
app.get("/health", (req, res) => res.send("OK"));
app.use("/api/v1", authRoutes);
app.use("/api/v1/admin", authenticateJWT, requireRole("admin"), adminRoutes);
app.use("/api/v1/todos", authenticateJWT, todoRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5050;

async function startServer() {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.warn("[!] MongoDB connection failed. Continuing without DB.");
  }

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
// connectToDatabase().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
//   });
// });
