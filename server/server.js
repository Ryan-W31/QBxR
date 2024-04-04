require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
