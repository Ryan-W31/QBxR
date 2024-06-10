import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { useSignUpMutation } from "../hooks/users/userApiSlice";
import ErrorMessage from "../components/ErrorMessage";
import { useToast } from "../components/Toast";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  IconButton,
  Tab,
  Tabs,
  TabsHeader,
  Input,
} from "@material-tailwind/react";

// RegisterPage component. This component displays the registration form.
const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const navigate = useNavigate();

  const [role, setRole] = useState("nonplayer");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [school_organization, setSchool_Organization] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const { notify } = useToast();

  // Toggle the password visibility
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  // Toggle the confirm password visibility
  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }

  // Reset the form fields when the registration is successful
  useEffect(() => {
    if (isSuccess) {
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setSchool_Organization("");
      setConfirmPassword("");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  // Handle the checkbox event
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  // Check if the form fields are valid
  const canSave =
    [
      role,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      school_organization,
    ].every(Boolean) && !isLoading;

  // Handle the sign up event
  const handleSignUp = async (event) => {
    event.preventDefault();

    if (canSave) {
      if (password !== confirmPassword) {
        setIsError(true);
        setError("Passwords do not match.");
        return;
      }

      if (!isChecked) {
        setIsError(true);
        setError("Please agree to the terms and conditions.");
        return;
      }

      var obj = {
        role,
        firstname,
        lastname,
        email,
        password,
        school_organization,
      };

      try {
        const res = await signUp(obj).unwrap();
        notify(
          "Registration successful. Please check your email to verify.",
          "success"
        );
        navigate("/login");
      } catch (err) {
        setIsError(true);
        setError(err.data.message);
      }
    } else {
      setIsError(true);
      setError("Registration failed. Please try again later.");
    }
  };

  // Return the registration form
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-x-16 items-center">
      <Card className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 pt-10 pb-4 px-6 rounded-lg">
        <CardHeader className="text-center font-Audiowide font-bold bg-transparent shadow-none">
          <label className="text-5xl text-green-primary">QBxR</label>
        </CardHeader>
        <CardBody className="bg-transparent text-center">
          <label className="mr-1 font-Audiowide font-semibold text-light-primary">
            Register with
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
          <Tabs value="nonplayer" id="tab">
            <TabsHeader
              className="bg-dark-primary rounded-full"
              indicatorProps={{ className: "bg-green-primary rounded-full" }}
            >
              <Tab
                value={"nonplayer"}
                className="text-light-primary font-Audiowide"
                onClick={() => setRole("nonplayer")}
              >
                Non-Player
              </Tab>
              <Tab
                value={"player"}
                className="text-light-primary font-Audiowide"
                onClick={() => setRole("player")}
              >
                Player
              </Tab>
            </TabsHeader>
          </Tabs>
          <div className="flex flex-col mt-4">
            <Input
              type="text"
              placeholder="First Name"
              className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 w-full !font-Audiowide"
              labelProps={{
                className: "hidden",
              }}
              onChange={(c) => setFirstname(c.target.value)}
              required
            />
            <div className="my-2" />
            <Input
              type="text"
              placeholder="Last Name"
              className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 w-full !font-Audiowide"
              labelProps={{
                className: "hidden",
              }}
              onChange={(c) => setLastname(c.target.value)}
              required
            />
            <div className="my-2" />

            <Input
              type="text"
              placeholder="School or Organization"
              className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 w-full !font-Audiowide "
              labelProps={{
                className: "hidden",
              }}
              onChange={(c) => setSchool_Organization(c.target.value)}
              required
            />
            <div className="my-2" />

            <Input
              type="email"
              placeholder="Email"
              className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 w-full !font-Audiowide "
              labelProps={{
                className: "hidden",
              }}
              onChange={(c) => setEmail(c.target.value)}
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
            <div className="my-2" />

            <div className="relative w-full">
              <Input
                type={isConfirmPasswordVisible ? "text" : "password"}
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
                onClick={toggleConfirmPasswordVisibility}
              >
                {isConfirmPasswordVisible ? (
                  <AiFillEye className="w-5 h-5 text-light-secondary" />
                ) : (
                  <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
                )}
              </IconButton>
            </div>
          </div>
          <Checkbox
            id="TnC"
            ripple={false}
            label={
              <p>
                <span className="text-green-primary font-bold">I agree</span> to
                the terms & conditions and privacy policy
              </p>
            }
            labelProps={{
              className: "text-xs font-Audiowide text-light-primary",
            }}
            containerProps={{ className: "-ml-3" }}
            className="before:bg-dark-secondary checked:bg-green-primary checked:before:bg-green-primary checked:border-green-primary hover:before:opacity-0 border-light-primary before:border-light-primary"
            onChange={handleCheck}
            checked={isChecked}
          />
          <div className="text-center font-bold">
            <Button
              size="lg"
              className="text-md font-Audiowide bg-green-primary hover:bg-green-secondary px-6 py-2 text-light-primary rounded-full tracking-wider"
              onClick={handleSignUp}
            >
              Register
            </Button>
          </div>
          <div className="inline-flex items-center font-semibold text-sm text-light-primary justify-center font-Audiowide">
            Have an account already?{" "}
            <Link to="/login">
              <Button
                type="text"
                ripple={false}
                size="lg"
                className="pl-1 text-green-primary hover:underline hover:text-green-secondary hover:underline-offset-4 normal-case font-Audiowide"
              >
                Log In
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default RegisterPage;
