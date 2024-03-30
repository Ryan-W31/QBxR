const express = require("express");

const router = express.Router();

const { testEndpoint } = require("../controllers/player.controller");

router.get("/player", testEndpoint);

module.exports = router;
