const express = require("express");

const router = express.Router();

const nonplayersController = require("../controllers/nonplayer.controller");

router.route("/signup").post(nonplayersController.signUp);
router.route("/login").get(nonplayersController.login);

module.exports = router;
