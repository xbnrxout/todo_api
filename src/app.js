require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./db/mongoose");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
