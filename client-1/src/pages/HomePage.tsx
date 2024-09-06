import { useState } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "@/components/ScoreCard";
import ProfileCard from "@/components/ProfileCard";
import FavoritesCard from "@/components/FavoritesCard";
import { selectCurrentScores, selectCurrentUser, selectCurrentId } from "../hooks/auth/authSlice";
import { checkData, cn, scoreColor } from "../lib/utils";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Profile = {
  userId: string;
  role: string;
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
  const [openProfile, setOpenProfile] = useState<Profile>({
    userId: "",
    role: "",
    name: "",
    school: "",
    score: 0,
  });
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
  let content = (
    <div>
      <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="home" />

      <div className={showBlur ? "pointer-events-none blur-lg" : ""}>
        <ScrollToTop showMenu={showMenu} />
        <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="home" />
        <div className="flex h-full w-full items-center justify-center">
          <Card className="mx-6 mt-10 flex w-full max-w-screen-2xl flex-col justify-center space-y-12 rounded-lg border-t-4 border-primary p-6 md:space-y-0">
            <CardHeader className="mt-2 text-center shadow-none">
              <h1 className="font-Audiowide text-4xl font-bold uppercase text-primary md:text-6xl">
                Welcome to QBxR
              </h1>
            </CardHeader>
            {user?.role === "PLAYER" && (
              <>
                <div className="justify-center text-center font-Audiowide">
                  <CardContent className="flex flex-col items-center justify-center space-y-8 text-2xl text-foreground md:text-4xl">
                    <p className="text-foreground-secondary uppercase">Your QBxR Score:</p>
                    {qbxrData ? (
                      <>
                        {qbxrData.qbxr_score >= 0 ? (
                          <p className={cn(scoreColor(qbxrData.qbxr_score), "m-4 text-xl md:text-5xl")}>
                            {qbxrData.qbxr_score}
                          </p>
                        ) : (
                          <Skeleton className="h-[75px] w-[75px]" />
                        )}
                      </>
                    ) : (
                      <div>
                        <p className="text-xl md:text-2xl uppercase">No Data</p>
                        {checkData(webData, vrData)}
                      </div>
                    )}
                  </CardContent>
                </div>
                <CardContent className="flex flex-col items-center justify-around font-Audiowide">
                  <ScoreCard title={"Web Test"} isLoading={false} data={webData} isMyProfile={true} isVr={false} />
                  <div className="my-4" />
                  <ScoreCard title={"VR Test"} isLoading={false} data={vrData} isMyProfile={true} isVr={true} />
                </CardContent>
              </>
            )}
            {user?.role === "NONPLAYER" && (
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
        role={openProfile.role}
        name={openProfile.name}
        school={openProfile.school}
        score={openProfile.score}
        isVisible={showProfile}
        onClose={handleClose}
      />
    </div>
  );

  return content;
};

export default HomePage;
