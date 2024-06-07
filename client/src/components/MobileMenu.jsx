import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import { currentPageStyle } from "../utils/utils";
import usePersist from "../hooks/auth/usePersist";
import { useToast } from "./Toast";
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineSearch,
  AiOutlineInfoCircle,
  AiOutlineUser,
} from "react-icons/ai";
import {
  MdOutlineLeaderboard,
  MdOutlineSportsFootball,
  MdOutlineLogout,
} from "react-icons/md";

// MobileMenu component. This component displays the mobile menu for the application.
const MobileMenu = ({ showMenu, toggleMenu, isLandingPage, currentPage }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const [persist, setPersist] = usePersist();
  const { notify } = useToast();

  const navigate = useNavigate();

  // Close the mobile menu when the window is resized to a width greater than or equal to 768 pixels
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768 && showMenu) {
        toggleMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMenu, toggleMenu]);

  // Handle the logout event. If the user is logged out, display a success message and navigate to the login page.
  const handleLogout = useCallback(
    (event) => {
      event.preventDefault();
      if (persist) setPersist(false);
      logout();

      if (!isLoading) {
        notify("You have successfully logged out.", "success", "top-right");
        navigate("/login");
      }
    },
    [logout, isLoading, setPersist, persist, navigate, notify]
  );

  // If the user is logging out, display a loading message
  if (isLoading) return <div>Logging out...</div>;

  // Return the mobile menu
  return (
    <div>
      {/* Display the mobile menu */}
      <div className="md:hidden">
        <div
          className={
            showMenu
              ? "fixed top-0 right-0 w-[300px] h-screen bg-dark-secondary/80 z-10 duration-300"
              : "fixed top-0 right-[-100%] w-[300px] h-screen bg-dark-secondary/80 z-10 duration-300"
          }
        >
          <div className="flex flex-col justify-between px-4 py-4">
            {/* Display the QBxR logo and close button */}
            <div className="flex items-center justify-between w-full">
              <h2 className="text-3xl font-extrabold text-green-primary font-Audiowide">
                QBxR
              </h2>
              <AiOutlineClose
                onClick={toggleMenu}
                className="cursor-pointer text-3xl text-green-primary"
              />
            </div>
            {/* End Display the QBxR logo and close button */}

            {/* Display the mobile menu items (Depending on Landing Page) */}
            {isLandingPage ? (
              <div className="flex flex-col mt-6 space-y-6 text-lg font-Audiowide font-medium">
                {/* Home Link */}
                <Link
                  to="#"
                  className={currentPageStyle(
                    "home",
                    currentPage,
                    "text-green-primary",
                    "text-light-primary hover:text-green-primary"
                  )}
                >
                  <AiOutlineHome className="inline-block mb-2 mr-2" />
                  <span>Home</span>
                </Link>
                {/* End Home Link */}

                {/* About Us Link */}
                <Link
                  to="#"
                  className={currentPageStyle(
                    "about",
                    currentPage,
                    "text-green-primary",
                    "text-light-primary hover:text-green-primary"
                  )}
                >
                  <AiOutlineInfoCircle className="inline-block mb-1 mr-2" />
                  <span>About Us</span>
                </Link>
                {/* End About Us Link */}

                {/* How QBxR Works Link */}
                <Link
                  to="#"
                  className={currentPageStyle(
                    "how",
                    currentPage,
                    "text-green-primary",
                    "text-light-primary hover:text-green-primary"
                  )}
                >
                  <MdOutlineSportsFootball className="inline-block mb-1 mr-2" />
                  <span>How QBxR Works</span>
                </Link>
                {/* End How QBxR Works Link */}

                {/* Sign In Link */}
                <Link
                  to="/login"
                  className="py-2 px-6 text-light-primary bg-green-primary rounded-full baseline hover:bg-green-secondary text-center"
                >
                  Sign In
                </Link>
                {/* End Sign In Link */}
              </div>
            ) : (
              <div className="flex flex-col mt-6 space-y-6 text-lg font-Audiowide font-medium">
                {/* Home Link */}
                <Link
                  to="/home"
                  className={currentPageStyle(
                    "home",
                    currentPage,
                    "text-green-primary",
                    "text-light-primary hover:text-green-primary"
                  )}
                >
                  <AiOutlineHome className="inline-block mb-2 mr-2" />
                  <span>Home</span>
                </Link>
                {/* End Home Link */}

                {/* Leaderboard Link */}
                <Link
                  to="/leaderboard"
                  className={currentPageStyle(
                    "leaderboard",
                    currentPage,
                    "text-green-primary",
                    "text-light-primary hover:text-green-primary"
                  )}
                >
                  <MdOutlineLeaderboard className="inline-block mb-1 mr-2" />
                  <span>Leaderboard</span>
                </Link>
                {/* End Leaderboard Link */}

                {/* Search Link */}
                <Link
                  to="/search"
                  className={currentPageStyle(
                    "search",
                    currentPage,
                    "text-green-primary",
                    "text-light-primary hover:text-green-primary"
                  )}
                >
                  <AiOutlineSearch className="inline-block mb-1 mr-2" />
                  <span>Search</span>
                </Link>
                {/* End Search Link */}

                {/* Profile Link */}
                <Link
                  to="/profile"
                  className={currentPageStyle(
                    "profile",
                    currentPage,
                    "text-green-primary",
                    "text-light-primary hover:text-green-primary"
                  )}
                >
                  <AiOutlineUser className="inline-block mb-1 mr-2" />
                  <span>My Profile</span>
                </Link>
                {/* End Profile Link */}

                {/* Settings Link */}
                <Link
                  to="#"
                  className={currentPageStyle(
                    "settings",
                    currentPage,
                    "text-green-primary",
                    "text-light-primary hover:text-green-primary"
                  )}
                >
                  <AiOutlineSetting className="inline-block mb-1 mr-2" />
                  <span>Settings</span>
                </Link>
                {/* End Settings Link */}

                {/* Log Out Button */}
                <div className="absolute w-full bottom-0 right-0">
                  <form onSubmit={handleLogout}>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-800 text-lg text-light-primary block w-full px-4 py-2 text-center rounded-b-md"
                    >
                      <MdOutlineLogout className="inline-block mb-1 mr-2" />
                      <span>Log Out</span>
                    </button>
                  </form>
                </div>
                {/* End Log Out Button */}
              </div>
            )}
            {/* End Display the mobile menu items (Depending on Landing Page) */}
          </div>
        </div>
      </div>
      {/* End Display the mobile menu */}
    </div>
  );
};

export default MobileMenu;
