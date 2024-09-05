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
        <div className="container mx-auto mt-10 flex flex-col items-center justify-center space-y-12 md:w-1/2">
          <h1 className="text-center font-Audiowide text-4xl font-bold text-primary md:text-5xl">
            QBxR: Quarterback Evaluation Platform
          </h1>
          <h3 className="text-md text-center font-Audiowide font-bold uppercase text-primary md:text-xl">
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
        <CardContent className="container mx-auto flex flex-col space-y-12 rounded-lg p-8 lg:flex-row lg:space-y-0">
          <div className="space-y-12 lg:w-1/2">
            <h2 className="text-center font-Audiowide text-4xl font-bold uppercase text-primary">Why use QBxR?</h2>
            <p className="text-left text-foreground-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>

          <div className="space-y-8 lg:w-1/2">
            {[1, 2, 3].map((reason) => (
              <div key={reason} className="flex flex-col space-y-3 lg:flex-row lg:space-x-6 lg:space-y-0">
                <div className="rounded-full bg-background-secondary lg:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 font-Audiowide text-4xl text-primary lg:py-1">{`0${reason}`}</div>
                    <h3 className="font-Audiowide text-base font-bold text-primary lg:hidden">{`Reason ${reason}`}</h3>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 hidden font-Audiowide text-lg font-bold text-primary lg:block">{`Reason ${reason}`}</h3>
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
        <div className="mx-auto mt-32 max-w-6xl px-5 text-center">
          <h2 className="font-Audiowide text-4xl font-bold uppercase text-primary">
            What Are Users Saying About QBxR?
          </h2>
          <div className="mt-24 flex flex-col md:flex-row md:space-x-6">
            {[1, 2, 3].map((user, index) => (
              <Card
                key={user}
                className={`${
                  index === 0 ? "" : "hidden"
                } flex-col items-center space-y-6 rounded-lg px-6 md:flex md:w-1/3`}
              >
                <CardHeader className="font-Audiowide text-lg font-bold text-primary">{`User ${user}`}</CardHeader>
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
        <div className="container mx-auto flex flex-col items-center justify-between space-y-12 py-24 md:flex-row md:space-y-0 md:py-12 lg:px-24">
          <h2 className="text-light-primary text-center font-Audiowide text-xl font-bold uppercase md:max-w-xl md:text-left md:text-4xl">
            Find your future quarterback today!
          </h2>
          <Button
            size="lg"
            className="bg-foreground text-xl font-medium tracking-wide text-primary hover:bg-background md:text-2xl"
            asChild
          >
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </section>

      <div className={`${showMenu ? "blur-lg" : ""} bg-dark-primary`}>
        <div className="flex w-full flex-col items-center justify-center py-2 md:flex-row md:space-x-8">
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
