import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "../components/ScoreCard";
import {
  useGetVRScoreQuery,
  useGetWebScoreQuery,
} from "../hooks/users/scoreApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../hooks/auth/authSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { data: vrData, isLoading: isLoadingVRScore } = useGetVRScoreQuery(
    useSelector(selectCurrentId),
    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
  const { data: webData, isLoading: isLoadingWebScore } = useGetWebScoreQuery(
    useSelector(selectCurrentId),
    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  function checkData() {
    if (
      (webData === undefined || webData?.length === 0) &&
      (vrData === undefined || vrData?.length === 0)
    ) {
      return (
        <p className="text-xl font-Audiowide text-light-primary">
          Take the Web and VR Tests
        </p>
      );
    } else if (webData === undefined || webData?.length === 0) {
      return (
        <p className="text-xl font-Audiowide text-light-primary">
          Take the Web Test
        </p>
      );
    } else {
      return (
        <p className="text-xl font-Audiowide text-light-primary">
          Take the VR Test
        </p>
      );
    }
  }

  function getQBxRScore() {
    var webScores = webData.filter((item) => item.score !== null);
    var vrScores = vrData.filter((item) => item.score !== null);

    var webSum = webScores.reduce((acc, item) => acc + item.score, 0);
    var vrSum = vrScores.reduce((acc, item) => acc + item.score, 0);

    return Math.round((webSum + vrSum) / (webScores.length + vrScores.length));
  }

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
              {webData !== undefined &&
              webData?.length !== 0 &&
              vrData !== undefined &&
              vrData?.length !== 0 ? (
                <SkeletonTheme
                  baseColor="#0C0C0C"
                  highlightColor="#AAAAAA"
                  duration={1.5}
                  borderRadius="0.5rem"
                >
                  {isLoadingWebScore || isLoadingVRScore ? (
                    <Skeleton width={75} height={75} />
                  ) : (
                    <p className="m-4 text-3xl">{getQBxRScore()}</p>
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
              isLoading={isLoadingWebScore}
              data={webData}
            />

            <div class="my-4 md:my-0"></div>

            <ScoreCard
              title={"Your VR Test Scores"}
              errMessage={"Take The VR Test On Your Profile Page"}
              size="3"
              isLoading={isLoadingVRScore}
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
