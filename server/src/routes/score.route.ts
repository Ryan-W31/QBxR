import { Router } from "express";
import {
  getAllScoresController,
  getQBxRScoreController,
  getVRScoreController,
  getWebScoreController,
  setVRScoreController,
  setWebScoreController,
} from "../controllers/score.controller";

const scoreRouter = Router();
// Routes for user scores.

// base route: /score
// Set VR Score: PATCH request to /setvrscore/:userId
scoreRouter.route("/set/vr").patch(setVRScoreController);

// Set Web Score: PATCH request to /setwebscore/:userId
scoreRouter.route("/set/web").patch(setWebScoreController);

// Get VR Score: GET request to /getvrscore/:userId
scoreRouter.route("/get/vr/:userId").get(getVRScoreController);

// Get Web Score: GET request to /getwebscore/:userId
scoreRouter.route("/get/web/:userId").get(getWebScoreController);

// Get QBxR Score: GET request to /getqbxrscore/:userId
scoreRouter.route("/get/qbxr/:userId").get(getQBxRScoreController);

// Get All Scores: GET request to /:userId
scoreRouter.route("/get/all/:userId").get(getAllScoresController);

export default scoreRouter;
