import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import LeaderboardCard from "../components/LeaderboardCard";
import ProfileCard from "../components/ProfileCard";
import { useGetLeaderboardQuery } from "../hooks/users/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentId, selectCurrentScores } from "../hooks/auth/authSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";

// LeaderboardPage component. This component displays the leaderboard page with the user's rank, name, school, and score.
const LeaderboardPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [showProfile, setShowProfile] = useState(null);
  const [visibleRows, setVisibleRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const myId = useSelector(selectCurrentId);

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLeaderboardQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const qbxrData = useSelector(selectCurrentScores).qbxr;

  // Load more rows when the user scrolls to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setVisibleRows((prevVisibleRows) =>
          Math.min(prevVisibleRows + 10, totalRows)
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalRows]);

  // Set the total number of rows when the users data changes
  useEffect(() => {
    if (users) {
      setTotalRows(users.length);
    }
  }, [users]);

  // Handle the row click event. Display the profile card for the selected user and blur the background.
  const handleRowClick = (profile) => {
    setShowProfile(profile);
    toggleBlur();
  };

  // Close the profile card and remove the blur effect
  const handleClose = () => {
    setShowProfile(null);
    toggleBlur();
  };

  // Toggle the visibility of the mobile menu
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  // Toggle the blur effect
  const toggleBlur = () => {
    setShowBlur((prevState) => !prevState);
  };

  let content;

  // Display loading message while fetching data
  if (isLoading)
    content = (
      <div className="text-light-primary font-Audiowide">Loading...</div>
    );

  // Display error message if there is an error fetching data
  if (isError) {
    content = (
      <p className="errmsg text-light-primary">{error?.data?.message}</p>
    );
  }

  // Display leaderboard content if the data is successfully fetched
  if (isSuccess) {
    // Display the leaderboard content
    const tableContent =
      users !== undefined && users?.length !== 0
        ? users.map((user) => (
            <LeaderboardCard
              key={user.id}
              rank={user.rank}
              name={user.name}
              school={user.school}
              score={user.score}
              onClick={() => handleRowClick(user)}
            />
          ))
        : // Display skeleton cards while loading data
          [...Array(visibleRows)].map((_, index) => (
            <LeaderboardCard key={index} skeleton={true} />
          ));

    // Display the leaderboard content
    content = (
      <div>
        <MobileMenu
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          isLandingPage={false}
          currentPage="leaderboard"
        />

        <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
          <ScrollToTop showMenu={showMenu} />
          <NavBar
            showMenu={showMenu}
            toggleMenu={toggleMenu}
            isLandingPage={false}
            currentPage="leaderboard"
          />
          <Card className="container flex flex-col mx-auto mt-10 space-y-12 md:space-y-0 bg-dark-secondary/80 p-5 rounded-lg justify-center border-t-4 border-green-primary">
            <div>
              <CardHeader className="mt-2 bg-transparent shadow-none">
                <h1 className="text-6xl font-bold font-Audiowide text-green-primary text-center mb-4">
                  Leaderboard
                </h1>
              </CardHeader>
              <CardBody className="p-2">
                {qbxrData !== undefined ? (
                  <SkeletonTheme
                    baseColor="#0C0C0C"
                    highlightColor="#AAAAAA"
                    duration={1.5}
                    borderRadius="0.5rem"
                  >
                    {isLoading ? (
                      <div className="font-bold font-Audiowide text-light-primary text-center">
                        <Skeleton width={100} height={50} />
                        <Skeleton width={100} height={50} />
                      </div>
                    ) : (
                      <div className="font-bold font-Audiowide text-light-primary text-center">
                        <h2 className="text-2xl mb-2">
                          Your Rank: {qbxrData.rank}
                        </h2>
                        <p className="text-lg mb-4">
                          Your Score: {qbxrData.qbxr_score}
                        </p>
                      </div>
                    )}
                  </SkeletonTheme>
                ) : (
                  <div className="font-bold font-Audiowide text-light-primary text-center">
                    <h2 className="text-2xl mb-2">Your Rank: No Data</h2>
                    <p className="text-lg mb-4">
                      Take The Evalutation Tests On Your Profile
                    </p>
                  </div>
                )}
              </CardBody>
              <CardBody>
                <div className="relative overflow-x-auto sm:rounded-lg font-Audiowide">
                  <SkeletonTheme
                    baseColor="#0C0C0C"
                    highlightColor="#AAAAAA77"
                    borderRadius="0.5rem"
                    duration={1.5}
                  >
                    <table className="table-auto w-full text-sm text-center text-light-primary">
                      <thead className="text-xs text-light-primary uppercase bg-dark-secondary border-b">
                        <tr>
                          <th scope="col" className="py-3">
                            Rank
                          </th>
                          <th scope="col" className="py-3">
                            Name
                          </th>
                          <th scope="col" className="py-3">
                            School/Organization
                          </th>
                          <th scope="col" className="py-3">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>{tableContent}</tbody>
                    </table>
                  </SkeletonTheme>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
        <ProfileCard
          myId={myId}
          id={showProfile?.id}
          name={showProfile?.name}
          school={showProfile?.school}
          score={showProfile?.score}
          isVisible={showProfile !== null}
          onClose={handleClose}
        />
      </div>
    );
  }
  return content;
};

export default LeaderboardPage;
