import { Button, Card, CardHeader, CardBody } from "@material-tailwind/react";
import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentId, selectCurrentUser } from "../hooks/auth/authSlice";
import {
  updateIsVerifiedAndRefresh,
  useSendVerificationMutation,
} from "../hooks/auth/authApiSlice";
import { useToast } from "../components/Toast";

const EmailAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const id = useSelector(selectCurrentId);
  const [sendVerification] = useSendVerificationMutation();
  const { notify } = useToast();

  const { token } = useParams();

  const handleVerification = useCallback(async () => {
    if (token) {
      try {
        await dispatch(updateIsVerifiedAndRefresh(token)).unwrap();
        notify("Email verified successfully.", "success", "top-right");
      } catch (err) {
        console.log(err);
        notify("This link is invalid or has expired.", "error", "top-right");
      }
    } else {
      try {
        await sendVerification({
          email: user?.email,
          id: id,
        }).unwrap();
        notify("Verification email sent successfully.", "success", "top-right");
      } catch (err) {
        console.log(err);
        notify("Failed to send verification email.", "error", "top-right");
      }
    }
  }, [token, user?.email, id, dispatch, notify, sendVerification]);

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  const handleResend = async () => {
    try {
      await sendVerification({
        email: user?.email,
        id: id,
      }).unwrap();
      notify("Verification email sent successfully.", "success", "top-right");
    } catch (err) {
      console.log(err);
      notify("Failed to send verification email.", "error", "top-right");
    }
  };

  const handleRedirect = () => {
    navigate("/home");
  };

  return (
    <section className="fade-in h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <Card className="md:w-1/2 min-w-96 max-w-xl bg-dark-secondary/80 pt-10 pb-4 px-6 rounded-lg">
        <CardHeader className="bg-transparent text-center font-Audiowide font-bold shadow-none mb-4">
          <h1 className="text-5xl text-green-primary">QBxR</h1>
          <h3 className="text-2xl text-green-primary mt-4">
            Email Verification
          </h3>
        </CardHeader>
        <hr className="border-light-secondary w-full" />
        <CardBody className="flex flex-col justify-center pt-4">
          {user.isVerified ? (
            <>
              <p className="text-light-primary font-Audiowide text-md text-center">
                Your email was verified successfully!
              </p>
              <Button
                ripple={false}
                className="bg-green-primary hover:bg-green-secondary text-light-primary font-Audiowide px-6 py-2 text-md rounded-full"
                onClick={handleRedirect}
              >
                Go To Home Page
              </Button>
            </>
          ) : (
            <>
              <p className="text-light-primary font-Audiowide text-md text-center">
                A verification link has been sent to {user?.email}. This link
                will expire in 5 minutes.
                <br /> Please check your inbox and/or spam folder.
              </p>
              <p className="text-light-primary font-Audiowide text-md text-center mt-2">
                If you do not receive an email or the link has expired, you can{" "}
                <Button
                  variant="text"
                  ripple={false}
                  className="lowercase text-green-primary hover:text-green-secondary font-Audiowide p-0 text-md"
                  onClick={handleResend}
                >
                  resend it
                </Button>
                .
              </p>
            </>
          )}
        </CardBody>
      </Card>
    </section>
  );
};

export default EmailAuth;
