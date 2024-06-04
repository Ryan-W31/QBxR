const User = require("../models/user.model");
const Score = require("../models/score.model");
const mongoose = require("mongoose");
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
    favorite,
  } = req.body;

  const id = req.params.id;

  const update = [];

  if (firstname !== undefined) update.push({ $set: { firstname } });
  if (lastname !== undefined) update.push({ $set: { lastname } });
  if (email !== undefined) update.push({ $set: { email } });
  if (school_organization !== undefined)
    update.push({ $set: { school_organization } });
  if (bio !== undefined) update.push({ $set: { bio } });
  if (birthday !== undefined) update.push({ $set: { birthday } });
  if (phone_number !== undefined) update.push({ $set: { phone_number } });
  if (status !== undefined) update.push({ $set: { status } });
  if (favorite !== undefined) {
    const favoriteObjectId = new mongoose.Types.ObjectId(favorite);
    update.push({
      $set: {
        favorites: {
          $cond: {
            if: { $in: [favoriteObjectId, "$favorites"] },
            then: {
              $filter: {
                input: "$favorites",
                as: "fav",
                cond: { $ne: ["$$fav", favoriteObjectId] },
              },
            },
            else: { $concatArrays: ["$favorites", [favoriteObjectId]] },
          },
        },
      },
    });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      update.length > 0 ? update : {},
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "Your account was not found. Please try again." });
    }

    res.status(200).json({ message: "Your account has been updated.", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the account." });
  }
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

const getUserFavorites = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Your account was not found. Please try again." });
  }

  return res.status(200).json({ favorites: user.favorites });
};

module.exports = {
  getLeaderboard,
  getUserFavorites,
  signUp,
  getUserById,
  updateUserInfo,
  updateUserPassword,
};
