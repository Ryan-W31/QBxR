const Player = require("../models/player.model");

const signUp = async (req, res) => {
  try {
    const newPlayer = new Player();

    newPlayer.firstname = req.body.firstname;
    newPlayer.lastname = req.body.lastname;
    newPlayer.email = req.body.email;
    newPlayer.username = req.body.username;

    if (req.body.school_organization !== undefined)
      newPlayer.school_organization = req.body.school_organization;

    newPlayer.createHash(req.body.password);

    await newPlayer.save();
    res.status(201).json({ message: "Player created successfully" });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};

const login = async (req, res) => {
  try {
    const player = await Player.findOne({ username: req.body.username });
    if (player.verifyPassword(req.body.password)) {
      res.status(200).json({ message: "Player logged in successfully" });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};

module.exports = { signUp, login };
