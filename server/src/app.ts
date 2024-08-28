import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { APP_ORIGIN_URL } from "./contants/env";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./contants/http";

// import UserRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
// import ScoreRouter from "./routes/score.route";

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
// app.use("/api/user", UserRouter);
app.use("/auth", authRouter);
// app.use("/api/score", ScoreRouter);

export default app;
