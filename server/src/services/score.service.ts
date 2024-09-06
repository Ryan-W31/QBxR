// score.controller is used to handle the setting and getting of the user's scores.
import Score from "../models/score.model";
import User from "../models/user.model";
import { formatWebScores, formatVRScores } from "../utils/utils";
import { NOT_FOUND } from "../constants/http";
import appAssert from "../utils/appAssert";
import { get } from "node:http";

// setVRScore is used to set the user's VR scores.
// The user's VR scores are stored in the database.
type setVRScoreParams = {
  vrScore1: number;
  vrScore2: number;
  vrScore3: number;
  vrScore4: number;
  userId: string;
};
export const setVRScoreEndpoint = async ({ vrScore1, vrScore2, vrScore3, vrScore4, userId }: setVRScoreParams) => {
  let newScore = null;
  const score = await Score.findOne({ userId });
  appAssert(score, NOT_FOUND, "User not found.");

  if (score.web_reaction && score.web_playid && score.web_defense && score.web_crit) {
    const total =
      (score.web_reaction +
        score.web_playid +
        score.web_defense +
        score.web_crit +
        vrScore1 +
        vrScore2 +
        vrScore3 +
        vrScore4) /
      8;

    const update = {
      vr_reaction: vrScore1,
      vr_playid: vrScore2,
      vr_defense: vrScore3,
      vr_crit: vrScore4,
      qbxr_score: total,
    };

    newScore = await Score.findOneAndUpdate({ userId }, update, {
      new: true,
    });
    const user = await User.findByIdAndUpdate(userId, { score: total }, { new: true });
    appAssert(user, NOT_FOUND, "User not found.");
  } else {
    const update = {
      vr_reaction: vrScore1,
      vr_playid: vrScore2,
      vr_defense: vrScore3,
      vr_crit: vrScore4,
    };

    newScore = await Score.findOneAndUpdate({ userId }, update, {
      new: true,
    });
  }

  const obj = await getAllScoresEndpoint(userId);

  return { score: obj };
};

// setWebScore is used to set the user's Web scores.
// The user's Web scores are stored in the database.
type setWebScoreParams = {
  webScore1: number;
  webScore2: number;
  webScore3: number;
  webScore4: number;
  userId: string;
};
export const setWebScoreEndpoint = async ({
  webScore1,
  webScore2,
  webScore3,
  webScore4,
  userId,
}: setWebScoreParams) => {
  let newScore = null;
  const score = await Score.findOne({ userId });
  appAssert(score, NOT_FOUND, "User not found.");

  if (score.vr_reaction && score.vr_playid && score.vr_defense && score.vr_crit) {
    const total =
      (score.vr_reaction +
        score.vr_playid +
        score.vr_defense +
        score.vr_crit +
        webScore1 +
        webScore2 +
        webScore3 +
        webScore4) /
      8;

    const update = {
      web_reaction: webScore1,
      web_playid: webScore2,
      web_defense: webScore3,
      web_crit: webScore4,
      qbxr_score: total,
    };

    newScore = await Score.findOneAndUpdate({ userId }, update, {
      new: true,
    });
    const user = await User.findByIdAndUpdate(userId, { score: total }, { new: true });
    appAssert(user, NOT_FOUND, "User not found.");
  } else {
    const update = {
      web_reaction: webScore1,
      web_playid: webScore2,
      web_defense: webScore3,
      web_crit: webScore4,
    };

    newScore = await Score.findOneAndUpdate({ userId }, update, {
      new: true,
    });
  }

  const obj = await getAllScoresEndpoint(userId);

  return { score: obj };
};

// getQBxRScore is used to get the user's QBxR score.
// The user's QBxR score is retrieved from the database and returned to the client.
// The QBxR score is calculated based on the user's Web and VR scores.
// The user's rank is also calculated based on the QBxR score.
export const getQBxRScoreEndpoint = async (userId: string) => {
  const score = await Score.findOne({ userId });
  appAssert(score, NOT_FOUND, "User not found.");
  let rank = null;

  if (score.qbxr_score === undefined) {
    rank = await Score.where("qbxr_score").gt(0).countDocuments();
  } else {
    rank = await Score.where("qbxr_score").gt(score.qbxr_score).countDocuments();
  }

  return { qbxr_score: score.qbxr_score, rank: rank + 1 };
};

// getAllScores is used to get all the user's scores.
// The user's Web, VR, and QBxR scores are retrieved from the database and returned to the client.

interface ScoreObject {
  qbxr?: { qbxr_score: number; rank: number };
  web?: { title: string; score: number }[];
  vr?: { title: string; score: number }[];
}

export const getAllScoresEndpoint = async (userId: string) => {
  const scores = await Score.findOne({ userId });
  appAssert(scores, NOT_FOUND, "User not found.");

  var obj: ScoreObject = {};

  if (scores?.qbxr_score !== undefined) {
    const rank = await Score.where("qbxr_score").gt(scores.qbxr_score).countDocuments();
    const qbxr_score = scores.qbxr_score;
    obj.qbxr = { qbxr_score: qbxr_score, rank: rank + 1 };
  }

  obj.web = formatWebScores(scores);
  obj.vr = formatVRScores(scores);

  obj.web = formatWebScores(scores);

  obj.vr = formatVRScores(scores);

  return obj;
};
