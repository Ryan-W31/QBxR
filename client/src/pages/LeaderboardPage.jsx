import React from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import LeaderboardCard from "../components/LeaderboardCard";
import ProfileCard from "../components/ProfileCard";
import { useGetLeaderboardQuery } from "../hooks/users/userApiSlice";

const LeaderboardPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [hasWebData, setHasWebData] = useState(false);
  const [hasVRData, setHasVRData] = useState(false);
  const [hasRank, setHasRank] = useState(false);
  const [showProfile, setShowProfile] = useState(null);

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLeaderboardQuery(undefined, {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleRowClick = (profile) => {
    setShowProfile(profile);
    toggleBlur();
    console.log(profile);
  };

  const handleClose = () => {
    setShowProfile(null);
    toggleBlur();
  };

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
    toggleBlur();
  };

  const toggleBlur = () => {
    setShowBlur((prevState) => !prevState);
  };

  window.onload = function () {
    toggleRank();
    console.log("loaded");
  };

  let content;

  if (isLoading) content = <div className="text-light-primary">Loading...</div>;

  if (isError) {
    content = (
      <p className="errmsg text-light-primary">{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const tableContent = users?.length
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
      : null;

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
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfileCard
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
