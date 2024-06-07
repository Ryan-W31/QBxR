import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// ForgotPasswordPage component. This component displays the forgot password form.
const ForgotPasswordPage = () => {
  const [show, setShow] = useState(true);

  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);

  function toggleNewPasswordVisibility() {
    setIsNewPasswordVisible((prevState) => !prevState);
  }

  function toggleConfirmNewPasswordVisibility() {
    setIsConfirmNewPasswordVisible((prevState) => !prevState);
  }

  // Return the forgot password form
  return (
    <div>
      {show && (
        <div className={`fade-out ${show ? "fade-in" : ""}`}>
          <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-x-16 items-center">
            <div className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 py-10 px-6 rounded-lg">
              <div className="mb-6 text-center font-Audiowide font-bold">
                <label className="text-5xl text-green-primary">QBxR</label>
              </div>
              <div className="text-center font-Audiowide font-bold">
                <label className="mr-1 text-lg text-green-primary">
                  Forgot your password?
                </label>
              </div>
              <div className="my-5 flex justify-center ">
                <p className="mb-0 font-semibold text-center text-sm text-light-secondary">
                  Enter the email you used to sign up with and we will send you
                  a code to reset your password.
                </p>
              </div>
              <div>
                <div>
                  <input
                    className="text-sm w-full px-4 py-2 border outline-none  focus:ring-green-primary focus:border-green-primary focus:ring-1 border-light-secondary rounded"
                    type="text"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div className="text-center font-Audiowide font-semibold">
                <button
                  className="mt-6 bg-green-primary hover:bg-green-secondary px-6 py-2 text-light-primary rounded-full text-md tracking-wider"
                  onClick={() => setShow(!show)}
                  type="submit"
                >
                  Send Reset Code
                </button>
              </div>
              <div className="mt-4 font-semibold text-sm text-light-secondary text-center">
                Don't have an account?{" "}
                <a
                  className="text-green-primary hover:text-green-secondary hover:underline hover:underline-offset-4"
                  href="/register"
                >
                  Register
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {!show && (
        <div className="fade-in">
          <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-x-16 items-center">
            <div className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 py-8 px-6 rounded-lg">
              <div className="mb-6 text-center font-Audiowide font-bold">
                <label className="text-5xl text-green-primary">QBxR</label>
              </div>
              <div className="text-center font-Audiowide font-bold">
                <label className="mr-1 text-lg text-green-primary">
                  Reset Password
                </label>
              </div>
              <div className="my-5 flex justify-center">
                <p className="mb-0 font-semibold text-center text-sm text-light-secondary">
                  Enter the code you received and your new password.
                </p>
              </div>
              <div>
                <div>
                  <input
                    className="text-sm w-full px-4 py-2 border outline-none  focus:ring-green-primary focus:border-green-primary focus:ring-1 border-light-secondary rounded"
                    type="text"
                    placeholder="Reset Code"
                  />
                </div>
                <div className="relative container mt-4">
                  <input
                    type={isNewPasswordVisible ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full px-4 py-2 text-sm border rounded outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1"
                  />
                  <button
                    className="absolute outline-none inset-y-0 right-0 flex items-center px-4 text-green-primary"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {isNewPasswordVisible ? (
                      <AiFillEye className="w-5 h-5 text-light-secondary" />
                    ) : (
                      <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
                    )}
                  </button>
                </div>
                <div className="relative container mt-4">
                  <input
                    type={isConfirmNewPasswordVisible ? "text" : "password"}
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 text-sm border rounded outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1"
                  />
                  <button
                    className="absolute outline-none inset-y-0 right-0 flex items-center px-4 text-green-primary"
                    onClick={toggleConfirmNewPasswordVisibility}
                  >
                    {isConfirmNewPasswordVisible ? (
                      <AiFillEye className="w-5 h-5 text-light-secondary" />
                    ) : (
                      <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-center font-Audiowide font-semibold">
                <button
                  className="mt-6 bg-green-primary hover:bg-green-secondary px-4 py-2 text-light-primary rounded-full text-lg tracking-wider"
                  onClick={() => setShow(!show)}
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
