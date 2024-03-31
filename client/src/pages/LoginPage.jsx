import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <section className="h-screen flex flex-col bg-dark-primary md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-lg bg-dark-secondary/80 py-10 px-6 rounded-lg">
        <div className="text-center">
          <label className="mr-1 text-light-primary">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9 rounded-full bg-green-primary hover:bg-green-secondary text-light-primary shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <FaFacebook className="mx-auto h-3.5 w-3.5 " />
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-green-primary hover:bg-green-secondary uppercase leading-normal text-light-primary shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <FaGoogle className="mx-auto h-3.5 w-3.5 " />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-light-secondary after:mt-0.5 after:flex-1 after:border-t after:border-light-secondary">
          <p className="mx-4 mb-0 text-center font-semibold text-green-primary">
            Or
          </p>
        </div>
        <div>
          <div>
            <input
              className="text-sm w-full px-4 py-2 border outline-none  focus:ring-green-primary focus:border-green-primary focus:ring-1 rounded"
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className="relative container mt-4">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 text-sm border rounded outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1"
            />
            <button
              className="absolute outline-none inset-y-0 right-0 flex items-center px-4 text-green-primary"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <AiFillEye className="w-5 h-5 text-light-secondary" />
              ) : (
                <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-light-primary cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-green-primary hover:text-green-secondary hover:underline hover:underline-offset-4"
            href="/forgotpassword"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center font-bold">
          <button
            className="mt-4 bg-green-primary hover:bg-green-secondary px-6 py-2 text-light-primary rounded-full text-sm tracking-wider"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-light-primary text-center">
          Don't have an account?{" "}
          <a
            className="text-green-primary hover:underline hover:text-green-secondary hover:underline-offset-4"
            href="/register"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;