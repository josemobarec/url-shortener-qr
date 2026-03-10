require("dotenv").config();
const express = require("express");

const urlRoutes = require("./routes/urlRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

app.use(errorHandler); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});