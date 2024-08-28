import { CREATED, OK, UNAUTHORIZED } from "../contants/http";
import {
  loginEndpoint,
  refreshCookieEndpoint,
  resetPasswordEndpoint,
  sendPasswordResetEmailEndpoint,
  sendVerificationEmailEndpoint,
  signUpEndpoint,
  verifyEmailEndpoint,
} from "../services/auth.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import { emailSchema, loginSchema, resetPasswordSchema, signUpSchema, verificationCodeSchema } from "./auth.schemas";
import Session from "../models/session.model";
// signUp is used to create a new user account.
// The user's information is stored in the database.
export const signUpController = catchErrors(async (req, res) => {
  const request = signUpSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await signUpEndpoint(request);
  return setAuthCookies({ res, accessToken, refreshToken }).status(CREATED).json(user);
});

// login is used to verify the user's credentials and return a JWT access token and refresh token.
// The access token is used to authenticate the user and the refresh token is used to refresh the access token.
// The refresh token is stored in a cookie and the access token is stored in the client's local storage (redux store).
// The user and user's score are also cached and returned to the client.
export const loginController = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken, userId, user, scores } = await loginEndpoint(request);

  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({ userId, user, scores });
});

// refreshCookie is used to refresh the access token.
// The refresh token is stored in a cookie and is used to verify the user.
// If the refresh token is valid, a new access token is generated and returned to the client.
// The user and user's score are also cached and returned to the client.
export const refreshCookieController = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Unauthorized");

  const { accessToken, newRefreshToken } = await refreshCookieEndpoint(refreshToken);

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed successfully" });
});

// sendVerificationEmail is used to send a verification email to the user.
export const sendVerificationEmailController = catchErrors(async (req, res) => {
  const { email } = req.body;

  const { success } = await sendVerificationEmailEndpoint(email);

  return res.status(OK).json({
    success: success,
    message: "Verification email sent.",
  });
});

// verifyEmail is used to verify the user's email.
export const verifyEmailController = catchErrors(async (req, res) => {
  const token = verificationCodeSchema.parse(req.params.token);
  const { user } = await verifyEmailEndpoint(token);
  return res.status(OK).json(user);
});

export const sendPasswordResetEmailController = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  const { url, emailId } = await sendPasswordResetEmailEndpoint(email);

  return res.status(OK).json({
    url,
    emailId,
    message: "Password reset email sent.",
  });
});

export const resetPasswordController = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);
  await resetPasswordEndpoint(request);
  return clearAuthCookies(res).status(OK).json({ message: "Your password has been updated." });
});

// logout is used to clear the refresh token cookie.
// The refresh token cookie is cleared to log the user out.
// The user is then redirected to the login page.
export const logOutController = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = verifyToken(accessToken || "");
  if (payload) {
    await Session.findByIdAndDelete(payload.sessionId);
  }
  return clearAuthCookies(res).status(OK).json({ message: "Logged out successfully" });
});
