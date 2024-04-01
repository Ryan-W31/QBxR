import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const MobileMenu = ({ showMenu, toggleMenu, isLandingPage }) => {
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
              <div className="flex flex-col mt-6 space-y-6">
                <Link
                  to="#"
                  className="text-light-primary hover:text-green-primary font-bold"
                >
                  Home
                </Link>
                <Link
                  to="#"
                  className="text-light-primary hover:text-green-primary font-bold"
                >
                  About Us
                </Link>
                <Link
                  to="#"
                  className="text-light-primary hover:text-green-primary font-bold"
                >
                  How QBxR Works
                </Link>
                <Link
                  to="/login"
                  className="py-2 px-6 text-light-primary font-Audiowide bg-green-primary rounded-full baseline hover:bg-green-secondary text-center"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="flex flex-col mt-6 space-y-6">
                <Link
                  to="#"
                  className="text-light-primary hover:text-green-primary font-bold"
                >
                  Home
                </Link>
                <Link
                  to="#"
                  className="text-light-primary hover:text-green-primary font-bold"
                >
                  Leaderboard
                </Link>
                <Link
                  to="#"
                  className="text-light-primary hover:text-green-primary font-bold"
                >
                  Search
                </Link>
                <Link
                  to="#"
                  className="text-light-primary hover:text-green-primary font-bold"
                >
                  Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
