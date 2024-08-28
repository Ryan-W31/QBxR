import { Router } from "express";
import {
  deleteUserController,
  getLeaderboardController,
  getUserByIdController,
  getUserFavoritesController,
  searchController,
  updateUserInfoController,
  updateUserPasswordController,
} from "../controllers/user.controller";

const userRouter = Router();
// Routes for user information.

// base route: /user
// Leaderboard: GET request to /leaderboard
userRouter.route("/leaderboard").get(getLeaderboardController);

// Update User Info: PATCH request to /updateinfo/:id
userRouter.route("/update/info/:userId").patch(updateUserInfoController);

// Update User Password: PATCH request to /updatepassword/:id
userRouter.route("/update/password/:userId").patch(updateUserPasswordController);

userRouter.route("/:userId").delete(deleteUserController);
// Get User Favorites: GET request to /favorites/:id
userRouter.route("/favorites/:userId").get(getUserFavoritesController);

// Search: GET request to /search
userRouter.route("/search/:search").get(searchController);

// Get User By ID: GET request to /:id
userRouter.route("/:userId").get(getUserByIdController);

export default userRouter;
