const NonPlayer = require("../models/nonplayer.model");

const signUp = async (req, res) => {
  try {
    const newNonPlayer = new NonPlayer();

    newNonPlayer.firstname = req.body.firstname;
    newNonPlayer.lastname = req.body.lastname;
    newNonPlayer.email = req.body.email;
    newNonPlayer.username = req.body.username;

    if (req.body.school_organization !== undefined)
      newNonPlayer.school_organization = req.body.school_organization;

    newNonPlayer.createHash(req.body.password);

    await newNonPlayer.save();
    res.status(201).json({ message: "Non-Player created successfully" });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};

const login = async (req, res) => {
  try {
    const nonplayer = await NonPlayer.findOne({ username: req.body.username });
    if (nonplayer.verifyPassword(req.body.password)) {
      res.status(200).json({ message: "Nonplayer logged in successfully" });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};

module.exports = { signUp, login };
