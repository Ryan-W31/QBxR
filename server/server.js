require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");

const app = require("./app");

const PORT = 5001;
const { MONGO_HOST, MONGO_USER, MONGO_PASSWORD, MONGO_NAME, MONGO_PORT } =
  process.env;

const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} mongo: ${MONGODB_URI}`);
});
