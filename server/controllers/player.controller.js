const Player = require("../models/player.model");

const testEndpoint = async (req, res) => {
  try {
    const message = "Hello World!";
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};

module.exports = { testEndpoint };
