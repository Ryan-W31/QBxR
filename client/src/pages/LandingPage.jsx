import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiArrowFromBottom } from "react-icons/bi";

const LandingPage = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  const toggleScollToTop = () => {
    if (window.scrollY > 300) {
      setIsScrollToTopVisible(true);
    } else {
      setIsScrollToTopVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleScollToTop);

    return () => {
      window.removeEventListener("scroll", toggleScollToTop);
    };
  }, []);

  return (
    <div className="bg-dark-primary">
      <div
        className={
          toggleMenu ? "hidden fixed bottom-2 left-2" : "fixed bottom-2 left-2"
        }
      >
        <button
          type="button"
          onClick={scrollToTop}
          className={classNames(
            isScrollToTopVisible ? "opacity-100" : "opacity-0",
            "bg-green-primary hover:bg-green-secondary inline-flex items-center rounded-full p-3 text-light-primary transition-opacity"
          )}
        >
          <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <nav
        className={
          toggleMenu
            ? "blur-lg mx-auto sticky bg-dark-secondary/80 shadow-md top-0 bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6"
            : "mx-auto sticky bg-dark-secondary/80 shadow-md top-0 bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6"
        }
      >
        <div className="flex items-center justify-between">
          <div className="text-3xl font-extrabold text-green-primary font-Audiowide">
            <h1>QBxR</h1>
          </div>
          <div className="hidden space-x-6 md:flex">
            <Link
              to="#"
              className="relative w-fit block text-green-primary underline underline-offset-[6.27px] decoration-[3px]"
            >
              Home
            </Link>
            <Link
              to="#"
              className="relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              About Us
            </Link>
            <Link
              to="#"
              className="relative w-fit block text-light-primary after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-primary hover:text-green-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              How QBxR Works
            </Link>
          </div>
          <Link
            to="/login"
            className="hidden py-2 px-6 text-light-primary font-Audiowide  bg-green-primary rounded-full baseline hover:bg-green-secondary md:block"
          >
            Sign In
          </Link>
          <AiOutlineMenu
            className="md:hidden text-3xl text-green-primary cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          ></AiOutlineMenu>
        </div>
      </nav>

      <div className="md:hidden">
        <div
          className={
            toggleMenu
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
                onClick={() => setToggleMenu(!toggleMenu)}
                className="cursor-pointer text-3xl text-green-primary"
              />
            </div>

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
          </div>
        </div>
      </div>

      <section id="hero" className={toggleMenu ? "blur-lg" : ""}>
        <div className="container flex items-center justify-center mx-auto mt-10 space-y-0">
          <div className="flex flex-col mb-32 space-y-12 w-1/2">
            <h1 className=" text-4xl font-bold text-center text-green-primary md:text-5xl font-Audiowide">
              QBxR: Quarterback Evaluation Platform
            </h1>
            <h3 className="text-md font-bold text-center text-green-primary md:text-xl">
              Find your strengths and weaknesses.
            </h3>
            <p className="text-center text-light-secondary">
              QBxR makes is simple for coaches and scouts to find the players
              they need and vice versa.
            </p>
            <div className="flex justify-center">
              <Link
                to="/login"
                className="py-2 px-6 text-light-primary font-Audiowide bg-green-primary rounded-full baseline hover:bg-green-secondary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className={toggleMenu ? "blur-lg" : ""}>
        <div className="container flex flex-col mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row bg-dark-secondary/50 p-8 rounded-lg">
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h2 className="text-4xl font-bold font-Audiowide text-center text-green-primary">
              Why use QBxR?
            </h2>
            <p className="text-light-secondary text-left">
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
              <div className="rounded-full bg-dark-secondary md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-green-primary font-Audiowide text-4xl md:py-1">
                    01
                  </div>
                  <h3 className="text-base font-bold font-Audiowide md:mb-4 text-green-primary md:hidden">
                    Reason 1
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-Audiowide font-bold text-green-primary md:block">
                  Reason 1
                </h3>
                <p className="text-light-secondary">
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
              <div className="rounded-full bg-dark-secondary md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-green-primary font-Audiowide text-4xl md:py-1">
                    02
                  </div>
                  <h3 className="text-base font-bold font-Audiowide md:mb-4  text-green-primary md:hidden">
                    Reason 2
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold font-Audiowide text-green-primary md:block">
                  Reason 2
                </h3>
                <p className="text-light-secondary">
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
              <div className="rounded-full bg-dark-secondary md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-green-primary font-Audiowide text-4xl md:py-1">
                    03
                  </div>
                  <h3 className="text-base font-bold font-Audiowide md:mb-4 text-green-primary md:hidden">
                    Reason 3
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold font-Audiowide text-green-primary md:block">
                  Reason 3
                </h3>
                <p className="text-light-secondary">
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
      <section id="testimonials" className={toggleMenu ? "blur-lg" : ""}>
        <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
          <h2 className="text-4xl font-bold font-Audiowide text-green-primary text-center">
            What Are Users Saying About QBxR?
          </h2>
          <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
            <div className="flex flex-col items-center p-6 space-y-4 rounded-lg bg-dark-secondary/50 md:w-1/3">
              <h5 className="text-lg font-bold font-Audiowide text-green-primary ">
                User 1
              </h5>
              <p className="text-sm text-light-secondary">“Testimonial 1”</p>
            </div>

            {/* Testimonial 2 */}
            <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-dark-secondary/50 md:flex md:w-1/3">
              <h5 className="text-lg font-bold font-Audiowide text-green-primary">
                User 2
              </h5>
              <p className="text-sm text-light-secondary">“Testimonial 2”</p>
            </div>

            {/* Testimonial 3 */}
            <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-dark-secondary/50 md:flex md:w-1/3">
              <h5 className="text-lg font-bold font-Audiowide text-green-primary">
                User 3
              </h5>
              <p className="text-sm text-light-secondary">“Testimonial 3”</p>
            </div>
          </div>
          <div className="my-16">
            <Link
              to="/login"
              className="py-2 px-6 text-light-primary font-Audiowide bg-green-primary rounded-full baseline hover:bg-green-secondary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section
        id="cta"
        className={toggleMenu ? "blur-lg bg-green-primary" : "bg-green-primary"}
      >
        <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
          <h2 className="text-5xl font-bold leading-tight text-center text-light-primary font-Audiowide md:text-4xl md:max-w-xl md:text-left">
            Find your future quarterback today!
          </h2>
          <div>
            <Link
              to="/login"
              className="py-2 px-6 text-green-primary font-Audiowide bg-light-primary rounded-full shadow-2xl baseline hover:bg-dark-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <div
        className={toggleMenu ? "blur-lg bg-dark-primary" : "bg-dark-primary"}
      >
        <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-row justify-center py-2 space-x-8">
            <Link
              to="#"
              className="flex flex-col items-center text-light-primary hover:text-green-primary"
            >
              Home
            </Link>
            <Link
              to="#"
              className="flex flex-col items-center text-light-primary hover:text-green-primary"
            >
              Products
            </Link>
            <Link
              to="#"
              className="flex flex-col items-center text-light-primary hover:text-green-primary"
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
                <button className="px-6 py-2 text-light-primary font-Audiowide rounded-full bg-green-primary hover:bg-green-scondary focus:outline-none">
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
