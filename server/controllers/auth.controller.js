const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

require("dotenv").config();

function secure() {
  if (process.env.NODE_ENV === "production") {
    return true;
  }
  return false;
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await user.verifyPassword(password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const aToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "2hr",
  });

  const rToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  if (secure()) {
    res.cookie("jwt_refresh", rToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } else {
    res.cookie("jwt_refresh", rToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  res.status(200).json({ aToken });
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
        expiresIn: "2hr",
      }
    );

    res.json({ aToken });
  });
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt_refresh) {
    res.sendStatus(204);
  }

  if (secure()) {
    res.clearCookie("jwt_refresh", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  } else {
    res.clearCookie("jwt_refresh", {
      httpOnly: true,
      sameSite: "none",
    });
  }
  res.json({ message: "Logged out" });
};

module.exports = { login, refreshCookie, logout };
