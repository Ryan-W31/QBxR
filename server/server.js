require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");

// Import the app from the app.js file.
const app = require("./app");

// Set the port to 5001.
const PORT = 5001;

// Connect to the MongoDB database.
const { MONGO_HOST, MONGO_USER, MONGO_PASSWORD, MONGO_NAME, MONGO_PORT } =
  process.env;

const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// Start the server on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} mongo: ${MONGODB_URI}`);
});
