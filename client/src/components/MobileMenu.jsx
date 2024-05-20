import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useLogoutMutation } from "../hooks/auth/authApiSlice";

const MobileMenu = ({ showMenu, toggleMenu, isLandingPage, currentPage }) => {
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  function currentPageStyle(navBarItem) {
    if (navBarItem === currentPage) {
      return "text-green-primary";
    } else {
      return "text-light-primary hover:text-green-primary";
    }
  }

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

  if (isSuccess) navigate("/");

  const hangleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  if (isLoading) return <div>Logging out...</div>;

  return (
    <div>
      <div className="md:hidden">
        <div
          className={
            showMenu
              ? "fixed top-0 right-0 w-[300px] h-screen bg-dark-secondary/80 z-10 duration-300"
              : "fixed top-0 right-[-100%] w-[300px] h-screen bg-dark-secondary/80 z-10 duration-300"
          }
        >
          <div className="flex flex-col justify-between px-4 py-4">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-3xl font-extrabold text-green-primary font-Audiowide">
                QBxR
              </h2>
              <AiOutlineClose
                onClick={toggleMenu}
                className="cursor-pointer text-3xl text-green-primary"
              />
            </div>

            {isLandingPage ? (
              <div className="flex flex-col mt-6 space-y-6 text-lg font-Audiowide font-medium">
                <Link to="#" className={currentPageStyle("home")}>
                  <AiOutlineHome className="inline-block mb-2 mr-2" />
                  <span>Home</span>
                </Link>
                <Link to="#" className={currentPageStyle("about")}>
                  <AiOutlineInfoCircle className="inline-block mb-1 mr-2" />
                  <span>About Us</span>
                </Link>
                <Link to="#" className={currentPageStyle("how")}>
                  <MdOutlineSportsFootball className="inline-block mb-1 mr-2" />
                  <span>How QBxR Works</span>
                </Link>
                <Link
                  to="/login"
                  className="py-2 px-6 text-light-primary bg-green-primary rounded-full baseline hover:bg-green-secondary text-center"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="flex flex-col mt-6 space-y-6 text-lg font-Audiowide font-medium">
                <Link to="/home" className={currentPageStyle("home")}>
                  <AiOutlineHome className="inline-block mb-2 mr-2" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/leaderboard"
                  className={currentPageStyle("leaderboard")}
                >
                  <MdOutlineLeaderboard className="inline-block mb-1 mr-2" />
                  <span>Leaderboard</span>
                </Link>
                <Link to="#" className={currentPageStyle("search")}>
                  <AiOutlineSearch className="inline-block mb-1 mr-2" />
                  <span>Search</span>
                </Link>
                <Link to="/profile" className={currentPageStyle("profile")}>
                  <AiOutlineUser className="inline-block mb-1 mr-2" />
                  <span>My Profile</span>
                </Link>
                <Link to="#" className={currentPageStyle("settings")}>
                  <AiOutlineSetting className="inline-block mb-1 mr-2" />
                  <span>Settings</span>
                </Link>

                <div className="absolute w-full bottom-0 right-0">
                  <form onSubmit={hangleLogout}>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-800 text-lg text-light-primary block w-full px-4 py-2 text-center rounded-b-md"
                    >
                      <MdOutlineLogout className="inline-block mb-1 mr-2" />
                      <span>Log Out</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
