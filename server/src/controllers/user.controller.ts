import { NOT_FOUND, OK } from "../contants/http";
import Score from "../models/score.model";
import User from "../models/user.model";
import {
  getLeaderboardEndpoint,
  searchEndpoint,
  updateUserInfoEndpoint,
  updateUserPasswordEndpoint,
} from "../services/user.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { userIdSchema } from "./score.schema";
import { searchSchema, updateUserPasswordSchema, updateUserSchema } from "./user.schema";

// getLeaderboard is used to get the top 50 users with the highest scores.
// The users' information is stored in the database.
export const getLeaderboardController = catchErrors(async (req, res) => {
  const data = await getLeaderboardEndpoint();

  return res.status(OK).json({ data: data });
});

// getUserById is used to get the user's information by their ID.
// The user's information is retrieved from the database and returned to the client.
export const getUserByIdController = catchErrors(async (req, res) => {
  const userId = userIdSchema.parse(req.params.userId);

  const user = await User.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  return res.status(OK).json(user.omitPassword());
});

// updateUserInfo is used to update the user's information.
// The user's information is updated in the database.
export const updateUserInfoController = catchErrors(async (req, res) => {
  const request = updateUserSchema.parse({ ...req.body });
  const user = updateUserInfoEndpoint(request);

  return res.status(OK).json({ message: "Your account has been updated.", user });
});

// updateUserPassword is used to update the user's password.
// The user's password is updated in the database.
export const updateUserPasswordController = catchErrors(async (req, res) => {
  const request = updateUserPasswordSchema.parse({ ...req.body });
  await updateUserPasswordEndpoint(request);

  res.status(OK).json({ message: "Your password has been updated." });
});

export const getUserFavoritesController = catchErrors(async (req, res) => {
  const userId = userIdSchema.parse(req.params.userId);

  const user = await User.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const favorites = await User.find({ _id: { $in: user.favorites } });
  const favoriteUsers = favorites.map((user) => ({
    id: user._id,
    role: user.role,
    name: `${user.firstname} ${user.lastname}`,
    school: user.school_organization,
    score: user.score ? user.score : 0,
  }));

  return res.status(OK).json({ favorites: favoriteUsers });
});

export const searchController = catchErrors(async (req, res) => {
  const request = searchSchema.parse({ search: req.params.search, filters: req.query });
  const searchedUsers = await searchEndpoint(request);

  res.status(OK).json(searchedUsers);
});

export const deleteUserController = catchErrors(async (req, res) => {
  const userId = userIdSchema.parse(req.params.userId);

  const user = await User.findByIdAndDelete(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const score = await Score.findOneAndDelete({ userId });
  appAssert(user, NOT_FOUND, "User not found");

  await User.updateMany({ favorites: { $in: [userId] } }, { $pull: { favorites: userId } });

  res.status(OK).json({ message: "Your account has been deleted." });
});
