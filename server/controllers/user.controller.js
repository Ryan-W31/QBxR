const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

module.exports = {};

const getAllPlayers = async (req, res) => {
  const players = await User.find({ role: "Player" }).select("-password -salt");
  res.status(200).json(players);
};

const signUp = async (req, res) => {
  const { role, firstname, lastname, email, password, school_organization } =
    req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const dup = await User.findOne({ email: email });

  if (dup) {
    return res
      .status(400)
      .json({ message: "User with this email already exists." });
  }

  const user = {
    role: role,
    firstname: firstname,
    lastname: lastname,
    email: email,
    school_organization: school_organization,
  };

  await user.createHash(password);
  const userInstance = await User.createOne(user);

  if (!userInstance) {
    return res.status(500).json({ message: "Error creating user" });
  }

  res.status(201).json({ message: "User created" });
};

module.exports = { getAllPlayers, signUp };
