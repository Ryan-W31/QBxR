import { Router } from "express";

import {
  loginController,
  signUpController,
  refreshCookieController,
  sendVerificationEmailController,
  verifyEmailController,
  resetPasswordController,
  logOutController,
} from "../controllers/auth.controller";

// Routes for user authentication.
const authRouter = Router();

// Login: POST request to /login
authRouter.route("/login").post(loginController);

// Sign Up: POST request to /signup
authRouter.route("/signup").post(signUpController);

// Refresh: GET request to /refresh
authRouter.route("/refresh").get(refreshCookieController);

// Verify: POST request to /verify
authRouter.route("/verify").post(sendVerificationEmailController);

// Verify: PATCH request to /verify/:token
authRouter.route("/verify/:token").patch(verifyEmailController);

// Reset Password: PATCH request to /reset/:id
authRouter.route("/reset/:id").patch(resetPasswordController);

// Logout: POST request to /logout
authRouter.route("/logout").post(logOutController);

export default authRouter;
