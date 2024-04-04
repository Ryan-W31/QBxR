const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorhandler = require("./middleware/errorhandler");

const UserRouter = require("./routes/user.route");
const AuthRouter = require("./routes/auth.route");

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://qbxr-env.eba-mzjrqevn.us-east-1.elasticbeanstalk.com/",
];

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

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(errorhandler);

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

module.exports = app;
