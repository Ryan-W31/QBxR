import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    number: "01",
    title: "Real-Game Simulations with Virtual Reality",
    description:
      "QBxR leverages virtual reality to recreate game-like situations that mimic the complexities quarterbacks face on the field. The platform's VR tests immerse players in decision-making scenarios, allowing them to react under realistic conditions that simulate NFL gameplay. This technology provides more accurate performance assessments than traditional methods, offering insights into how players handle pressure, speed, and decision-making.",
  },
  {
    number: "02",
    title: "Data-Driven Player Evaluations",
    description:
      "Traditional scouting often relies heavily on subjective assessments and limited metrics. QBxR changes that by offering a comprehensive, data-driven analysis of a quarterback's traits, from reaction times to decision-making speed and accuracy. This wealth of data ensures that scouts, coaches, and players have access to reliable, objective measurements that can significantly improve draft outcomes and player development strategies.",
  },
  {
    number: "03",
    title: "For Players, Coaches, and Scouts Alike",
    description:
      "QBxR isn't just a tool for players—it's a valuable resource for coaches and scouts who want to compare and monitor player performance. The platform's web-based interface and detailed performance metrics allows football personnel to understand players' strengths and weaknesses, giving them actionable insights to refine their decision. QBxR provides a more accessible way to assess and compare potential draftees, ensuring informed decisions are made with confidence.",
  },
];

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
              In today's world, where technology drives innovation in every sector, sports are no exception. The NFL
              draft is one of the most crucial moments in a player's career, especially for quarterbacks, who often face
              the toughest transition from college to the professional level. Evaluating a player's readiness for the
              NFL has traditionally been subjective, but QBxR changes the game by providing a cutting-edge, data-driven
              solution to assess a quarterback's potential.
              <br />
              <br />
              QBxR stands out by offering a unique blend of virtual reality and advanced testing to simulate real game
              scenarios, allowing players to showcase their abilities in a high-pressure, decision-making environment.
              By combining expert-backed research with state-of-the-art technology, QBxR delivers an experience that
              doesn't just measure a player's skills but mirrors the demands they will face on the field. Whether you're
              a player looking to improve or a scout aiming to make the best draft decision, QBxR is an essential tool
              for a deep, accurate understanding of quarterback performance.
            </p>
          </div>

          <div className="space-y-8 lg:w-1/2">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex flex-col space-y-3 lg:flex-row lg:space-x-6 lg:space-y-0">
                <div className="rounded-full bg-background-secondary lg:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 font-Audiowide text-4xl text-primary lg:py-1">{reason.number}</div>
                    <h3 className="font-Audiowide text-base font-bold text-primary lg:hidden uppercase">
                      {reason.title}
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 hidden font-Audiowide text-lg font-bold text-primary lg:block uppercase">
                    {reason.title}
                  </h3>
                  <p className="text-foreground-secondary">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
