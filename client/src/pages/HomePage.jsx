import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "../components/ScoreCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  function checkData() {
    if (webData === undefined && vrData === undefined) {
      return <p className="text-xl">Take the Web and VR Tests</p>;
    } else if (webData === null) {
      return <p className="text-xl">Take the Web Test</p>;
    } else {
      return <p className="text-xl">Take the VR Test</p>;
    }
  }

  const webData = [
    // { title: "Reaction Test", score: 35 },
    // { title: "Play Identification", score: 55 },
    // { title: "Defense Reading", score: 75 },
    // { title: "Critical Thinking", score: 95 },
  ];
  const vrData = [
    // { title: "Reaction Test", score: 35 },
    // { title: "Play Identification", score: 55 },
    // { title: "Defense Reading", score: 75 },
    // { title: "Critical Thinking", score: 95 },
  ];

  const content = (
    <div>
      <ScrollToTop showMenu={showMenu} />
      <NavBar
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="home"
      />
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="home"
      />

      <div className={showMenu ? "blur-lg pointer-events-none" : ""}>
        <div className="container flex flex-col mx-auto mt-10 space-y-12 md:space-y-0 bg-dark-secondary/80 p-5 rounded-lg justify-center border-t-4 border-green-primary">
          <div className="text-center justify-center font-Audiowide">
            <h1 className="text-green-primary font-bold text-6xl">
              Welcome to QBxR
            </h1>
            <div className="text-light-primary m-10 text-4xl">
              <p className="text-light-secondary">Your QBxR Score:</p>
              {webData !== null && vrData !== null ? (
                <SkeletonTheme
                  baseColor="#0C0C0C"
                  highlightColor="#AAAAAA"
                  duration={1.5}
                  borderRadius="0.5rem"
                >
                  {webData?.length === 0 || vrData?.length === 0 ? (
                    <Skeleton width={75} height={75} />
                  ) : (
                    <p className="m-4 text-3xl">85</p>
                  )}
                </SkeletonTheme>
              ) : (
                <div>
                  <p className="m-4 text-3xl">No Data</p>
                  {checkData()}
                </div>
              )}
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-evenly md:space-x-4 font-Audiowide">
            <ScoreCard
              title={"Your Web Test Scores"}
              errMessage={"Take The Web Test On Your Profile Page"}
              size="3"
              data={webData}
            />

            <div class="my-4 md:my-0"></div>

            <ScoreCard
              title={"Your VR Test Scores"}
              errMessage={"Take The VR Test On Your Profile Page"}
              size="3"
              data={vrData}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return content;
};

export default HomePage;
