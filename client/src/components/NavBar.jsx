import React from "react";
import { Link } from "react-router-dom";
import { currentPageStyle } from "../utils/utils";
import { AiOutlineMenu } from "react-icons/ai";
import ProfileDropdown from "./ProfileDropdown";

// NavBar component. This component displays the navigation bar for the application.
const NavBar = ({ showMenu, toggleMenu, isLandingPage, currentPage }) => {
  return (
    <nav
      className={
        showMenu
          ? "sticky top-0 blur-lg mx-auto bg-dark-secondary/80 shadow-md bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6 z-10"
          : "sticky top-0 mx-auto bg-dark-secondary/80 shadow-md bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6 z-10"
      }
    >
      {/* Display the navigation bar (Depending on Landing Page) */}
      <div className="flex items-center justify-between">
        {isLandingPage ? (
          <>
            {/* QBxR Logo */}
            <Link
              to="/"
              className="text-3xl font-extrabold text-green-primary font-Audiowide"
            >
              <h1>QBxR</h1>
            </Link>
            {/* End QBxR Logo */}

            {/* Home Link */}
            <div className="hidden space-x-6 md:flex font-Audiowide text-md">
              <Link
                to="#"
                className={currentPageStyle(
                  "home",
                  currentPage,
                  "relative w-fit block text-green-primary underline underline-offset-[6.27px] decoration-[3px]",
                  "relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                )}
              >
                Home
              </Link>
              {/*End Home Link */}

              {/* About Us Link */}
              <Link
                to="#"
                className={currentPageStyle(
                  "about",
                  currentPage,
                  "relative w-fit block text-green-primary underline underline-offset-[6.27px] decoration-[3px]",
                  "relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                )}
              >
                About Us
              </Link>
              {/* End About Us Link */}

              {/* How QBxR Works Link */}
              <Link
                to="#"
                className={currentPageStyle(
                  "how",
                  currentPage,
                  "relative w-fit block text-green-primary underline underline-offset-[6.27px] decoration-[3px]",
                  "relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                )}
              >
                How QBxR Works
              </Link>
              {/* End How QBxR Works Link */}
            </div>

            {/* Sign In Link */}
            <Link
              to="/login"
              className="hidden py-2 px-6 text-light-primary bg-green-primary rounded-full baseline hover:bg-green-secondary md:block font-Audiowide"
            >
              Sign In
            </Link>
            {/* End Sign In Link */}

            {/* Mobile Menu (On Small Screen Size) */}
            <AiOutlineMenu
              className="md:hidden text-3xl text-green-primary cursor-pointer"
              onClick={toggleMenu}
            ></AiOutlineMenu>
            {/* End Mobile Menu (On Small Screen Size) */}
          </>
        ) : (
          <>
            {/* QBxR Logo */}
            <Link
              to="/home"
              className="text-3xl font-extrabold text-green-primary font-Audiowide"
            >
              <h1>QBxR</h1>
            </Link>
            {/* End QBxR Logo */}

            <div className="hidden space-x-6 md:flex font-Audiowide">
              {/* Home Link */}
              <Link
                to="/home"
                className={currentPageStyle(
                  "home",
                  currentPage,
                  "relative w-fit block text-green-primary underline underline-offset-[6.27px] decoration-[3px]",
                  "relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                )}
              >
                Home
              </Link>
              {/* End Home Link */}

              {/* Leaderboard Link */}
              <Link
                to="/leaderboard"
                className={currentPageStyle(
                  "leaderboard",
                  currentPage,
                  "relative w-fit block text-green-primary underline underline-offset-[6.27px] decoration-[3px]",
                  "relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                )}
              >
                Leaderboard
              </Link>
              {/* End Leaderboard Link */}

              {/* Search Link */}
              <Link
                to="/search"
                className={currentPageStyle(
                  "search",
                  currentPage,
                  "relative w-fit block text-green-primary underline underline-offset-[6.27px] decoration-[3px]",
                  "relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                )}
              >
                Search
              </Link>
              {/* End Search Link */}
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown />
            {/* End Profile Dropdown */}

            {/* Mobile Menu (On Small Screen Size) */}
            <AiOutlineMenu
              className="md:hidden text-3xl text-green-primary cursor-pointer"
              onClick={toggleMenu}
            ></AiOutlineMenu>
            {/* End Mobile Menu (On Small Screen Size) */}
          </>
        )}
      </div>
      {/* End Display the navigation bar (Depending on Landing Page) */}
    </nav>
  );
};

export default NavBar;
