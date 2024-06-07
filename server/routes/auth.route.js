const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const loginThrottler = require("../middleware/loginThrottler");

// Routes for user authentication.

// Login: POST request to /login
router.route("/login").post(loginThrottler, authController.login);

// Refresh: GET request to /refresh
router.route("/refresh").get(authController.refreshCookie);

// Logout: POST request to /logout
router.route("/logout").post(authController.logout);

// Test: GET request to /test
router.route("/test").get(authController.test);

module.exports = router;
