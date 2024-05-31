const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth");

router.route("/leaderboard").get(verifyToken, usersController.getLeaderboard);
router
  .route("/updateinfo/:id")
  .patch(verifyToken, usersController.updateUserInfo);
router
  .route("/updatepassword/:id")
  .patch(verifyToken, usersController.updateUserPassword);
router.route("/:id").get(verifyToken, usersController.getUserById);
router.route("/signup").post(usersController.signUp);

module.exports = router;
