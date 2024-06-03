const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/score.controller");
const { verifyToken } = require("../middleware/auth");

router.route("/setvrscore/:id").patch(verifyToken, scoresController.setVRScore);
router
  .route("/setwebscore/:id")
  .patch(verifyToken, scoresController.setWebScore);
router.route("/getvrscore/:id").get(verifyToken, scoresController.getVRScore);
router.route("/getwebscore/:id").get(verifyToken, scoresController.getWebScore);

module.exports = router;
