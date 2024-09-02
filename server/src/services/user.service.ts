// user.controller is used to handle the setting and getting of the user's information.
import { NOT_FOUND } from "../contants/http";
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
  bio?: string;
  birthday?: Date;
  phone_number?: string;
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
  const update = [];

  firstname ? update.push({ $set: { firstname } }) : null;
  lastname ? update.push({ $set: { lastname } }) : null;
  email ? update.push({ $set: { email } }) : null;
  school_organization ? update.push({ $set: { school_organization } }) : null;
  bio ? update.push({ $set: { bio } }) : null;
  birthday ? update.push({ $set: { birthday } }) : null;
  phone_number ? update.push({ $set: { phone_number } }) : null;
  status ? update.push({ $set: { status } }) : null;
  favorite
    ? update.push({
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
      })
    : null;

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
    player?: boolean;
    nonplayer?: boolean;
    active?: boolean;
    inactive?: boolean;
    name?: boolean;
    schoolOrg?: boolean;
  };
};
export const searchEndpoint = async ({ search, filters }: SearchParams) => {
  let regexFilters = [];
  let searchFilters = [];

  if (filters.player || filters.nonplayer) {
    let roleFilters = [];
    if (filters.player) roleFilters.push({ role: "PLAYER" });
    if (filters.nonplayer) roleFilters.push({ role: "NONPLAYER" });
    searchFilters.push({ $or: roleFilters });
  }

  if (filters.active || filters.inactive) {
    let statusFilters = [];
    if (filters.active) statusFilters.push({ status: true });
    if (filters.inactive) statusFilters.push({ status: false });
    searchFilters.push({ $or: statusFilters });
  }

  if (filters.name) {
    regexFilters.push(
      { firstname: { $regex: search, $options: "i" } },
      { lastname: { $regex: search, $options: "i" } }
    );
  }
  if (filters.schoolOrg) {
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
