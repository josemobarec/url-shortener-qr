require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./database/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

db.query("SELECT NOW()")
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});