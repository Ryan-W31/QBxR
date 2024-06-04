const Score = require("../models/score.model");

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

const getVRScore = async (req, res) => {
  const id = req.params.id;

  const score = await Score.findOne({ user: id });

  if (!score) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json({
    vr_reaction: score.vr_reaction,
    vr_playid: score.vr_playid,
    vr_defense: score.vr_defense,
    vr_crit: score.vr_crit,
  });
};

const getWebScore = async (req, res) => {
  const id = req.params.id;

  const score = await Score.findOne({ user: id });

  if (!score) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json({
    web_reaction: score.web_reaction,
    web_playid: score.web_playid,
    web_defense: score.web_defense,
    web_crit: score.web_crit,
  });
};

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

module.exports = {
  setVRScore,
  setWebScore,
  getVRScore,
  getWebScore,
  getQBxRScore,
};
