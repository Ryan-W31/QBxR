const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/score.controller");
const { verifyToken } = require("../middleware/auth");

// Routes for user scores.

// Set VR Score: PATCH request to /setvrscore/:id
router.route("/setvrscore/:id").patch(verifyToken, scoresController.setVRScore);

// Set Web Score: PATCH request to /setwebscore/:id
router
  .route("/setwebscore/:id")
  .patch(verifyToken, scoresController.setWebScore);

// Get VR Score: GET request to /getvrscore/:id
router.route("/getvrscore/:id").get(verifyToken, scoresController.getVRScore);

// Get Web Score: GET request to /getwebscore/:id
router.route("/getwebscore/:id").get(verifyToken, scoresController.getWebScore);

// Get QBxR Score: GET request to /getqbxrscore/:id
router
  .route("/getqbxrscore/:id")
  .get(verifyToken, scoresController.getQBxRScore);

// Get All Scores: GET request to /:id
router.route("/:id").get(verifyToken, scoresController.getAllScores);

module.exports = router;
