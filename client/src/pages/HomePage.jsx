import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "../components/ScoreCard";
import ProfileCard from "../components/ProfileCard";
import FavoritesCard from "../components/FavoritesCard";
import {
  selectCurrentScores,
  selectCurrentUser,
  selectCurrentId,
} from "../hooks/auth/authSlice";
import { checkData } from "../utils/utils";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";

// HomePage component. This component displays the home page with the user's QBxR score, web test scores, and VR test scores.
const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(null);
  const [showBlur, setShowBlur] = useState(false);

  const myId = useSelector(selectCurrentId);
  const user = useSelector(selectCurrentUser);
  const data = useSelector(selectCurrentScores);
  const qbxrData = data.qbxr;
  const webData = data.web;
  const vrData = data.vr;

  const toggleBlur = () => setShowBlur((prevState) => !prevState);

  // Toggle the visibility of the mobile menu
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  const handleClose = () => {
    setShowProfile(null);
    toggleBlur();
  };

  // Home page content
  const content = (
    <div>
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="home"
      />

      <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
        <ScrollToTop showMenu={showMenu} />
        <NavBar
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          isLandingPage={false}
          currentPage="home"
        />
        <Card className="container flex flex-col mx-auto mt-10 space-y-12 md:space-y-0 bg-dark-secondary/80 p-5 rounded-lg justify-center border-t-4 border-green-primary">
          <CardHeader className="mt-2 bg-transparent shadow-none text-center">
            <h1 className="text-green-primary font-bold text-6xl font-Audiowide">
              Welcome to QBxR
            </h1>
          </CardHeader>
          {user?.role === "player" && (
            <>
              <div className="text-center justify-center font-Audiowide">
                <CardBody className="text-light-primary text-4xl">
                  <p className="text-light-secondary">Your QBxR Score:</p>
                  {qbxrData.qbxr_score ? (
                    <SkeletonTheme
                      baseColor="#0C0C0C"
                      highlightColor="#AAAAAA"
                      duration={1.5}
                      borderRadius="0.5rem"
                    >
                      {qbxrData.qbxr_score ? (
                        <p className="m-4 text-3xl">{qbxrData.qbxr_score}</p>
                      ) : (
                        <Skeleton width={75} height={75} />
                      )}
                    </SkeletonTheme>
                  ) : (
                    <div>
                      <p className="m-4 text-3xl">No Data</p>
                      {checkData(webData, vrData)}
                    </div>
                  )}
                </CardBody>
              </div>
              <CardBody className="flex md:flex-row flex-col justify-evenly md:space-x-4 font-Audiowide">
                <ScoreCard
                  title={"Your Web Test Scores"}
                  errMessage={"Take The Web Test On Your Profile Page"}
                  size="3"
                  isLoading={false}
                  data={webData}
                />

                <div className="my-4 md:my-0"></div>

                <ScoreCard
                  title={"Your VR Test Scores"}
                  errMessage={"Take The VR Test On Your Profile Page"}
                  size="3"
                  isLoading={false}
                  data={vrData}
                />
              </CardBody>
            </>
          )}
          {user?.role === "nonplayer" && (
            <FavoritesCard
              userId={myId}
              toggleBlur={toggleBlur}
              setShowProfile={setShowProfile}
            />
          )}
        </Card>
      </div>
      <ProfileCard
        myId={myId}
        id={showProfile?._id}
        name={`${showProfile?.firstname} ${showProfile?.lastname}`}
        school={showProfile?.school_organization}
        score={showProfile?.score}
        isVisible={showProfile !== null}
        onClose={handleClose}
      />
    </div>
  );

  return content;
};

export default HomePage;
