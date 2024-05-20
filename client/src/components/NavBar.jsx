import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import ProfileDropdown from "./ProfileDropdown";

const NavBar = ({ showMenu, toggleMenu, isLandingPage, currentPage }) => {
  function currentPageStyle(navBarItem) {
    if (navBarItem === currentPage) {
      return "relative w-fit block text-green-primary underline underline-offset-[6.27px] decoration-[3px]";
    } else {
      return "relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center";
    }
  }
  return (
    <nav
      className={
        showMenu
          ? "sticky top-0 blur-lg mx-auto bg-dark-secondary/80 shadow-md bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6 z-10"
          : "sticky top-0 mx-auto bg-dark-secondary/80 shadow-md bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6 z-10"
      }
    >
      <div className="flex items-center justify-between">
        <div className="text-3xl font-extrabold text-green-primary font-Audiowide">
          <h1>QBxR</h1>
        </div>
        {isLandingPage ? (
          <>
            <div className="hidden space-x-6 md:flex font-Audiowide text-md">
              <Link to="#" className={currentPageStyle("home")}>
                Home
              </Link>
              <Link to="#" className={currentPageStyle("about")}>
                About Us
              </Link>
              <Link to="#" className={currentPageStyle("how")}>
                How QBxR Works
              </Link>
            </div>
            <Link
              to="/login"
              className="hidden py-2 px-6 text-light-primary bg-green-primary rounded-full baseline hover:bg-green-secondary md:block font-Audiowide"
            >
              Sign In
            </Link>
            <AiOutlineMenu
              className="md:hidden text-3xl text-green-primary cursor-pointer"
              onClick={toggleMenu}
            ></AiOutlineMenu>
          </>
        ) : (
          <>
            <div className="hidden space-x-6 md:flex font-Audiowide">
              <Link to="/home" className={currentPageStyle("home")}>
                Home
              </Link>
              <Link
                to="/leaderboard"
                className={currentPageStyle("leaderboard")}
              >
                Leaderboard
              </Link>
              <Link to="#" className={currentPageStyle("search")}>
                Search
              </Link>
            </div>
            <ProfileDropdown />
            <AiOutlineMenu
              className="md:hidden text-3xl text-green-primary cursor-pointer"
              onClick={toggleMenu}
            ></AiOutlineMenu>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
