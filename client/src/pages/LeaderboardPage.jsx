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

  useEffect(() => {
    if (users) {
      setTotalRows(users.length);
    }
  }, [users]);

  const handleRowClick = (profile) => {
    setShowProfile(profile);
    toggleBlur();
  };

  const handleClose = () => {
    setShowProfile(null);
    toggleBlur();
  };

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  const toggleBlur = () => {
    setShowBlur((prevState) => !prevState);
  };

  let content;

  if (isLoading)
    content = (
      <div className="text-light-primary font-Audiowide">Loading...</div>
    );

  if (isError) {
    content = (
      <p className="errmsg text-light-primary">{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
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
        : [...Array(visibleRows)].map((_, index) => (
            <LeaderboardCard key={index} skeleton={true} />
          ));

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
          <div className="flex flex-col bg-dark-primary justify-center items-center">
            <div className="md:w-3/4 min-w-96 bg-dark-secondary/80 p-8 px-6 rounded-lg mt-10 space-y-10 border-t-4 border-green-primary">
              <div>
                <h1 className="text-6xl font-bold font-Audiowide text-green-primary text-center mb-4">
                  Leaderboard
                </h1>
                <div>
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
                </div>
                <div>
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
                </div>
              </div>
            </div>
          </div>
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
