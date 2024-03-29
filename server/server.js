const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const PlayerRouter = require("./routes/player.route");
const NonplayerRouter = require("./routes/nonplayer.route");

app.use(express.json());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.use("/players", PlayerRouter);
app.use("/nonplayers", NonplayerRouter);
