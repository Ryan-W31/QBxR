import React from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import LeaderboardCard from "../components/LeaderboardCard";
import { classNames } from "../utils/utils";

const LeaderboardPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hasWebData, setHasWebData] = useState(false);
  const [hasVRData, setHasVRData] = useState(false);
  const [hasRank, setHasRank] = useState(false);

  const toggleRank = () => {
    if (hasWebData && hasVRData) {
      setHasRank(true);
    }
  };

  function checkData() {
    if (!hasWebData && !hasVRData) {
      return <p className="text-lg">Take the Web and VR Tests</p>;
    } else if (!hasWebData) {
      return <p className="text-lg">Take the Web Test</p>;
    } else {
      return <p className="text-lg">Take the VR Test</p>;
    }
  }

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  window.onload = function () {
    toggleRank();
    console.log("loaded");
  };

  const content = (
    <div className="h-screen bg-dark-primary">
      <ScrollToTop showMenu={showMenu} />
      <NavBar
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="leaderboard"
      />
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="leaderboard"
      />

      <div
        className={classNames(
          showMenu ? "blur-lg" : "",
          "flex flex-col bg-dark-primary justify-center items-center"
        )}
      >
        <div className="md:w-3/4 min-w-96 bg-dark-secondary/80 p-8 px-6 rounded-lg mt-10 space-y-10">
          <div>
            <h1 className="text-6xl font-bold font-Audiowide text-green-primary text-center mb-4">
              Leaderboard
            </h1>
            {hasRank ? (
              <div className="font-bold font-Audiowide text-light-primary text-center">
                <h2 className="text-2xl mb-2">Your Rank: 1</h2>
                <p className="text-lg">Your Score: 74</p>
              </div>
            ) : (
              <div className="font-bold font-Audiowide text-light-primary text-center">
                <h2 className="text-2xl mb-2">Your Rank: No Data</h2>
                {checkData()}
              </div>
            )}
          </div>
          <div>
            <div className="relative overflow-x-auto sm:rounded-lg font-Audiowide">
              <table className="w-full text-sm text-center text-light-primary">
                <thead className="text-xs text-light-primary uppercase bg-dark-secondary border-b">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      School/Organization
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <LeaderboardCard
                    rank={1}
                    name="John Doe"
                    school="University of Central Florida"
                    score="74"
                  />
                  <LeaderboardCard
                    rank={2}
                    name="John Doe"
                    school="University of Central Florida"
                    score="73"
                  />
                  <LeaderboardCard
                    rank={3}
                    name="John Doe"
                    school="University of Central Florida"
                    score="72"
                  />
                  <LeaderboardCard
                    rank={4}
                    name="John Doe"
                    school="University of Central Florida"
                    score="71"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default LeaderboardPage;
