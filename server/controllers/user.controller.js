const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const signUp = async (req, res) => {
  const { role, firstname, lastname, email, password, school_organization } =
    req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const dup = await User.findOne({ email: email });

  if (dup) {
    return res
      .status(400)
      .json({ message: "A user with this email already exists." });
  }

  const user = new User({
    role,
    firstname,
    lastname,
    email,
    school_organization,
  });

  await user.createHash(password);
  await user.save();
  res.status(201).json({ message: "User created" });
};

const getLeaderboard = async (req, res) => {
  res.status(200).json({
    data: [
      {
        _id: 1,
        rank: 1,
        name: "John Doe",
        school: "Univeristy of Central Florida",
        score: 98,
      },
      {
        _id: 2,
        rank: 2,
        name: "John Doe",
        school: "Univeristy of Central Florida",
        score: 75,
      },
      {
        _id: 3,
        rank: 3,
        name: "John Doe",
        school: "Univeristy of Central Florida",
        score: 60,
      },
      {
        _id: 4,
        rank: 4,
        name: "John Doe",
        school: "Univeristy of Central Florida",
        score: 25,
      },
    ],
  });
};

module.exports = { getLeaderboard, signUp };
