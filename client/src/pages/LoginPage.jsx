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
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  IconButton,
  Input,
} from "@material-tailwind/react";

// LoginPage component. This component displays the login form.
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

  // Focus on the email input when the component mounts
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Toggle the password visibility
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  // Handle the remember me event
  function handlePersist() {
    setPersist((prevState) => !prevState);
  }

  // Handle the login event
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { aToken, id, user, scores } = await login({
        email,
        password,
      }).unwrap();
      dispatch(
        setCredentials({ aToken: aToken, id: id, user: user, scores: scores })
      );
      setEmail("");
      setPassword("");

      if (user?.isVerified === true) {
        navigate("/home");
      } else {
        navigate("/verify");
      }
    } catch (err) {
      setIsError(true);

      if (!err.status || !err.data)
        setError("Login failed. Please try again later.");
      else setError(err.data.message);
    }
  };

  // Display the loading message while the user is logging in or the login form
  const content = isLoading ? (
    <div>Loading...</div>
  ) : (
    <section className="h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <Card className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 pt-10 pb-4 px-6 rounded-lg">
        <CardHeader className="bg-transparent text-center font-Audiowide font-bold shadow-none">
          <label className="text-5xl text-green-primary">QBxR</label>
        </CardHeader>
        <CardBody className="bg-transparent text-center">
          <label className="mr-1 font-Audiowide font-semibold text-light-primary">
            Log in with
          </label>
          <IconButton className="mx-1 h-9 w-9 rounded-full bg-green-primary hover:bg-green-secondary text-light-primary overflow-hidden">
            <FaFacebook className="h-5 w-5" />
          </IconButton>
          <IconButton className="mx-1 h-9 w-9 rounded-full bg-green-primary hover:bg-green-secondary text-light-primary overflow-hidden">
            <FaGoogle className="h-5 w-5" />
          </IconButton>
        </CardBody>
        <div className="mb-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-light-secondary after:mt-0.5 after:flex-1 after:border-t after:border-light-secondary">
          <p className="mx-4 mb-0 text-center font-Audiowide font-semibold text-green-primary">
            Or
          </p>
        </div>
        {isError && (
          <ErrorMessage message={error} onClose={() => setIsError(false)} />
        )}
        <CardBody className="flex flex-col justify-center w-full p-0">
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
          <div className="my-2" />
          <div className="relative w-full">
            <Input
              type={isPasswordVisible ? "text" : "password"}
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
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <AiFillEye className="w-5 h-5 text-light-secondary" />
              ) : (
                <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
              )}
            </IconButton>
          </div>
          <div className="w-full flex justify-between font-semibold text-xs px-0">
            <Checkbox
              id="persist"
              ripple={false}
              label="Remember me"
              labelProps={{
                className: "font-Audiowide text-light-primary",
              }}
              containerProps={{ className: "-ml-3" }}
              className="before:bg-dark-secondary checked:bg-green-primary checked:before:bg-green-primary checked:border-green-primary hover:before:opacity-0 border-light-primary before:border-light-primary"
              onChange={handlePersist}
              checked={persist}
            />
            <Link to="/forgotpassword">
              <Button
                type="text"
                className="text-green-primary hover:text-green-secondary hover:underline hover:underline-offset-4 font-Audiowide normal-case pr-0"
              >
                Forgot Password?
              </Button>
            </Link>
          </div>
          <div className="text-center font-bold">
            <Button
              size="lg"
              className="mt-4 text-md font-Audiowide bg-green-primary hover:bg-green-secondary px-6 py-2 text-light-primary rounded-full tracking-wider"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </div>
          <div className="inline-flex items-center mt-4 font-semibold text-sm text-light-primary justify-center font-Audiowide">
            Don't have an account?{" "}
            <Link to="/register">
              <Button
                type="text"
                ripple={false}
                size="lg"
                className="pl-1 text-green-primary hover:underline hover:text-green-secondary hover:underline-offset-4 normal-case font-Audiowide"
              >
                Register
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </section>
  );

  return content;
};

export default LoginPage;
