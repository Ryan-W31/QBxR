// score.controller is used to handle the setting and getting of the user's scores.
import { NOT_FOUND, OK } from "../constants/http";
import Score from "../models/score.model";
import {
  getAllScoresEndpoint,
  getQBxRScoreEndpoint,
  setVRScoreEndpoint,
  setWebScoreEndpoint,
} from "../services/score.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { formatVRScores, formatWebScores } from "../utils/utils";
import { userIdSchema, vrScoreSchema, webScoreSchema } from "./score.schema";

// setVRScore is used to set the user's VR scores.
// The user's VR scores are stored in the database.
export const setVRScoreController = catchErrors(async (req, res) => {
  const request = vrScoreSchema.parse({ ...req.body });
  const { score } = await setVRScoreEndpoint(request);

  return res.status(OK).json({ message: "VR Score set successfully.", score: score });
});

// setWebScore is used to set the user's Web scores.
// The user's Web scores are stored in the database.
export const setWebScoreController = catchErrors(async (req, res) => {
  const request = webScoreSchema.parse({ ...req.body });
  const { score } = await setWebScoreEndpoint(request);

  return res.status(OK).json({ message: "Web Score set successfully.", score: score });
});

// getVRScore is used to get the user's VR scores.
// The user's VR scores are retrieved from the database and returned to the client.
export const getVRScoreController = catchErrors(async (req, res) => {
  const userId = userIdSchema.parse(req.params.userId);

  const score = await Score.findOne({ userId });
  appAssert(score, NOT_FOUND, "User not found.");

  const vrData = formatVRScores(score);

  return res.status(OK).json(vrData);
});

// getWebScore is used to get the user's Web scores.
// The user's Web scores are retrieved from the database and returned to the client.
export const getWebScoreController = catchErrors(async (req, res) => {
  const userId = userIdSchema.parse(req.params.userId);

  const score = await Score.findOne({ userId });
  appAssert(score, NOT_FOUND, "User not found.");

  const webData = formatWebScores(score);

  return res.status(OK).json(webData);
});

// getQBxRScore is used to get the user's QBxR score.
// The user's QBxR score is retrieved from the database and returned to the client.
// The QBxR score is calculated based on the user's Web and VR scores.
// The user's rank is also calculated based on the QBxR score.
export const getQBxRScoreController = catchErrors(async (req, res) => {
  const userId = userIdSchema.parse(req.params.userId);

  const { qbxr_score, rank } = await getQBxRScoreEndpoint(userId);

  return res.status(OK).json({ qbxr_score, rank });
});

// getAllScores is used to get all the user's scores.
// The user's Web, VR, and QBxR scores are retrieved from the database and returned to the client.
export const getAllScoresController = catchErrors(async (req, res) => {
  const userId = userIdSchema.parse(req.params.userId);

  const obj = await getAllScoresEndpoint(userId);

  return res.status(OK).json(obj);
});
