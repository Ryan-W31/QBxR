import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import LeaderboardCard from "@/components/LeaderboardCard";
import ProfileCard from "../components/ProfileCard";
import { useGetLeaderboardQuery } from "../hooks/users/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentId, selectCurrentScores, selectCurrentUser } from "../hooks/auth/authSlice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

type Profile = {
  userId: string;
  role: string;
  name: string;
  school: string;
  score: number;
};

interface CustomError {
  status: number;
  data: {
    message: string;
  };
}

// const users = [
//   {
//     userId: "1",
//     rank: 1,
//     name: "John Doe",
//     school: "School A",
//     score: 100,
//   },
//   {
//     userId: "2",
//     rank: 2,
//     name: "Jane Doe",
//     school: "School B",
//     score: 90,
//   },
//   {
//     userId: "3",
//     rank: 3,
//     name: "Alice Smith",
//     school: "School C",
//     score: 80,
//   },
//   {
//     userId: "4",
//     rank: 4,
//     name: "Bob Smith",
//     school: "School D",
//     score: 70,
//   },
//   {
//     userId: "5",
//     rank: 5,
//     name: "Eve Johnson",
//     school: "School E",
//     score: 60,
//   },
//   {
//     userId: "6",
//     rank: 6,
//     name: "Charlie Brown",
//     school: "School F",
//     score: 50,
//   },
//   {
//     userId: "7",
//     rank: 7,
//     name: "David Brown",
//     school: "School G",
//     score: 40,
//   },
//   {
//     userId: "8",
//     rank: 8,
//     name: "Frank Johnson",
//     school: "School H",
//     score: 30,
//   },
//   {
//     userId: "9",
//     rank: 9,
//     name: "Grace Johnson",
//     school: "School I",
//     score: 20,
//   },
//   {
//     userId: "10",
//     rank: 10,
//     name: "Helen Doe",
//     school: "School J",
//     score: 10,
//   },
//];
// LeaderboardPage component. This component displays the leaderboard page with the user's rank, name, school, and score.
const LeaderboardPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [openProfile, setOpenProfile] = useState<Profile>({
    userId: "",
    role: "",
    name: "",
    school: "",
    score: 0,
  });
  const [showProfile, setShowProfile] = useState(false);
  const [visibleRows, setVisibleRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const myId = useSelector(selectCurrentId);
  const user = useSelector(selectCurrentUser);

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

  // const isLoading = false;
  // const isSuccess = true;
  // const isError = false;
  // const error = undefined;

  const data = useSelector(selectCurrentScores);
  const qbxrData = data?.qbxr;

  // Load more rows when the user scrolls to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setVisibleRows((prevVisibleRows) => Math.min(prevVisibleRows + 10, totalRows));
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
  const handleRowClick = (profile: Profile) => {
    setShowProfile(true);
    setOpenProfile(profile);
    toggleBlur();
  };

  // Close the profile card and remove the blur effect
  const handleClose = () => {
    setShowProfile(false);
    setOpenProfile({ userId: "", role: "", name: "", school: "", score: 0 });
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
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );

  // Display error message if there is an error fetching data
  if (isError) {
    const err = error as unknown as CustomError;
    content = <p className="errmsg text-destructive">{err.data.message}</p>;
  }

  // Display leaderboard content if the data is successfully fetched
  if (isSuccess) {
    // Display the leaderboard content
    const tableContent =
      users !== undefined && users?.length !== 0
        ? users.map((user) => (
            <LeaderboardCard
              key={user.userId}
              rank={user.rank}
              name={user.name}
              school={user.school}
              score={Math.floor(user.score * 100) / 100}
              onClick={() => handleRowClick(user)}
            />
          ))
        : // Display skeleton cards while loading data
          [...Array(visibleRows)].map((_, index) => <LeaderboardCard key={index} skeleton={true} />);

    // Display the leaderboard content
    content = (
      <div>
        <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="leaderboard" />

        <div className={showBlur ? "pointer-events-none blur-lg" : ""}>
          <ScrollToTop showMenu={showMenu} />
          <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="leaderboard" />
          <div className="flex h-full w-full items-center justify-center">
            <Card className="mx-6 mt-10 flex w-full max-w-screen-2xl flex-col justify-center space-y-12 rounded-lg border-t-4 border-primary p-6 md:space-y-0">
              <div>
                <CardHeader className="mt-2 bg-transparent shadow-none">
                  <h1 className="mb-4 text-center font-Audiowide text-6xl font-bold uppercase text-primary">
                    Leaderboard
                  </h1>
                </CardHeader>
                <CardContent className="p-2">
                  {user?.role === "PLAYER" && (
                    <>
                      {qbxrData !== undefined ? (
                        <>
                          {isLoading ? (
                            <div className="text-center font-Audiowide text-foreground">
                              <Skeleton className="h-[50px] w-[100px]" />
                              <Skeleton className="h-[50px] w-[100px]" />
                            </div>
                          ) : (
                            <div className="text-center font-Audiowide text-foreground uppercase">
                              <h2 className="mb-2 text-3xl">Your Rank: {qbxrData.rank}</h2>
                              <p className="mb-4 text-xl">
                                Your Score: {Math.floor(qbxrData.qbxr_score * 100) / 100}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center font-Audiowide text-foreground uppercase">
                          <h2 className="mb-2 text-2xl">Your Rank: No Data</h2>
                          <p className="mb-4 text-lg">Take The Evalutation Tests On Your Profile</p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
                <CardContent>
                  <div className="relative overflow-x-auto font-Audiowide uppercase sm:rounded-lg">
                    <table className="w-full table-auto text-center text-sm text-foreground">
                      <thead className="border-b bg-background-secondary text-foreground text-lg">
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
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
        <ProfileCard
          myId={myId}
          userId={openProfile.userId}
          role={openProfile.role}
          name={openProfile.name}
          school={openProfile.school}
          score={Math.floor(openProfile.score * 100) / 100}
          isVisible={showProfile}
          onClose={handleClose}
        />
      </div>
    );
  }
  return content;
};

export default LeaderboardPage;
