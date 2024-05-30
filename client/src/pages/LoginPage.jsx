import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../hooks/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../hooks/auth/authSlice";
import { useNavigate } from "react-router-dom";
import usePersist from "../hooks/auth/usePersist";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ErrorMessage from "../components/ErrorMessage";

const LoginPage = () => {
  const userRef = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [persist, setPersist] = usePersist();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function handlePersist() {
    setPersist((prevState) => !prevState);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    // try {
    //   const { aToken } = await login({ email, password }).unwrap();
    //   dispatch(setCredentials({ aToken }));
    //   setEmail("");
    //   setPassword("");
    //   navigate("/home");
    // } catch (err) {
    //   // if (!err.status || !err.data) {
    //   //   console.log("Server Error");
    //   // }
    //   console.log(error);
    // }

    login({ email, password })
      .unwrap()
      .then((res) => {
        dispatch(setCredentials({ aToken: res.data.aToken }));
        setEmail("");
        setPassword("");
        navigate("/home");
      })
      .catch((err) => {
        setIsError(true);

        if (!err.status || !err.data)
          setError("Login failed. Please try again later.");
        else setError(err.data.message);
      });
  };

  const content = isLoading ? (
    <div>Loading...</div>
  ) : (
    <section className="h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <div className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 py-10 px-6 rounded-lg">
        <div className="mb-6 text-center font-Audiowide font-bold">
          <label className="text-5xl text-green-primary">QBxR</label>
        </div>
        <div className="text-center">
          <label className="mr-1 font-Audiowide font-semibold text-light-primary">
            Log in with
          </label>
          <button
            type="button"
            className="mx-1 h-9 w-9 rounded-full bg-green-primary hover:bg-green-secondary text-light-primary"
          >
            <FaFacebook className="mx-auto h-3.5 w-3.5 " />
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-green-primary hover:bg-green-secondary uppercase leading-normal text-light-primary"
          >
            <FaGoogle className="mx-auto h-3.5 w-3.5 " />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-light-secondary after:mt-0.5 after:flex-1 after:border-t after:border-light-secondary">
          <p className="mx-4 mb-0 text-center font-Audiowide font-semibold text-green-primary">
            Or
          </p>
        </div>
        <div>
          {isError && (
            <ErrorMessage message={error} onClose={() => setIsError(false)} />
          )}
          <div>
            <input
              className="text-sm w-full px-4 py-2 border outline-none  focus:ring-green-primary focus:border-green-primary focus:ring-1 rounded"
              required
              ref={userRef}
              placeholder="Email Address"
              onChange={(c) => setEmail(c.target.value)}
            />
          </div>
          <div className="relative container mt-4">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full px-4 py-2 text-sm border rounded outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1"
              onChange={(c) => setPassword(c.target.value)}
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
          <label
            htmlFor="persist"
            className="flex text-light-primary cursor-pointer"
          >
            <input
              className="mr-1"
              id="persist"
              type="checkbox"
              onChange={handlePersist}
              checked={persist}
            />
            Remember Me
          </label>
          <Link
            className="text-green-primary hover:text-green-secondary hover:underline hover:underline-offset-4"
            to="/forgotpassword"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-center font-bold">
          <button
            className="mt-4 font-Audiowide font-md bg-green-primary hover:bg-green-secondary px-6 py-2 text-light-primary rounded-full tracking-wider"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-light-primary text-center">
          Don't have an account?{" "}
          <Link
            className="text-green-primary hover:underline hover:text-green-secondary hover:underline-offset-4"
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );

  return content;
};

export default LoginPage;
