const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Invalid username and/or password." });
  }

  const user = await User.findOne({ email: email });

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

  const aToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const rToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });

  // **CHANGE TO SECURE LATER AND NONE**
  res.cookie("jwt_refresh", rToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ aToken: aToken, id: user._id });
};

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

    const aToken = jwt.sign(
      { id: refreshUser._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.json({ aToken: aToken, id: refreshUser._id });
  });
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt_refresh) {
    res.sendStatus(204);
  }

  //** CHANGE TO SECURE LATER **
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

module.exports = { login, refreshCookie, logout, test };
