// user.controller is used to handle the setting and getting of the user's information.
import { NOT_FOUND } from "../constants/http";
import User from "../models/user.model";
import appAssert from "../utils/appAssert";
import { hashValue } from "../utils/bcrypt";

// getLeaderboard is used to get the top 50 users with the highest scores.
// The users' information is stored in the database.
export const getLeaderboardEndpoint = async () => {
  const users = await User.find({ role: "PLAYER" }).sort({ score: -1 }).limit(50);

  const data = users.map((user, index) => {
    return {
      userId: user._id,
      role: user.role,
      rank: index + 1,
      name: `${user.firstname} ${user.lastname}`,
      school: user.school_organization,
      score: user.score,
    };
  });

  return data;
};

// updateUserInfo is used to update the user's information.
// The user's information is updated in the database.
type UpdateUserInfoParams = {
  userId: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  school_organization?: string;
  bio?: string | null;
  birthday?: Date | null;
  phone_number?: string | null;
  status?: boolean;
  favorite?: string;
};
export const updateUserInfoEndpoint = async ({
  userId,
  firstname,
  lastname,
  email,
  school_organization,
  bio,
  birthday,
  phone_number,
  status,
  favorite,
}: UpdateUserInfoParams) => {
  console.log(
    "updateUserInfoEndpoint",
    userId,
    firstname,
    lastname,
    email,
    school_organization,
    bio,
    birthday,
    phone_number,
    status,
    favorite
  );
  const update = [];

  if (firstname !== undefined && firstname !== "") update.push({ $set: { firstname } });
  if (lastname !== undefined && lastname !== "") update.push({ $set: { lastname } });
  if (email !== undefined && email !== "") update.push({ $set: { email } });
  if (school_organization !== undefined && school_organization !== "") update.push({ $set: { school_organization } });
  if (bio !== undefined && bio !== "") update.push({ $set: { bio } });
  if (birthday !== undefined && birthday !== null) update.push({ $set: { birthday } });
  if (phone_number !== undefined && phone_number !== null) update.push({ $set: { phone_number } });
  if (status !== undefined) update.push({ $set: { status } });
  if (favorite !== undefined) {
    update.push({
      $set: {
        favorites: {
          $cond: {
            if: { $in: [favorite, "$favorites"] },
            then: {
              $filter: {
                input: "$favorites",
                as: "fav",
                cond: { $ne: ["$$fav", favorite] },
              },
            },
            else: { $concatArrays: ["$favorites", [favorite]] },
          },
        },
      },
    });
  }

  const user = await User.findByIdAndUpdate(userId, update.length > 0 ? update : {}, {
    new: true,
  });
  appAssert(user, NOT_FOUND, "User not found");
  return { user: user.omitPassword() };
};

// updateUserPassword is used to update the user's password.
// The user's password is updated in the database.
type UpdatePasswordParams = {
  userId: string;
  newPassword: string;
};
export const updateUserPasswordEndpoint = async ({ userId, newPassword }: UpdatePasswordParams) => {
  const user = await User.findByIdAndUpdate(userId, { password: await hashValue(newPassword) }, { new: true });
  appAssert(user, NOT_FOUND, "User not found");

  return { message: "Your password has been updated." };
};

type SearchParams = {
  search: string;
  filters: {
    player?: string;
    nonplayer?: string;
    active?: string;
    inactive?: string;
    name?: string;
    schoolOrg?: string;
  };
};
export const searchEndpoint = async ({ search, filters }: SearchParams) => {
  let regexFilters = [];
  let searchFilters = [];

  if (filters.player === "true" || filters.nonplayer === "true") {
    let roleFilters = [];
    if (filters.player === "true") roleFilters.push({ role: "PLAYER" });
    if (filters.nonplayer === "true") roleFilters.push({ role: "NONPLAYER" });
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
    userId: user._id,
    role: user.role,
    name: `${user.firstname} ${user.lastname}`,
    school: user.school_organization,
    score: user.score ? user.score : 0,
  }));

  return searchedUsers;
};
