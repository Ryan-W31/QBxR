import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div>
      <nav className="mx-auto sticky bg-slate-100/80 shadow-md top-0 bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-extrabold">
            <h1>QBxR</h1>
          </div>
          <div className="hidden space-x-6 md:flex">
            <Link
              to="#"
              className="relative w-fit block text-sky-600 underline underline-offset-[6.27px] decoration-[3px]"
            >
              Home
            </Link>
            <Link
              to="#"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 hover:text-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              About Us
            </Link>
            <Link
              to="#"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 hover:text-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              How QBxR Works
            </Link>
          </div>
          <Link
            to="/login"
            className="hidden p-3 px-6 pt-2 text-slate-200 bg-sky-600 rounded-full baseline hover:bg-sky-800 md:block"
          >
            Sign In
          </Link>
          <button
            className={
              toggleMenu
                ? "open block hamburger md:hidden focus:outline-none"
                : "block hamburger md:hidden focus:outline-none"
            }
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>

        <div className="md:hidden">
          <div
            className={
              toggleMenu
                ? "absolute flex flex-col items-center self-end py-2 mt-10 space-y-2 font-bold bg-offWhite sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
                : "absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
            }
          >
            <Link to="#" className="hover:text-sky-600">
              Home
            </Link>
            <Link to="#" className="hover:text-sky-600">
              About Us
            </Link>
            <Link to="#" className="hover:text-sky-600">
              How QBxR Works
            </Link>
          </div>
        </div>
      </nav>
      <section id="hero">
        <div className="container flex items-center justify-center mx-auto mt-10 space-y-0">
          <div className="flex flex-col mb-32 space-y-12 w-1/2">
            <h1 className=" text-4xl font-bold text-center text-sky-950 md:text-5xl">
              QBxR: Quarterback evaluation platform
            </h1>
            <h3 className="text-md font-bold text-center text-sky-950 md:text-xl">
              Find your strengths and weaknesses.
            </h3>
            <p className="text-center text-slate-700">
              QBxR makes is simple for coaches and scouts to find the players
              they need and vice versa.
            </p>
            <div className="flex justify-center">
              <Link
                to="/login"
                className="p-3 px-6 pt-2 text-slate-200 bg-sky-600 rounded-full baseline hover:bg-sky-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h2 className="md:max-w-md text-4xl font-bold text-center text-sky-950 md:text-left">
              Why use QBxR?
            </h2>
            <p className="md:max-w-sm text-center text-slate-700 md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="flex flex-col space-y-8 md:w-1/2">
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-full bg-slate-100md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-sky-600 text-4xl md:py-1">
                    01
                  </div>
                  <h3 className="text-base font-bold md:mb-4 text-sky-950 md:hidden">
                    Reason 1
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold text-sky-950 md:block">
                  Reason 1
                </h3>
                <p className="text-slate-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-full bg-slate-100md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-sky-600 text-4xl md:py-1">
                    02
                  </div>
                  <h3 className="text-base font-bold md:mb-4  text-sky-950 md:hidden">
                    Reason 2
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold text-sky-950 md:block">
                  Reason 2
                </h3>
                <p className="text-slate-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-full bg-slate-100 md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-sky-600 text-4xl md:py-1">
                    03
                  </div>
                  <h3 className="text-base font-bold md:mb-4 text-sky-950 md:hidden">
                    Reason 3
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold text-sky-950 md:block">
                  Reason 3
                </h3>
                <p className="text-slate-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials">
        <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
          <h2 className="text-4xl font-bold text-sky-950 text-center">
            What Are Users Saying About QBxR?
          </h2>
          <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
            <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-slate-200 md:w-1/3">
              <h5 className="text-lg font-bold text-sky-950 ">User 1</h5>
              <p className="text-sm text-slate-700">“Testimonial 1”</p>
            </div>

            {/* Testimonial 2 */}
            <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-slate-200 md:flex md:w-1/3">
              <h5 className="text-lg font-bold text-sky-950">User 2</h5>
              <p className="text-sm text-slate-700">“Testimonial 2”</p>
            </div>

            {/* Testimonial 3 */}
            <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-slate-200 md:flex md:w-1/3">
              <h5 className="text-lg font-bold text-sky-950">User 3</h5>
              <p className="text-sm text-slate-700">“Testimonial 3”</p>
            </div>
          </div>
          <div className="my-16">
            <Link
              to="/login"
              className="p-3 px-6 pt-2 text-slate-200 bg-sky-600 rounded-full baseline hover:bg-sky-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section id="cta" className="bg-sky-600">
        <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
          <h2 className="text-5xl font-bold leading-tight text-center text-slate-200 md:text-4xl md:max-w-xl md:text-left">
            Find your future quarteback today!
          </h2>
          <div>
            <Link
              to="/login"
              className="p-3 px-6 pt-2 text-sky-600 bg-white rounded-full shadow-2xl baseline hover:bg-gray-900"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <div className="bg-gray-900">
        <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <Link
              to="#"
              className="flex flex-col items-center text-slate-200 hover:text-sky-400"
            >
              Home
            </Link>
            <Link
              to="#"
              className="flex flex-col items-center text-slate-200 hover:text-sky-400"
            >
              Products
            </Link>
            <Link
              to="#"
              className="flex flex-col items-center text-slate-200 hover:text-sky-400"
            >
              About
            </Link>
          </div>
          <div className="flex flex-col justify-between">
            <form>
              <div className="flex space-x-3">
                <input
                  type="text"
                  className="flex-1 px-4 rounded-full focus:outline-none"
                  placeholder="Updated in your inbox"
                />
                <button className="px-6 py-2 text-slate-200 rounded-full bg-sky-600 hover:bg-sky-400 focus:outline-none">
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
