const express = require("express");
const cors = require("cors");

const PlayerRouter = require("./routes/player.route");
const NonplayerRouter = require("./routes/nonplayer.route");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", PlayerRouter);

module.exports = app;
