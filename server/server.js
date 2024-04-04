require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const errorhandler = require("./middleware/errorhandler");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const allowedOrigins = [
  "http://localhost:3000",
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

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
};

connectToDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(errorhandler);

const UserRouter = require("./routes/user.route");
const AuthRouter = require("./routes/auth.route");

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
