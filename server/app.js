const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorhandler = require("./middleware/errorhandler");

const UserRouter = require("./routes/user.route");
const AuthRouter = require("./routes/auth.route");
const ScoreRouter = require("./routes/score.route");

const app = express();
app.use(express.json());

// Allow CORS
const allowedOrigins = [
  "https://localhost",
  "http://localhost",
  "http://localhost:3000",
  "https://localhost:3000",
  "https://qbxr-env.eba-mzjrqevn.us-east-1.elasticbeanstalk.com",
  "http://qbxr-env.eba-mzjrqevn.us-east-1.elasticbeanstalk.com",
  "https://qbxr.net",
  "http://qbxr.net",
];

// Set up CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS "));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(errorhandler);

// Test route
app.get("/api/test", (req, res) => {
  res.status(200).send("Hello World");
});

// Routes
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/score", ScoreRouter);

module.exports = app;
