import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { useSignUpMutation } from "../hooks/users/userApiSlice";
import ErrorMessage from "../components/ErrorMessage";

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

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }

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

  const handleRole = (event) => {
    event.preventDefault();

    const pSwitch = document.getElementById("Pswitch");
    if (pSwitch.classList.contains("left-0")) {
      pSwitch.classList.remove("left-0");
      pSwitch.classList.add("left-1/2");
      setRole("player");
    } else {
      pSwitch.classList.remove("left-1/2");
      pSwitch.classList.add("left-0");
      setRole("nonplayer");
    }
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

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

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (canSave) {
      if (password !== confirmPassword) {
        setIsError(true);
        setError("Passwords do not match");
        return;
      }

      if (!isChecked) {
        setIsError(true);
        setError("Please agree to the terms and conditions");
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

      await signUp(obj)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setIsError(true);
          setError(err.data.message);
        });
    } else {
      setIsError(true);
      setError("Registration failed. Please try again later.");
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-x-16 items-center">
      <div className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 py-10 px-6 rounded-lg">
        <div className="mb-6 text-center font-Audiowide font-bold">
          <label className="text-5xl text-green-primary">QBxR</label>
        </div>
        <div className="text-center">
          <label className="mr-1 font-Audiowide font-semibold text-light-primary ">
            Register with
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
          <p className="mx-4 text-center font-Audiowide font-semibold text-green-primary">
            Or
          </p>
        </div>

        {isError && (
          <ErrorMessage message={error} onClose={() => setIsError(false)} />
        )}

        <div className="flex h-full justify-center">
          <label className="w-full flex px-4 bg-dark-primary relative rounded-full">
            <div
              id="Pswitch"
              className="w-1/2 h-full bg-green-primary rounded-full transition-all absolute left-0"
            ></div>
            <button
              onClick={handleRole}
              className="transition w-full flex font-bold justify-center items-center text-light-primary z-10"
            >
              Not A Player
            </button>
            <button
              onClick={handleRole}
              className="transition w-full flex font-bold items-center justify-center text-center text-light-primary z-10"
            >
              Player
            </button>
          </label>
        </div>
        <input
          className="text-sm w-full px-4 py-2 border outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1 rounded mt-4"
          type="text"
          placeholder="First Name"
          onChange={(c) => setFirstname(c.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1 rounded mt-4"
          type="text"
          placeholder="Last Name"
          onChange={(c) => setLastname(c.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1 rounded mt-4"
          type="text"
          placeholder="School or Organization"
          onChange={(c) => setSchool_Organization(c.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1 rounded mt-4"
          type="text"
          placeholder="Email Address"
          onChange={(c) => setEmail(c.target.value)}
        />
        <div className="relative container mt-4">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
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
        <div className="relative container mt-4">
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 text-sm border rounded outline-none focus:ring-green-primary focus:border-green-primary focus:ring-1"
            onChange={(c) => setConfirmPassword(c.target.value)}
          />
          <button
            className="absolute outline-none inset-y-0 right-0 flex items-center px-4 text-green-primary"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? (
              <AiFillEye className="w-5 h-5 text-light-secondary" />
            ) : (
              <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
            )}
          </button>
        </div>
        <div className="mt-4 flex justify-left font-semibold text-sm">
          <label className="flex text-light-primary cursor-pointer">
            <input
              id="TnC"
              className="mr-1"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheck}
            />
            <span>
              <span className="font-bold text-green-primary">I agree </span>to
              the terms & conditions and privacy policy
            </span>
          </label>
        </div>
        <div className="text-center">
          <button
            onClick={handleSignUp}
            className="mt-4 text-lg  font-semibold font-Audiowide bg-green-primary hover:bg-green-secondary px-6 py-2 text-light-primary rounded-full tracking-wider"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-light-primary text-center">
          Have an account already?{" "}
          <Link
            className="text-green-primary hover:text-green-secondary hover:underline hover:underline-offset-4"
            to="/login"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
