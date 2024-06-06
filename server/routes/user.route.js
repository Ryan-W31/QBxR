const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth");

// Routes for user information.

// Leaderboard: GET request to /leaderboard
router.route("/leaderboard").get(verifyToken, usersController.getLeaderboard);

// Update User Info: PATCH request to /updateinfo/:id
router
  .route("/updateinfo/:id")
  .patch(verifyToken, usersController.updateUserInfo);

// Update User Password: PATCH request to /updatepassword/:id
router
  .route("/updatepassword/:id")
  .patch(verifyToken, usersController.updateUserPassword);

// Get User By ID: GET request to /:id
router.route("/:id").get(verifyToken, usersController.getUserById);

// Get User Favorites: GET request to /favorites/:id
router
  .route("/favorites/:id")
  .get(verifyToken, usersController.getUserFavorites);

// Sign Up: POST request to /signup
router.route("/signup").post(usersController.signUp);

module.exports = router;
