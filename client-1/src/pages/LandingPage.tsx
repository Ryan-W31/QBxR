import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <ScrollToTop showMenu={showMenu} />
      <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={true} currentPage="home" />
      <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={true} currentPage="home" />

      <section id="hero" className={showMenu ? "blur-lg" : ""}>
        <div className="container mx-auto flex flex-col items-center justify-center mt-10 md:w-1/2 space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary font-Audiowide">
            QBxR: Quarterback Evaluation Platform
          </h1>
          <h3 className="text-md md:text-xl font-bold text-center text-primary font-Audiowide uppercase">
            Find your strengths and weaknesses.
          </h3>
          <p className="text-center text-foreground-secondary">
            QBxR makes it simple for coaches and scouts to find the players they need and vice versa.
          </p>
          <Button size="lg" className="text-2xl font-medium tracking-wide" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </section>

      <Card id="features" className={`${showMenu ? "blur-lg" : ""} m-8`}>
        <CardContent className="container mx-auto flex flex-col lg:flex-row p-8 space-y-12 lg:space-y-0 rounded-lg">
          <div className="lg:w-1/2 space-y-12">
            <h2 className="text-4xl font-bold text-center text-primary font-Audiowide uppercase">Why use QBxR?</h2>
            <p className="text-left text-foreground-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>

          <div className="lg:w-1/2 space-y-8">
            {[1, 2, 3].map((reason) => (
              <div key={reason} className="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0">
                <div className="rounded-full lg:bg-transparent bg-background-secondary">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 lg:py-1 text-primary font-Audiowide text-4xl">{`0${reason}`}</div>
                    <h3 className="text-base font-bold text-primary font-Audiowide lg:hidden">{`Reason ${reason}`}</h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden lg:block mb-4 text-lg font-bold text-primary font-Audiowide">{`Reason ${reason}`}</h3>
                  <p className="text-foreground-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section id="testimonials" className={showMenu ? "blur-lg" : ""}>
        <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
          <h2 className="text-4xl font-bold text-primary font-Audiowide uppercase">
            What Are Users Saying About QBxR?
          </h2>
          <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
            {[1, 2, 3].map((user, index) => (
              <Card
                key={user}
                className={`${
                  index === 0 ? "" : "hidden"
                } md:flex flex-col items-center px-6 space-y-6 rounded-lg md:w-1/3`}
              >
                <CardHeader className="text-lg font-bold text-primary font-Audiowide">{`User ${user}`}</CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground-secondary">{`“Testimonial ${user}”`}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="my-16">
            <Button size="lg" className="text-2xl font-medium tracking-wide" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="cta" className={`${showMenu ? "blur-lg" : ""} bg-primary`}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-24 md:py-12 space-y-12 md:space-y-0 lg:px-24">
          <h2 className="text-xl md:text-4xl font-bold text-center md:text-left text-light-primary font-Audiowide uppercase md:max-w-xl">
            Find your future quarterback today!
          </h2>
          <Button
            size="lg"
            className="text-xl md:text-2xl font-medium tracking-wide bg-foreground text-primary hover:bg-background"
            asChild
          >
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </section>

      <div className={`${showMenu ? "blur-lg" : ""} bg-dark-primary`}>
        <div className="flex flex-col md:flex-row items-center justify-center w-full py-2 md:space-x-8">
          {["Home", "About Us", "How It Works"].map((text) => (
            <Button key={text} variant="link" asChild>
              <Link to="/">{text}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
