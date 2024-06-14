// auth.controller is used to handle the login, refresh, and logout of the user.
const utils = require("../utils/utils");
const User = require("../models/user.model");
const Score = require("../models/score.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// login is used to verify the user's credentials and return a JWT access token and refresh token.
// The access token is used to authenticate the user and the refresh token is used to refresh the access token.
// The refresh token is stored in a cookie and the access token is stored in the client's local storage (redux store).
// The user and user's score are also cached and returned to the client.
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Invalid username and/or password." });
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid username and/or password." });
  }

  const isValid = await user.verifyPassword(password);

  if (!isValid) {
    return res
      .status(401)
      .json({ message: "Invalid username and/or password." });
  }

  const scores = await Score.findOne({ user: user._id });
  var obj = {};
  var rank = null;
  var qbxr_score = null;

  if (!scores) {
    obj.qbxr = { qbxr_score: 0, rank: 0 };
    obj.web = [];
    obj.vr = [];
  } else if (scores.qbxr_score === undefined) {
    rank = await Score.where("qbxr_score").gt(0).countDocuments();
    qbxr_score = 0;
  } else {
    rank = await Score.where("qbxr_score")
      .gt(scores.qbxr_score)
      .countDocuments();
    qbxr_score = scores.qbxr_score;
  }

  obj.qbxr = { qbxr_score: qbxr_score, rank: rank + 1 };
  obj.web = utils.formatWebScores(scores);
  obj.vr = utils.formatVRScores(scores);

  const aToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const rToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt_refresh", rToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    aToken: aToken,
    id: user._id,
    user: user,
    scores: obj,
  });
};

// refreshCookie is used to refresh the access token.
// The refresh token is stored in a cookie and is used to verify the user.
// If the refresh token is valid, a new access token is generated and returned to the client.
// The user and user's score are also cached and returned to the client.
const refreshCookie = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt_refresh) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const rToken = cookies.jwt_refresh;

  jwt.verify(rToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const refreshUser = await User.findById(user.id);

    if (!refreshUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const scores = await Score.findOne({ user: refreshUser._id });
    var obj = {};
    var rank = null;
    var qbxr_score = null;

    if (!scores) {
      obj.qbxr = { qbxr_score: 0, rank: 0 };
      obj.web = [];
      obj.vr = [];
    } else if (scores.qbxr_score === undefined) {
      rank = await Score.where("qbxr_score").gt(0).countDocuments();
      qbxr_score = 0;
    } else {
      rank = await Score.where("qbxr_score")
        .gt(scores.qbxr_score)
        .countDocuments();
      qbxr_score = scores.qbxr_score;
    }

    obj.qbxr = { qbxr_score: qbxr_score, rank: rank + 1 };
    obj.web = utils.formatWebScores(scores);
    obj.vr = utils.formatVRScores(scores);

    const aToken = jwt.sign(
      { id: refreshUser._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.json({
      aToken: aToken,
      id: refreshUser._id,
      user: refreshUser,
      scores: obj,
    });
  });
};

const sendVerificationEmail = async (req, res) => {
  const { email, id } = req.body;
  const emailToken = jwt.sign({ id: id }, process.env.JWT_EMAIL_SECRET, {
    expiresIn: "5m",
  });

  let success = utils.sendEmail(email, 1, emailToken);

  res
    .status(200)
    .json({ success: success, message: "Verification email sent." });
};

const verifyEmail = async (req, res) => {
  const token = req.params.token;
  jwt.verify(token, process.env.JWT_EMAIL_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ isVerified: false });
    }

    const verifiedUser = await User.findOneAndUpdate(
      { _id: user.id },
      { isVerified: true },
      { new: true }
    );

    if (!verifiedUser) {
      return res.status(401).json({ isVerified: false });
    }

    await verifiedUser.save();

    res.status(200).json({ isVerified: true });
  });
};

// logout is used to clear the refresh token cookie.
// The refresh token cookie is cleared to log the user out.
// The user is then redirected to the login page.
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt_refresh) {
    res.sendStatus(204);
  }

  res.clearCookie("jwt_refresh", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ message: "Logged out" });
};

const test = (req, res) => {
  res.status(200).json({ message: "Test" });
};

module.exports = {
  login,
  refreshCookie,
  logout,
  test,
  sendVerificationEmail,
  verifyEmail,
};
