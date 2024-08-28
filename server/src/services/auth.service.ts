import User from "../models/user.model";
import Score from "../models/score.model";
import Session from "../models/session.model";
import appAssert from "../utils/appAssert";
import { formatWebScores, formatVRScores } from "../utils/utils";
import { CONFLICT, UNAUTHORIZED } from "../contants/http";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
} from "../utils/jwt";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import VerificationCodeType from "../contants/verificationCodeType";
import { APP_ORIGIN_URL } from "../contants/env";
import { sendMail } from "../utils/sendMail";
import { getVerifyEmailTemplate } from "../utils/emailTemplates";

type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const loginEndpoint = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  appAssert(user, UNAUTHORIZED, "Invalid username and/or password");

  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid username and/or password");

  const userId = user._id;
  const session = await Session.create({ userId, userAgent });

  const scores = await Score.findOne({ user: user._id });
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
    rank = await Score.where("qbxr_score")
      .gt(scores.qbxr_score)
      .countDocuments();
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

  const user = await User.create({
    role: role,
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    password: password,
    school_organization: school_organization,
    status: true,
  });

  if (role === "PLAYER") await Score.create({ user: user._id, qbxr_score: 0 });

  const userId = user._id;
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const url = `${APP_ORIGIN_URL}/email/verify/${verificationCode._id}`;

  // send verification email
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });
  // ignore email errors for now
  if (error) console.error(error);

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
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
