// Requirements
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Apps AND Port
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require("./routes");
app.use(routes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server start
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
