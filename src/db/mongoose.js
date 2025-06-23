const mongoose = require("mongoose");

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const host = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT;
const dbname = process.env.MONGODB_DB;

// Ensure the authSource matches where the user was created
const uri = `mongodb://${username}:${password}@${host}:${port}/${dbname}?authSource=${dbname}`;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("[!] MongoDB connection error:", err.message);
    process.exit(1); // exit the process if DB connection fails
  }
}

module.exports = connectToDatabase;
