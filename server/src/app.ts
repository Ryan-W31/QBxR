import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { APP_ORIGIN_URL } from "./contants/env";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./contants/http";

import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import scoreRouter from "./routes/score.route";
import auth from "./middleware/auth";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS
app.use(
  cors({
    origin: APP_ORIGIN_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.status(OK).send({ status: "healthy" });
});

app.use(errorHandler);
// Routes
app.use("/auth", authRouter);
app.use("/user", auth, userRouter);
app.use("/score", auth, scoreRouter);

export default app;
