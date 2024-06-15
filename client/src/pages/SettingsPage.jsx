import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  IconButton,
  Input,
  Progress,
} from "@material-tailwind/react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ErrorMessage from "../components/ErrorMessage";
import { AiOutlineClose, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import {
  updateUserPasswordAndRefresh,
  useDeleteUserMutation,
} from "../hooks/users/userApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { useToast } from "../components/Toast";
import usePersist from "../hooks/auth/usePersist";
import { strengthColor } from "../utils/utils";
import zxcvbn from "zxcvbn";

const SettingsPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [persist, setPersist] = usePersist();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useToast();

  const myId = useSelector(selectCurrentId);
  const [deleteUser, { isLoading: isLoadingDeleteUser }] =
    useDeleteUserMutation();
  const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation();

  const toggleBlur = () => setShowBlur((prevState) => !prevState);
  const toggleOldPasswordVisibility = () =>
    setShowOldPassword((prevState) => !prevState);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword((prevState) => !prevState);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prevState) => !prevState);

  useEffect(() => {
    const score = zxcvbn(newPassword).score;
    setPasswordScore(score);
  }, [newPassword]);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  const openPasswordPopup = () => {
    setShowPasswordPopup(true);
    toggleBlur();
  };

  const openDeletePopup = () => {
    setShowDeletePopup(true);
    toggleBlur();
  };

  const handleClose = () => {
    setShowPasswordPopup(false);
    setShowDeletePopup(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toggleBlur();
  };

  const handleDeleteUser = useCallback(
    async (event) => {
      event.preventDefault();
      if (deleteMessage !== "DELETE") {
        setIsError(true);
        setError("Please type 'DELETE' in the box to confirm deletion.");
        return;
      }
      if (persist) setPersist(false);
      deleteUser(myId);
      logout();

      if (!isLoadingLogout && !isLoadingDeleteUser) {
        notify(
          "Your account was deleted successfully.",
          "success",
          "top-right"
        );
        navigate("/login");
      }
    },
    [
      logout,
      isLoadingLogout,
      isLoadingDeleteUser,
      setPersist,
      persist,
      navigate,
      notify,
      deleteUser,
      myId,
      deleteMessage,
    ]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        setIsError(true);
        setError("Passwords do not match.");
        return;
      }

      if (passwordScore < 2) {
        setIsError(true);
        setError("New password is too weak.");
        return;
      }

      const response = await dispatch(
        updateUserPasswordAndRefresh({
          id: myId,
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
      ).unwrap();

      notify(response.message, "success");
      handleClose();
    } catch (err) {
      setIsError(true);

      if (!err.status || !err.data)
        setError("Error changing password. Please try again later.");
      else setError(err.data.message);
    }
  };

  return (
    <div>
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="profile"
      />

      <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
        <ScrollToTop showMenu={showMenu} />
        <NavBar
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          isLandingPage={false}
          currentPage="profile"
        />
        <section className="fade-in flex justify-center items-center mt-10 p-5">
          <Card className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 rounded-lg h-full">
            <CardHeader className="mt-4 bg-transparent shadow-none">
              <h1 className="text-6xl font-bold font-Audiowide text-green-primary text-center">
                Settings
              </h1>
            </CardHeader>
            <CardBody className="bg-transparent text-center">
              <ul className="bg-dark-secondary text-light-secondary py-2 px-3 mt-3 divide-y rounded border-2 border-green-primary">
                <li className="flex items-center py-3">
                  <span className="font-Audiowide text-light-secondary">
                    Change Your Password:
                  </span>
                  <span className="ml-auto">
                    <Button
                      className="px-6 py-2 rounded-full bg-green-primary hover:bg-green-secondary text-light-primary font-Audiowide text-md"
                      ripple={false}
                      onClick={openPasswordPopup}
                    >
                      Change
                    </Button>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-Audiowide text-light-secondary">
                    Delete Your Account:
                  </span>
                  <span className="ml-auto">
                    <Button
                      className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-800 text-light-primary font-Audiowide text-md"
                      ripple={false}
                      onClick={openDeletePopup}
                    >
                      Delete
                    </Button>
                  </span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </section>
      </div>
      {showPasswordPopup && (
        <div
          id="update-password-popup"
          tabIndex="-1"
          className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <Card className="fade-in relative p-4 w-full h-full md:h-auto font-Audiowide max-w-xl !bg-dark-secondary rounded-lg sm:p-5">
            {/* Modal Header */}
            <div className="flex justify-center items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <CardHeader className="text-lg font-semibold text-light-primary bg-transparent shadow-none mt-0">
                Change Password
              </CardHeader>
              <IconButton
                variant="text"
                ripple={false}
                className="absolute top-1 right-2 !bg-transparent"
                onClick={handleClose}
              >
                <AiOutlineClose className="text-3xl text-green-primary hover:text-green-secondary" />
              </IconButton>
            </div>
            {/* End Modal Header */}
            {isError && (
              <ErrorMessage message={error} onClose={() => setIsError(false)} />
            )}
            {/* Modal Body */}
            <form>
              <div className="grid gap-4 mb-4">
                {/* Old Password Field */}
                <div className="relative w-full">
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Old Password"
                    className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 !font-Audiowide"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(c) => setOldPassword(c.target.value)}
                  />
                  <IconButton
                    variant="text"
                    ripple={false}
                    className="!absolute top-0 right-0 shadow-none !bg-transparent hover:shadow-none"
                    onClick={toggleOldPasswordVisibility}
                  >
                    {showOldPassword ? (
                      <AiFillEye className="w-5 h-5 text-light-secondary" />
                    ) : (
                      <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
                    )}
                  </IconButton>
                </div>
                {/* End Old Password Field */}

                {/* Password Field */}
                <div className="relative w-full">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 !font-Audiowide"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(c) => setNewPassword(c.target.value)}
                  />
                  <IconButton
                    variant="text"
                    ripple={false}
                    className="!absolute top-0 right-0 shadow-none !bg-transparent hover:shadow-none"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? (
                      <AiFillEye className="w-5 h-5 text-light-secondary" />
                    ) : (
                      <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
                    )}
                  </IconButton>
                  {newPassword !== "" && (
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
                {/* End Password Field */}

                {/* Confirm Password Field */}
                <div className="relative w-full">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 !font-Audiowide"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(c) => setConfirmPassword(c.target.value)}
                  />
                  <IconButton
                    variant="text"
                    ripple={false}
                    className="!absolute top-0 right-0 shadow-none !bg-transparent hover:shadow-none"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <AiFillEye className="w-5 h-5 text-light-secondary" />
                    ) : (
                      <AiFillEyeInvisible className="w-5 h-5 text-light-secondary" />
                    )}
                  </IconButton>
                </div>
                {/* End Confirm Password Field */}
                <div className="flex justify-center">
                  <Button
                    className="text-light-primary bg-green-primary hover:bg-green-secondary font-medium text-sm px-4 py-2 font-Audiowide rounded-full"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
            {/* End Modal Body */}
          </Card>
        </div>
      )}
      {showDeletePopup && (
        <div
          id="delete-user-popup"
          tabIndex="-1"
          className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <Card className="fade-in relative p-4 w-full h-full md:h-auto font-Audiowide max-w-xl !bg-dark-secondary rounded-lg sm:p-5">
            {/* Modal Header */}
            <div className="flex justify-center items-center pb-4 rounded-t border-b">
              <CardHeader className="text-lg font-semibold text-light-primary bg-transparent shadow-none mt-0">
                Delete Your Account
              </CardHeader>
              <IconButton
                variant="text"
                ripple={false}
                className="absolute top-1 right-2 !bg-transparent"
                onClick={handleClose}
              >
                <AiOutlineClose className="text-3xl text-green-primary hover:text-green-secondary" />
              </IconButton>
            </div>
            {/* End Modal Header */}
            {isError && (
              <>
                <div className="mt-2" />
                <ErrorMessage
                  message={error}
                  onClose={() => setIsError(false)}
                />
              </>
            )}
            {/* Modal Body */}
            <CardBody className="bg-transparent flex flex-col pt-2">
              {/* Confirm Field */}
              <p className="text-sm font-Audiowide text-light-primary">
                By deleting your account, all of your information, including
                your test scores, will be erased. If you would like to proceed
                in deleting your account, type 'DELETE' (all uppercase) in the
                box below then click the 'Delete' button.
              </p>
              <div className="my-2" />
              <Input
                type="text"
                className="!border !border-light-secondary !bg-light-primary ring-4 ring-transparent placeholder:text-light-secondary placeholder:opacity-100 focus:!border-green-primary focus:!border-2 !font-Audiowide"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(c) => setDeleteMessage(c.target.value)}
              />
              <div className="my-2" />

              {/* End Confirm Field */}
              <div className="flex justify-center">
                <Button
                  className="text-light-primary bg-red-600 hover:bg-red-800 font-medium text-sm px-4 py-2 font-Audiowide rounded-full"
                  onClick={handleDeleteUser}
                >
                  Delete
                </Button>
              </div>
            </CardBody>
            {/* End Modal Body */}
          </Card>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
