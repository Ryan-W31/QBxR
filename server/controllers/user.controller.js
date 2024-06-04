const User = require("../models/user.model");
const Score = require("../models/score.model");
require("dotenv").config();

const signUp = async (req, res) => {
  const { role, firstname, lastname, email, password, school_organization } =
    req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let lowerEmail = email.toLowerCase();
  const dup = await User.findOne({ email: lowerEmail });

  if (dup) {
    return res
      .status(400)
      .json({ message: "A user has already registered with this email." });
  }

  const user = new User({
    role: role,
    firstname: firstname,
    lastname: lastname,
    email: lowerEmail,
    school_organization: school_organization,
    status: true,
  });

  await user.createHash(password);
  await user.save();

  await new Score({ user: user._id }).save();

  res.status(201).json({ message: "User created" });
};

const getLeaderboard = async (req, res) => {
  const scores = await Score.find().sort({ score: -1 }).limit(50);

  const ids = scores.map((score) => score.user);

  const users = await User.find({ _id: { $in: ids } });

  const data = users.map((user, index) => {
    return {
      _id: user._id,
      rank: index + 1,
      name: `${user.firstname} ${user.lastname}`,
      school: user.school_organization,
      score: scores.find((score) => score.user.equals(user._id)).qbxr_score,
    };
  });

  res.status(200).json({ data: data });
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  console.log(id);

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "Your account was not found. Please try again.",
      user: user,
      id: id,
    });
  }

  res.status(200).json({
    id: user._id,
    role: user.role,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    school_organization: user.school_organization,
    bio: user.bio,
    birthday: user.birthday,
    phone_number: user.phone_number,
    status: user.status,
  });
};

const updateUserInfo = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    school_organization,
    bio,
    birthday,
    phone_number,
    status,
  } = req.body;

  const id = req.params.id;

  const update = {};
  if (firstname !== undefined) update.firstname = firstname;
  if (lastname !== undefined) update.lastname = lastname;
  if (email !== undefined) update.email = email;
  if (school_organization !== undefined)
    update.school_organization = school_organization;
  if (bio !== undefined) update.bio = bio;
  if (birthday !== undefined) update.birthday = birthday;
  if (phone_number !== undefined) update.phone_number = phone_number;
  if (status !== undefined) update.status = status;

  const user = await User.findByIdAndUpdate({ _id: id }, update, { new: true });

  if (!user) {
    return res
      .status(404)
      .json({ message: "Your account was not found. Please try again." });
  }

  await user.save();

  res.status(200).json({ message: "Your account has been updated." });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    return res
      .status(404)
      .json({ message: "Your account was not found. Please try again." });
  }

  if (!(await user.verifyPassword(oldPassword))) {
    return res.status(400).json({ message: "Incorrect password." });
  }

  await user.createHash(newPassword);
  await user.save();
  res.status(200).json({ message: "Your password has been updated." });
};

module.exports = {
  getLeaderboard,
  signUp,
  getUserById,
  updateUserInfo,
  updateUserPassword,
};
