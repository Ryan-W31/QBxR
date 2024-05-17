import React, { useState } from "react";

import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ProgressBar from "../components/ProgressBar";

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hasWebData, setHasWebData] = useState(false);
  const [hasVRData, setHasVRData] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  function checkData() {
    if (!hasWebData && !hasVRData) {
      return <p className="text-xl">Take the Web and VR Tests</p>;
    } else if (!hasWebData) {
      return <p className="text-xl">Take the Web Test</p>;
    } else {
      return <p className="text-xl">Take the VR Test</p>;
    }
  }

  const content = (
    <div className="md:h-screen bg-dark-primary">
      <ScrollToTop showMenu={showMenu} />
      <NavBar
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
      />
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
      />

      <div className={showMenu ? "blur-lg" : ""}>
        <div className="container flex flex-col mx-auto mt-10 space-y-12 md:space-y-0 bg-dark-secondary/80 p-8 rounded-lg justify-center">
          <div className="text-center justify-center font-Audiowide">
            <h1 className="text-green-primary font-bold text-6xl">
              Welcome to QBxR
            </h1>
            <div className="text-light-primary m-10 text-4xl">
              <p className="text-light-secondary">Your QBxR Score:</p>
              {hasWebData && hasVRData ? (
                <p className="m-4 text-3xl">85</p>
              ) : (
                <div>
                  <p className="m-4 text-3xl">No Data</p>
                  {checkData()}
                </div>
              )}
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-around font-Audiowide">
            <div className="flex flex-col text-light-secondary p-10 bg-dark-secondary rounded-lg">
              <p className="md:text-4xl sm:text-2xl mb-5 align-center text-center">
                Your Web Test Scores
              </p>
              {!hasWebData ? (
                <div className="text-center text-light-primary">
                  <p className="text-3xl sm:text-2xl justify-center mb-4">
                    No Data
                  </p>
                  <p className="text-xl sm:text-sm">
                    Take The Web Test On Your Profile Page
                  </p>
                </div>
              ) : (
                <div>
                  <ProgressBar title={"Reaction Test"} score={35} />
                  <ProgressBar title={"Play Identification"} score={55} />
                  <ProgressBar title={"Defense Reading"} score={75} />
                  <ProgressBar title={"Critical Thinking"} score={95} />
                </div>
              )}
            </div>
            <div className="flex flex-col text-light-secondary p-10 bg-dark-secondary rounded-lg">
              <p className="md:text-4xl sm:text-2xl mb-5 align-center text-center">
                Your VR Test Scores
              </p>
              {!hasVRData ? (
                <div className="text-center text-light-primary">
                  <p className="text-3xl sm:text-2xl justify-center mb-4">
                    No Data
                  </p>
                  <p className="text-xl sm:text-sm">
                    Take The VR Test On Your Profile Page
                  </p>
                </div>
              ) : (
                <div>
                  <ProgressBar title={"Reaction Test"} score={35} />
                  <ProgressBar title={"Play Identification"} score={55} />
                  <ProgressBar title={"Defense Reading"} score={75} />
                  <ProgressBar title={"Critical Thinking"} score={95} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
};

export default HomePage;
