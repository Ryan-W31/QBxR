import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  IconButton,
  Progress,
} from "@material-tailwind/react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../components/Toast";
import { strengthColor } from "../utils/utils";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  useSendVerificationMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} from "../hooks/auth/authApiSlice";
import zxcvbn from "zxcvbn";

// ForgotPasswordPage component. This component displays the forgot password form.
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const userRef = useRef();
  const [userId, setUserId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [sendVerification] = useSendVerificationMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const { notify } = useToast();

  const { token } = useParams();

  const handleVerification = useCallback(async () => {
    if (token) {
      try {
        const res = await verifyEmail(token).unwrap();
        setIsVerified(res.isVerified);
        setUserId(res.id);
      } catch (err) {
        console.log(err);
        notify("This link is invalid or has expired.", "error", "top-right");
      }
    }
  }, [token, email, notify, sendVerification, verifyEmail]);

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  useEffect(() => {
    const score = zxcvbn(password).score;
    setPasswordScore(score);
  }, [password]);

  const handleSendVerification = async () => {
    try {
      await sendVerification({
        email: email,
      }).unwrap();
      notify("Password reset email sent successfully.", "success", "top-right");
    } catch (err) {
      console.log(err);
      notify("Failed to send password reset email.", "error", "top-right");
    }
  };

  // Handle the forgot password event
  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      notify("Passwords do not match.", "error", "top-right");
      return;
    }

    if (passwordScore < 2) {
      notify("Password is too weak.", "error", "top-right");
      return;
    }

    try {
      await resetPassword({ id: userId, password: password }).unwrap();
      notify("Password reset successfully.", "success", "top-right");
      navigate("/login");
    } catch (err) {
      console.log(err);
      notify("Failed to reset password.", "error", "top-right");
    }
  };

  // Return the forgot password form
  return (
    <div className="fade-in">
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-x-16 items-center">
        <Card className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 pt-10 pb-4 px-6 rounded-lg">
          <CardHeader className="bg-transparent text-center font-Audiowide font-bold shadow-none mb-4">
            <h1 className="text-5xl text-green-primary">QBxR</h1>
            <h3 className="text-2xl text-green-primary mt-4">
              Forgot Password
            </h3>
          </CardHeader>
          <hr className="border-light-secondary w-full" />
          <CardBody className="flex flex-col justify-center pt-4">
            {isVerified ? (
              <>
                <p className="text-light-primary font-Audiowide text-sm text-center">
                  Please enter a new password.
                </p>
                <div className="my-4" />
                <div className="relative w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 !font-Audiowide"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(c) => setPassword(c.target.value)}
                    required
                  />
                  <IconButton
                    type="text"
                    ripple={false}
                    className="!absolute top-0 right-0 shadow-none bg-transparent hover:shadow-none"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  >
                    {showPassword ? (
                      <AiFillEye className="w-5 h-5 text-light-secondary" />
                    ) : (
                      <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
                    )}
                  </IconButton>
                  {password !== "" && (
                    <>
                      <div className="text-xs my-2 flex items-center justify-between gap-4">
                        <p className="font-Audiowide text-light-primary">
                          WEAK
                        </p>
                        <p className="font-Audiowide text-light-primary">
                          STRONG
                        </p>
                      </div>
                      <Progress
                        className="w-full rounded-full bg-dark-primary"
                        size="sm"
                        value={(passwordScore + 1) * 20}
                        barProps={{
                          className: `${strengthColor(
                            passwordScore
                          )} rounded-full`,
                        }}
                      />
                    </>
                  )}
                </div>
                <div className="my-2" />
                <div className="relative w-full">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 !font-Audiowide"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(c) => setConfirmPassword(c.target.value)}
                    required
                  />
                  <IconButton
                    type="text"
                    ripple={false}
                    className="!absolute top-0 right-0 shadow-none bg-transparent hover:shadow-none"
                    onClick={() =>
                      setShowConfirmPassword((prevState) => !prevState)
                    }
                  >
                    {showConfirmPassword ? (
                      <AiFillEye className="w-5 h-5 text-light-secondary" />
                    ) : (
                      <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
                    )}
                  </IconButton>
                </div>
                <div className="my-4" />
                <div className="text-center">
                  <Button
                    className="bg-green-primary hover:bg-green-secondary font-Audiowide px-6 py-2 text-light-primary text-md rounded-full"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-light-primary font-Audiowide text-sm text-center">
                  Please enter the email you used to sign up with and we will
                  send you a link to reset your password.
                  <br />
                  <br /> Please check your inbox and/or spam folder.
                </p>
                <div className="my-4" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 w-full !font-Audiowide"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(c) => setEmail(c.target.value)}
                  inputRef={userRef}
                  required
                />
                <div className="my-4" />
                <div className="text-center">
                  <Button
                    className="bg-green-primary hover:bg-green-secondary font-Audiowide px-6 py-2 text-light-primary text-md rounded-full"
                    onClick={handleSendVerification}
                  >
                    Send
                  </Button>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default ForgotPasswordPage;
