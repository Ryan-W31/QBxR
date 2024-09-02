import { useState } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "@/components/ScoreCard";
import ProfileCard from "@/components/ProfileCard";
import FavoritesCard from "@/components/FavoritesCard";
import { selectCurrentScores, selectCurrentUser, selectCurrentId } from "../hooks/auth/authSlice";
import { checkData } from "../lib/utils";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

type Profile = {
  userId: string;
  name: string;
  school: string;
  score: number;
};

// const myId = "pp";
// const user = {
//   _id: "pp",
//   firstname: "Test",
//   lastname: "User",
//   email: "test@email.com",
//   status: true,
//   role: "PLAYER",
//   school_organization: "UCF",
//   bio: "",
//   birthday: "",
//   phone_number: "",
//   score: 0,
//   isVerified: true,
//   favorites: [],
//   createdAt: "",
//   updatedAt: "",
// };

// const data = {
//   qbxr: { qbxr_score: 0, rank: 100 },
//   web: [
//     { title: "Web Test 1", score: 0 },
//     { title: "Web Test 2", score: 0 },
//   ],
//   vr: [
//     { title: "VR Test 1", score: 0 },
//     { title: "VR Test 2", score: 0 },
//   ],
// };
// HomePage component. This component displays the home page with the user's QBxR score, web test scores, and VR test scores.
const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openProfile, setOpenProfile] = useState<Profile>({ userId: "", name: "", school: "", score: 0 });
  const [showBlur, setShowBlur] = useState(false);

  const myId = useSelector(selectCurrentId);
  const user = useSelector(selectCurrentUser);
  const data = useSelector(selectCurrentScores);

  const qbxrData = data?.qbxr;
  //const qbxrData: any = undefined;

  const webData = data?.web;
  //const webData = undefined;

  const vrData = data?.vr;
  //const vrData = undefined;

  const toggleBlur = () => setShowBlur((prevState) => !prevState);

  // Toggle the visibility of the mobile menu
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  const handleClose = () => {
    setShowProfile(false);
    toggleBlur();
  };

  // Home page content
  let content;

  if (!user || !data) {
    content = (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  } else {
    content = (
      <div>
        <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="home" />

        <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
          <ScrollToTop showMenu={showMenu} />
          <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="home" />
          <div className="flex items-center justify-center w-full h-full">
            <Card className="flex flex-col mx-6 mt-10 space-y-12 md:space-y-0 p-6 rounded-lg justify-center border-t-4 border-primary max-w-screen-2xl">
              <CardHeader className="mt-2 shadow-none text-center">
                <h1 className="text-primary font-bold text-4xl md:text-6xl font-Audiowide">Welcome to QBxR</h1>
              </CardHeader>
              {user?.role === "PLAYER" && (
                <>
                  <div className="text-center justify-center font-Audiowide">
                    <CardContent className="flex flex-col items-center justify-center text-foreground text-2xl md:text-4xl space-y-8">
                      <p className="text-foreground-secondary">Your QBxR Score:</p>
                      {qbxrData ? (
                        <>
                          {qbxrData.qbxr_score >= 0 ? (
                            <p className="m-4 text-xl md:text-3xl">{qbxrData.qbxr_score}</p>
                          ) : (
                            <Skeleton className="w-[75px] h-[75px]" />
                          )}
                        </>
                      ) : (
                        <div>
                          <p className="text-xl md:text-3xl">No Data</p>
                          {checkData(webData, vrData)}
                        </div>
                      )}
                    </CardContent>
                  </div>
                  <CardContent className="flex md:flex-row flex-col justify-center md:space-x-4">
                    <ScoreCard
                      title={"Your Web Test Scores"}
                      errMessage={"Take The Web Test On Your Profile Page"}
                      isLoading={false}
                      data={webData}
                    />

                    <div className="my-4" />

                    <ScoreCard
                      title={"Your VR Test Scores"}
                      errMessage={"Take The VR Test On Your Profile Page"}
                      isLoading={false}
                      data={vrData}
                    />
                  </CardContent>
                </>
              )}
              {user?.role === "nonplayer" && (
                <FavoritesCard
                  userId={myId}
                  toggleBlur={toggleBlur}
                  setOpenProfile={setOpenProfile}
                  setShowProfile={setShowProfile}
                />
              )}
            </Card>
          </div>
        </div>
        <ProfileCard
          myId={myId}
          userId={openProfile.userId}
          name={openProfile.name}
          school={openProfile.school}
          score={openProfile.score}
          isVisible={showProfile}
          onClose={handleClose}
        />
      </div>
    );
  }

  return content;
};

export default HomePage;
