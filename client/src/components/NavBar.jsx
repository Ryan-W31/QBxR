import React from "react";
import { classNames } from "../utils/utils";
import { Link } from "react-router-dom";
import { currentPageStyle } from "../utils/utils";
import { AiOutlineMenu } from "react-icons/ai";
import ProfileDropdown from "./ProfileDropdown";
import { Button, Navbar, Typography } from "@material-tailwind/react";

// NavBar component. This component displays the navigation bar for the application.
const NavBar = ({ showMenu, toggleMenu, isLandingPage, currentPage }) => {
  const navList = isLandingPage ? (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Home Link */}
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
    </ul>
  ) : (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
    </ul>
  );

  return (
    <Navbar
      className={classNames(
        showMenu ? "blur-lg" : "",
        "sticky w-full max-w-full rounded-none border-0 border-b-2 border-green-primary top-0 mx-auto bg-dark-secondary/80 shadow-md bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6 z-10"
      )}
    >
      {/* Display the navigation bar (Depending on Landing Page) */}
      <div className="flex items-center justify-between">
        {/* QBxR Logo */}
        <div className="flex items-center justify-center h-[60px] w-[105.6px]">
          <a
            href="/home"
            className="text-3xl font-extrabold text-green-primary font-Audiowide text-center"
          >
            QBxR
          </a>
        </div>
        {/* End QBxR Logo */}

        <div className="flex items-center gap-6 font-Audiowide text-md">
          <div className="hidden lg:block">{navList}</div>
        </div>

        {/* Sign In Link */}
        {isLandingPage ? (
          <div className="flex items-center">
            <Link to="/login">
              <Button className="hidden py-2 px-6 text-light-primary bg-green-primary rounded-full baseline hover:bg-green-secondary lg:inline-block font-Audiowide text-md">
                <span>Log In</span>
              </Button>
            </Link>
          </div>
        ) : null}
        {/* End Sign In Link */}

        {/* Profile Dropdown */}
        {!isLandingPage ? <ProfileDropdown /> : null}
        {/* End Profile Dropdown */}

        {/* Mobile Menu (On Small Screen Size) */}
        <AiOutlineMenu
          className="md:hidden text-3xl text-green-primary cursor-pointer"
          onClick={toggleMenu}
        ></AiOutlineMenu>
        {/* End Mobile Menu (On Small Screen Size) */}
      </div>
      {/* End Display the navigation bar (Depending on Landing Page) */}
    </Navbar>
  );
};

export default NavBar;
