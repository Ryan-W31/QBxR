const express = require("express");

const router = express.Router();

const playersController = require("../controllers/player.controller");

router.route("/signup").post(playersController.signUp);
router.route("/login").get(playersController.login);

module.exports = router;
