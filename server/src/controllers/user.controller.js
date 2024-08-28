// user.controller is used to handle the setting and getting of the user's information.
const User = require("../models/user.model");
const Score = require("../models/score.model");
const mongoose = require("mongoose");
require("dotenv").config();


// getLeaderboard is used to get the top 50 users with the highest scores.
// The users' information is stored in the database.
const getLeaderboard = async (req, res) => {
  const users = await User.find({ role: "player" })
    .sort({ score: -1 })
    .limit(50);

  const data = users.map((user, index) => {
    return {
      _id: user._id,
      rank: index + 1,
      name: `${user.firstname} ${user.lastname}`,
      school: user.school_organization,
      score: user.score,
    };
  });

  res.status(200).json({ data: data });
};

// getUserById is used to get the user's information by their ID.
// The user's information is retrieved from the database and returned to the client.
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
    favorites: user.favorites,
  });
};

// updateUserInfo is used to update the user's information.
// The user's information is updated in the database.
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

// updateUserPassword is used to update the user's password.
// The user's password is updated in the database.
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.params.id;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Invalid Password." });
  }

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

  const favorites = await User.find({ _id: { $in: user.favorites } });
  const searchedUsers = favorites.map((user) => ({
    id: user._id,
    role: user.role,
    name: `${user.firstname} ${user.lastname}`,
    school: user.school_organization,
    score: user.score ? user.score : 0,
  }));

  return res.status(200).json({ favorites: searchedUsers });
};

const search = async (req, res) => {
  const search = req.params.search;
  const filters = req.query;

  let regexFilters = [];
  let searchFilters = [];

  if (filters.player === "true" || filters.nonplayer === "true") {
    let roleFilters = [];
    if (filters.player === "true") roleFilters.push({ role: "player" });
    if (filters.nonplayer === "true") roleFilters.push({ role: "nonplayer" });
    searchFilters.push({ $or: roleFilters });
  }

  if (filters.active === "true" || filters.inactive === "true") {
    let statusFilters = [];
    if (filters.active === "true") statusFilters.push({ status: true });
    if (filters.inactive === "true") statusFilters.push({ status: false });
    searchFilters.push({ $or: statusFilters });
  }

  if (filters.name === "true") {
    regexFilters.push(
      { firstname: { $regex: search, $options: "i" } },
      { lastname: { $regex: search, $options: "i" } }
    );
  }
  if (filters.schoolOrg === "true") {
    regexFilters.push({
      school_organization: { $regex: search, $options: "i" },
    });
  }

  let query = {};

  if (searchFilters.length > 0 && regexFilters.length > 0) {
    query = { $and: [{ $or: regexFilters }, ...searchFilters] };
  } else if (searchFilters.length > 0) {
    query = { $and: searchFilters };
  } else if (regexFilters.length > 0) {
    query = { $or: regexFilters };
  }

  const users = await User.find(query);

  const searchedUsers = users.map((user) => ({
    id: user._id,
    role: user.role,
    name: `${user.firstname} ${user.lastname}`,
    school: user.school_organization,
    score: user.score ? user.score : 0,
  }));

  res.status(200).json(searchedUsers);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);
  const score = await Score.findOneAndDelete({ user: id });

  if (!user) {
    return res
      .status(404)
      .json({ message: "Your account was not found. Please try again." });
  }

  await User.updateMany(
    { favorites: { $in: [id] } },
    { $pull: { favorites: id } }
  );

  res.status(200).json({ message: "Your account has been deleted." });
};

module.exports = {
  getLeaderboard,
  getUserFavorites,
  signUp,
  getUserById,
  updateUserInfo,
  updateUserPassword,
  search,
  deleteUser,
};
