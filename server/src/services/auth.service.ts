import User from "../models/user.model";
import Score from "../models/score.model";
import Session from "../models/session.model";
import appAssert from "../utils/appAssert";
import { formatWebScores, formatVRScores } from "../utils/utils";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED } from "../constants/http";
import { RefreshTokenPayload, refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";
import VerificationCodeModel from "../models/verificationCode.model";
import {
  fiveMinutesAgo,
  fiveMinutesFromNow,
  ONE_DAY_MS,
  oneHourFromNow,
  oneYearFromNow,
  sevenDaysFromNow,
} from "../utils/date";
import VerificationCodeType from "../constants/verificationCodeType";
import { APP_ORIGIN_URL } from "../constants/env";
import { sendMail } from "../utils/sendMail";
import { getPasswordResetTemplate, getVerifyEmailTemplate } from "../utils/emailTemplates";
import { hashValue } from "../utils/bcrypt";
import { userRoleSchema } from "../controllers/auth.schemas";
import app from "../app";

type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const loginEndpoint = async ({ email, password, userAgent }: LoginParams) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  appAssert(user, UNAUTHORIZED, "Invalid username and/or password");

  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid username and/or password");

  const userId = user._id;
  const session = await Session.create({ userId, userAgent });

  if (user.isVerified === false) {
    const verificationCode = await VerificationCodeModel.create({
      userId,
      type: VerificationCodeType.EmailVerification,
      expiresAt: oneYearFromNow(),
    });

    const url = `${APP_ORIGIN_URL}/verify?code=${verificationCode._id}`;

    // send verification email
    const { error } = await sendMail({
      to: user.email,
      ...getVerifyEmailTemplate(url),
    });

    appAssert(!error, INTERNAL_SERVER_ERROR, "Failed to send verification email");
  }

  const scores = await Score.findOne({ userId: user._id });
  var obj = {
    qbxr: { qbxr_score: 0, rank: 0 },
    web: [{}],
    vr: [{}],
  };
  var rank = null;
  var qbxr_score = null;

  if (scores?.qbxr_score === undefined) {
    rank = await Score.where("qbxr_score").gt(0).countDocuments();
    qbxr_score = 0;
  } else {
    rank = await Score.where("qbxr_score").gt(scores.qbxr_score).countDocuments();
    qbxr_score = scores.qbxr_score;
  }

  obj.qbxr = { qbxr_score: qbxr_score, rank: rank + 1 };
  obj.web = formatWebScores(scores);
  obj.vr = formatVRScores(scores);

  const sessionInfo: RefreshTokenPayload = {
    sessionId: session._id,
  };

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
  const accessToken = signToken({
    ...sessionInfo,
    userId,
  });
  return {
    accessToken,
    refreshToken,
    userId: userId,
    user: user.omitPassword(),
    scores: obj,
  };
};

type SignUpParams = {
  email: string;
  password: string;
  role: string;
  firstname: string;
  lastname: string;
  school_organization: string;
  userAgent?: string;
};
export const signUpEndpoint = async ({
  email,
  password,
  role,
  firstname,
  lastname,
  school_organization,
  userAgent,
}: SignUpParams) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  appAssert(!existingUser, CONFLICT, "User already exists");

  const userRole = role === userRoleSchema.enum.PLAYER ? "PLAYER" : "NONPLAYER";

  const user = await User.create({
    role: userRole,
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    password: password,
    school_organization: school_organization,
    status: true,
  });

  if (role === "PLAYER") await Score.create({ userId: user._id, qbxr_score: 0 });

  const userId = user._id;
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const url = `${APP_ORIGIN_URL}/verify?code=${verificationCode._id}`;

  // send verification email
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });
  // ignore email errors for now
  appAssert(!error, INTERNAL_SERVER_ERROR, "Failed to send verification email");

  // create session
  const session = await Session.create({
    userId,
    userAgent: userAgent,
  });

  const refreshToken = signToken(
    {
      sessionId: session._id,
    },
    refreshTokenSignOptions
  );

  const accessToken = signToken({
    userId,
    sessionId: session._id,
  });

  return {
    userId: userId,
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const refreshCookieEndpoint = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid Refresh Token");

  const session = await Session.findById(payload.sessionId);
  const now = Date.now();
  appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, "Session Expired");

  const needsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
  if (needsRefresh) {
    session.expiresAt = sevenDaysFromNow();
    await session.save();
  }

  const newRefreshToken = needsRefresh ? signToken({ sessionId: session._id }, refreshTokenSignOptions) : undefined;
  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return { accessToken, newRefreshToken };
};

export const sendVerificationEmailEndpoint = async (email: string) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  appAssert(user, NOT_FOUND, "Invalid email");

  const userId = user._id;
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: fiveMinutesFromNow(),
  });

  const url = `${APP_ORIGIN_URL}/verify?code=${verificationCode._id}`;

  // send verification email
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });
  // ignore email errors for now
  if (error) console.error(error);

  return { success: true };
};

export const verifyEmailEndpoint = async (code: string) => {
  const verificationCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(verificationCode, NOT_FOUND, "Invalid or expired verification code");

  const user = await User.findByIdAndUpdate(verificationCode.userId, { isVerified: true }, { new: true });
  appAssert(user, INTERNAL_SERVER_ERROR, "Failed to verify user.");

  await verificationCode.deleteOne();

  return { user: user.omitPassword() };
};

export const sendPasswordResetEmailEndpoint = async (email: string) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    appAssert(user, NOT_FOUND, "User not found.");

    const fiveMinAgo = fiveMinutesAgo();
    const count = await VerificationCodeModel.countDocuments({
      userId: user._id,
      type: VerificationCodeType.PasswordReset,
      createdAt: { $gt: fiveMinAgo },
    });
    appAssert(count <= 1, TOO_MANY_REQUESTS, "Too many requests. Please try again later.");

    const expiresAt = oneHourFromNow();
    const verificationCode = await VerificationCodeModel.create({
      userId: user._id,
      type: VerificationCodeType.PasswordReset,
      expiresAt,
    });

    const url = `${APP_ORIGIN_URL}/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`;
    const { data, error } = await sendMail({
      to: email,
      ...getPasswordResetTemplate(url),
    });

    appAssert(data?.id, INTERNAL_SERVER_ERROR, `${error?.name} - ${error?.message}`);
    return { url, emailId: data.id };
  } catch (error: any) {
    console.error("Send Password Reset Email Error: ", error.message);
    return {};
  }
};

type ResetPasswordParams = {
  verificationCode: string;
  password: string;
};
export const resetPasswordEndpoint = async ({ verificationCode, password }: ResetPasswordParams) => {
  const code = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCodeType.PasswordReset,
    expiresAt: { $gt: new Date() },
  });
  appAssert(code, NOT_FOUND, "Invalid or expired verification code");

  const user = await User.findByIdAndUpdate(code.userId, { password: await hashValue(password) }, { new: true });
  appAssert(user, INTERNAL_SERVER_ERROR, "Failed to reset password.");

  await code.deleteOne();

  await Session.deleteMany({ userId: code.userId });
  return { user: user.omitPassword() };
};
