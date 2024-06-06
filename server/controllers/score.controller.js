// score.controller is used to handle the setting and getting of the user's scores.
const Score = require("../models/score.model");
const { formatWebScores, formatVRScores } = require("../utils/utils");

// setVRScore is used to set the user's VR scores.
// The user's VR scores are stored in the database.
const setVRScore = async (req, res) => {
  const { vrScore1, vrScore2, vrScore3, vrScore4 } = req.body;
  const id = req.params.id;

  if (!vrScore1 || !vrScore2 || !vrScore3 || !vrScore4) {
    return res.status(400).json({ message: "All fields are required." });
  }

  var update = {};
  if (vrScore1) update.vr_reaction = vrScore1;
  if (vrScore2) update.vr_playid = vrScore2;
  if (vrScore3) update.vr_defense = vrScore3;
  if (vrScore4) update.vr_crit = vrScore4;

  const newScore = await Score.findOneAndUpdate({ user: id }, update, {
    new: true,
  });

  if (!newScore) {
    return res.status(404).json({ message: "User not found." });
  }

  if (
    newScore.web_reaction &&
    newScore.web_playid &&
    newScore.web_defense &&
    newScore.web_crit
  ) {
    newScore.qbxr_score =
      (newScore.web_reaction +
        newScore.web_playid +
        newScore.web_defense +
        newScore.web_crit +
        newScore.vr_reaction +
        newScore.vr_playid +
        newScore.vr_defense +
        newScore.vr_crit) /
      8;
  }

  await newScore.save();

  res.status(200).json({ message: "VR Score set successfully." });
};

// setWebScore is used to set the user's Web scores.
// The user's Web scores are stored in the database.
const setWebScore = async (req, res) => {
  const { webScore1, webScore2, webScore3, webScore4 } = req.body;
  const id = req.params.id;

  if (!webScore1 || !webScore2 || !webScore3 || !webScore4) {
    return res.status(400).json({ message: "All fields are required." });
  }

  var update = {};
  if (webScore1) update.web_reaction = webScore1;
  if (webScore2) update.web_playid = webScore2;
  if (webScore3) update.web_defense = webScore3;
  if (webScore4) update.web_crit = webScore4;

  const newScore = await Score.findOneAndUpdate({ user: id }, update, {
    new: true,
  });

  if (!newScore) {
    return res.status(404).json({ message: "User not found." });
  }

  if (
    newScore.vr_reaction &&
    newScore.vr_playid &&
    newScore.vr_defense &&
    newScore.vr_crit
  ) {
    newScore.qbxr_score =
      (newScore.web_reaction +
        newScore.web_playid +
        newScore.web_defense +
        newScore.web_crit +
        newScore.vr_reaction +
        newScore.vr_playid +
        newScore.vr_defense +
        newScore.vr_crit) /
      8;
  }

  await newScore.save();

  res.status(200).json({ message: "Web Score set successfully." });
};

// getVRScore is used to get the user's VR scores.
// The user's VR scores are retrieved from the database and returned to the client.
const getVRScore = async (req, res) => {
  const id = req.params.id;

  const score = await Score.findOne({ user: id });

  if (!score) {
    return res.status(404).json({ message: "User not found." });
  }

  const vrData = formatVRScores(score);

  res.status(200).json(vrData);
};

// getWebScore is used to get the user's Web scores.
// The user's Web scores are retrieved from the database and returned to the client.
const getWebScore = async (req, res) => {
  const id = req.params.id;

  const score = await Score.findOne({ user: id });

  if (!score) {
    return res.status(404).json({ message: "User not found." });
  }

  const webData = formatWebScores(score);

  res.status(200).json(webData);
};

// getQBxRScore is used to get the user's QBxR score.
// The user's QBxR score is retrieved from the database and returned to the client.
// The QBxR score is calculated based on the user's Web and VR scores.
// The user's rank is also calculated based on the QBxR score.
const getQBxRScore = async (req, res) => {
  const id = req.params.id;

  const score = await Score.findOne({ user: id });
  var rank = null;

  if (score.qbxr_score === undefined) {
    rank = await Score.where("qbxr_score").gt(0).countDocuments();
  } else {
    rank = await Score.where("qbxr_score")
      .gt(score.qbxr_score)
      .countDocuments();
  }

  if (!score) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json({ qbxr_score: score.qbxr_score, rank: rank + 1 });
};

// getAllScores is used to get all the user's scores.
// The user's Web, VR, and QBxR scores are retrieved from the database and returned to the client.
const getAllScores = async (req, res) => {
  const id = req.params.id;

  const scores = await Score.find({ user: id });

  if (!scores) {
    return res.status(404).json({ message: "User not found." });
  }
  var obj = {};
  var rank = null;
  var qbxr_score = null;

  if (scores.qbxr_score === undefined) {
    rank = await Score.where("qbxr_score").gt(0).countDocuments();
    qbxr_score = 0;
  } else {
    rank = await Score.where("qbxr_score")
      .gt(scores.qbxr_score)
      .countDocuments();
    qbxr_score = scores.qbxr_score;
  }

  obj.qbxr = { qbxr_score: qbxr_score, rank: rank + 1 };

  obj.web = formatWebScores(scores);

  obj.vr = formatVRScores(scores);

  res.status(200).json(obj);
};

module.exports = {
  setVRScore,
  setWebScore,
  getVRScore,
  getWebScore,
  getQBxRScore,
  getAllScores,
};
