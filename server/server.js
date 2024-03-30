const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = require("./app");

const app = express();
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

//mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
