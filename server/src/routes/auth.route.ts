import { Router } from "express";

import {
  loginController,
  signUpController,
  refreshCookieController,
  sendVerificationEmailController,
  verifyEmailController,
  resetPasswordController,
  logOutController,
  sendPasswordResetEmailController,
} from "../controllers/auth.controller";

// Routes for user authentication.
const authRouter = Router();

// base path: /auth
// Login: POST request to /login
authRouter.route("/login").post(loginController);

// Sign Up: POST request to /signup
authRouter.route("/signup").post(signUpController);

// Logout: GET request to /logout
authRouter.route("/logout").get(logOutController);

// Refresh: GET request to /refresh
authRouter.route("/refresh").get(refreshCookieController);

// Verify: GET request to /verify/:token
authRouter.route("/verify/:token").get(verifyEmailController);

// Verify: POST request to /verify
authRouter.route("/verify").post(sendVerificationEmailController);

// Verify: POST request to /verify
authRouter.route("/password/forgot").post(sendPasswordResetEmailController);

// Reset Password: PATCH request to /reset/:id
authRouter.route("/password/reset").post(resetPasswordController);

export default authRouter;
