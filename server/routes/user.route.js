const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth");

router.route("/getallplayers").get(verifyToken, usersController.getAllPlayers);
router.route("/signup").post(usersController.signUp);

module.exports = router;
