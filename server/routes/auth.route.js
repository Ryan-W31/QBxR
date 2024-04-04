const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const loginThrottler = require("../middleware/loginThrottler");

router.route("/login").post(loginThrottler, authController.login);
router.route("/refresh").get(authController.refreshCookie);
router.route("/logout").post(authController.logout);
router.route("/test").get(authController.test);

module.exports = router;
