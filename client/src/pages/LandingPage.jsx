import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import { Button, Input } from "@material-tailwind/react";
// LandingPage component. This component displays the landing page.
const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Landing page content
  return (
    <div>
      <ScrollToTop showMenu={showMenu} />
      <NavBar
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={true}
        currentPage="home"
      />
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={true}
        currentPage={"home"}
      />
      <section
        id="hero"
        className={showMenu ? "blur-lg pointer-events-none" : ""}
      >
        <div className="container flex items-center justify-center mx-auto mt-10 space-y-0">
          <div className="flex flex-col mb-32 space-y-12 w-1/2">
            <h1 className=" text-4xl font-bold text-center text-green-primary md:text-5xl font-Audiowide">
              QBxR: Quarterback Evaluation Platform
            </h1>
            <h3 className="text-md font-bold text-center text-green-primary md:text-xl font-Audiowide">
              Find your strengths and weaknesses.
            </h3>
            <p className="text-center text-light-secondary">
              QBxR makes is simple for coaches and scouts to find the players
              they need and vice versa.
            </p>
            <div className="flex justify-center">
              <Link to="/login">
                <Button className="py-2 px-6 text-md text-light-primary font-Audiowide bg-green-primary rounded-full baseline hover:bg-green-secondary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className={showMenu ? "blur-lg" : ""}>
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
      <section id="testimonials" className={showMenu ? "blur-lg" : ""}>
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
            <Link to="/login">
              <Button className="py-2 px-6 text-md text-light-primary font-Audiowide bg-green-primary rounded-full baseline hover:bg-green-secondary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section
        id="cta"
        className={showMenu ? "blur-lg bg-green-primary" : "bg-green-primary"}
      >
        <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
          <h2 className="text-5xl font-bold leading-tight text-center text-light-primary font-Audiowide md:text-4xl md:max-w-xl md:text-left">
            Find your future quarterback today!
          </h2>
          <div>
            <Link to="/login">
              <Button className="py-2 px-6 text-md text-green-primary font-Audiowide bg-light-primary rounded-full baseline hover:bg-dark-primary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <div className={showMenu ? "blur-lg bg-dark-primary" : "bg-dark-primary"}>
        <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-row justify-center py-2 space-x-8">
            <Link to="/">
              <Button
                variant="text"
                className="text-md text-light-primary font-Audiowide hover:text-green-primary"
              >
                Home
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="text"
                className="text-md text-light-primary font-Audiowide rounded-full hover:text-green-primary"
              >
                About
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="text"
                className="text-md text-light-primary font-Audiowide rounded-full hover:text-green-primary"
              >
                How it works
              </Button>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <form>
              <div className="flex flex-row space-x-3 md:py-2">
                <Input size="lg" color="white" label="Search" />
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
