import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../contants/appErrorCode";
import { UNAUTHORIZED } from "../contants/http";
import { verifyToken } from "../utils/jwt";

const auth: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(accessToken, UNAUTHORIZED, "Not authorized", AppErrorCode.InvalidAccessToken);

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId as any;
  req.sessionId = payload.sessionId as any;
  next();
};

export default auth;
