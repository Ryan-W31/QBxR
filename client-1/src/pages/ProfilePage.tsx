import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "../components/ScoreCard";
import ProfileCard from "../components/ProfileCard";
import EditProfileCard from "../components/EditProfileCard";
import { selectCurrentId, selectCurrentScores, selectCurrentUser } from "../hooks/auth/authSlice";
import { useGetUserByIdQuery, useUpdateUserInfoMutation } from "../hooks/users/userApiSlice";
import { useGetVRScoreQuery, useGetWebScoreQuery, useGetQBxRScoreQuery } from "../hooks/scores/scoreApiSlice";
import { cn, checkData, getInitials, getAge } from "../lib/utils";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { formatInTimeZone } from "date-fns-tz";
import FavoritesCard from "../components/FavoritesCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, StarOff, UserPen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  school_organization: string;
  birthday: string;
  bio: string;
  status: boolean;
  role: string;
  favorites: string[];
};

type Scores = {
  qbxr: { qbxr_score: number; rank: number };
  web: { title: string; score: number }[];
  vr: { title: string; score: number }[];
};

type Profile = {
  userId: string;
  name: string;
  school: string;
  score: number;
};

type CustomError = {
  status: number;
  data: {
    message: string;
  };
};

// ProfilePage component. This component displays the user's profile page with the user's name, school, status, bio, and test scores.
const ProfilePage = () => {
  const [showBlur, setShowBlur] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openProfile, setOpenProfile] = useState<Profile>({ userId: "", name: "", school: "", score: 0 });
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<User | undefined>(undefined);
  const [profileScores, setProfileScores] = useState<Scores | undefined>(undefined);
  const { toast } = useToast();

  const { userId } = useParams();
  const myId = useSelector(selectCurrentId);
  const isMyProfile = !userId || myId === userId;
  console.log(isMyProfile, userId, myId);

  const primaryUser = useSelector(selectCurrentUser) ?? undefined;
  const primaryUserScores = useSelector(selectCurrentScores) ?? undefined;
  console.log(primaryUser);

  const [updateInfo] = useUpdateUserInfoMutation();

  const { data: user, error, isLoading: isLoadingUser } = useGetUserByIdQuery(userId, { skip: !userId });

  // Get the user's VR and Web test scores
  const { data: vrData, isLoading: isLoadingVRScore } = useGetVRScoreQuery(userId, {
    skip: !userId,
  });
  const { data: webData, isLoading: isLoadingWebScore } = useGetWebScoreQuery(userId, {
    skip: !userId,
  });
  const { data: qbxrData, isLoading: isLoadingQBxRData } = useGetQBxRScoreQuery(userId, {
    skip: !userId,
  });

  // Check if the profile is the user's profile
  useEffect(() => {
    if (isMyProfile) {
      setProfileData(primaryUser);
      setProfileScores(primaryUserScores);
    } else {
      setProfileData(user);
      const typedQBxRData = qbxrData as { qbxr_score: number; rank: number };
      const typedWebData = webData as { title: string; score: number }[];
      const typedVRData = vrData as { title: string; score: number }[];
      setProfileScores({ qbxr: typedQBxRData, web: typedWebData, vr: typedVRData });
    }

    if (!isLoadingUser && !isLoadingQBxRData && !isLoadingVRScore && !isLoadingWebScore) {
      setIsLoading(false);
    }
  }, [
    isMyProfile,
    primaryUser,
    primaryUserScores,
    user,
    qbxrData,
    webData,
    vrData,
    profileData,
    isLoadingUser,
    isLoadingQBxRData,
    isLoadingVRScore,
    isLoadingWebScore,
  ]);

  // If not logged in user's profile, get the user data by userId

  // Check if the user is in the logged in user's favorites
  useEffect(() => {
    if (userId === undefined || primaryUser === undefined) return;
    if (primaryUser?.favorites?.includes(userId)) {
      setIsFavorite(true);
    }
  }, [primaryUser, userId]);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  // Toggle the blur effect
  const toggleBlur = () => setShowBlur((prevState) => !prevState);

  // Toggle the edit profile card
  const handleEditProfile = () => {
    setShowEditProfile((prevState) => !prevState);
    toggleBlur();
  };

  // Close the edit profile card
  const handleClose = () => {
    setShowEditProfile(false);
    setShowProfile(false);
    toggleBlur();
  };

  // Handle the status change event
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const target = e.target as HTMLSelectElement;
    const status = target.value.toLowerCase() === "true";

    try {
      await updateInfo({ userId: myId, status }).unwrap();
    } catch (err) {
      toast({ variant: "destructive", description: "Failed updating status." });
    }
  };

  // Handle the favorite event
  const handleFavorite = async () => {
    setIsFavorite((prevState) => !prevState);
    updateInfo({ userId: myId, favorite: userId });
  };

  let content = null;

  // Display the user's profile page
  if (error) {
    const err = error as CustomError;
    content = (
      <div className="flex flex-row jusitfy-center">
        <p className="text-foreground">An error occurred: {err.data.message}.</p>
        <Link to="/login" className="mx-2 px-6 py-2 font-Audiowide bg-primary text-foreground rounded-full">
          Please login again
        </Link>
      </div>
    );
  } else if (isLoading) {
    content = <p className="text-foreground font-Audiowide">Loading...</p>;
  } else {
    content = (
      <div>
        <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="profile" />

        <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
          <ScrollToTop showMenu={showMenu} />
          <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="profile" />
          <div className=" mx-auto flex flex-col md:flex-row my-5 p-5">
            <Card className="md:w-1/3 w-full flex-col p-3 border-t-4 border-primary rounded-lg text-center font-Audiowide uppercase relative">
              {!isMyProfile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center justify-center hover:bg-transparent"
                  onClick={handleFavorite}
                >
                  {isFavorite ? (
                    <StarOff className="text-2xl text-[#DBAC34]/80" />
                  ) : (
                    <Star className="text-2xl text-[#DBAC34]/80" />
                  )}
                </Button>
              )}
              <div className="image overflow-hidden p-3">
                <div className="h-60 w-60 text-foreground bg-primary border-2 border-foreground rounded-full inline-flex items-center justify-center text-md md:text-4xl">
                  {getInitials(`${profileData?.firstname} ${profileData?.lastname}`)}
                </div>
              </div>
              <CardHeader className="mt-2 bg-transparent shadow-none">
                <h1 className="text-foreground font-bold text-xl leading-8 my-1">
                  {profileData?.firstname + " " + profileData?.lastname}
                </h1>
              </CardHeader>
              <CardContent className="p-2">
                <h3 className="text-foreground-secondary font-lg text-semibold leading-6">
                  {profileData?.school_organization}
                </h3>
                <div>
                  {profileData?.bio !== undefined && (
                    <p className="text-sm text-foreground-secondary leading-6">{profileData?.bio}</p>
                  )}
                </div>
                <ul className="bg-dark-secondary text-foreground-secondary py-2 px-3 mt-3 divide-y rounded border-2 border-primary">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {isMyProfile ? (
                        <select
                          className={cn(
                            profileData?.status ? "bg-primary" : "bg-red-600",
                            "text-foreground py-1 px-2 rounded text-sm uppercase text-center"
                          )}
                          onChange={handleStatusChange}
                        >
                          {profileData?.status ? (
                            <option defaultValue={"true"}>Active</option>
                          ) : (
                            <option defaultValue={"false"}>Inactive</option>
                          )}
                          <option value={"true"}>Active</option>
                          <option value={"false"}>Inactive</option>
                        </select>
                      ) : (
                        <div
                          className={cn(
                            profileData?.status ? "bg-primary" : "bg-red-600",
                            "text-foreground py-1 px-2 rounded text-sm uppercase text-center"
                          )}
                        >
                          {profileData?.status ? "Active" : "Inactive"}
                        </div>
                      )}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Age</span>
                    {profileData?.birthday !== undefined ? (
                      <span className="ml-auto">{getAge(profileData?.birthday)} years old</span>
                    ) : (
                      <span className="ml-auto">N/A</span>
                    )}
                  </li>
                </ul>
              </CardContent>
            </Card>
            <div className="w-full md:w-9/12 my-4 md:my-0 md:mx-2 font-Audiowide uppercase font-semibold">
              <Card className="pt-0 p-4 rounded-lg border-t-4 border-primary relative">
                {isMyProfile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 cursor-pointer hover:text-primary hover:bg-transparent z-50"
                    onClick={handleEditProfile}
                  >
                    <UserPen size={24} />
                  </Button>
                )}
                <CardHeader className="bg-tranparent shadow-none text-3xl font-bold text-foreground mt-0 text-center relative overflow-visible">
                  About
                </CardHeader>
                <CardContent className="text-foreground-secondary">
                  <div className="grid md:grid-cols-2 text-lg">
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2">Name</div>
                      <div className="px-2 py-2">{profileData?.firstname + " " + profileData?.lastname}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2">Email</div>
                      <a
                        className="px-2 py-2 text-foreground hover:text-primary whitespace-nowrap overflow-hidden text-ellipsis block"
                        href={"mailto:" + profileData?.email}
                      >
                        {profileData?.email}
                      </a>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2">Phone No.</div>
                      {profileData?.phone_number !== undefined ? (
                        <div className="px-2 py-2">{formatPhoneNumberIntl(profileData?.phone_number)}</div>
                      ) : (
                        <div className="px-2 py-2">N/A</div>
                      )}
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2">Birthday</div>
                      {profileData?.birthday !== undefined ? (
                        <div className="px-2 py-2">
                          {formatInTimeZone(new Date(profileData?.birthday), "UTC", "PP")}
                        </div>
                      ) : (
                        <div className="px-2 py-2">N/A</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="my-4"></div>

              <Card className=" p-4 rounded-lg border-t-4 border-primary">
                {profileData?.role === "player" && (
                  <>
                    <div className="text-center mb-6">
                      <CardHeader className="bg-tranparent shadow-none text-3xl font-bold text-foreground m-2">
                        Your QBxR Score
                      </CardHeader>
                      <CardContent className="p-2">
                        {!isLoadingQBxRData ? (
                          <>
                            {profileScores?.qbxr?.qbxr_score ? (
                              <p className="mx-5 text-5xl text-primary">{profileScores?.qbxr?.qbxr_score}</p>
                            ) : (
                              <div>
                                <p className="m-4 text-3xl text-foreground">No Data</p>
                                {checkData(profileScores?.web, profileScores?.vr)}
                              </div>
                            )}
                          </>
                        ) : (
                          <Skeleton className="w-[75px] h-[75px]" />
                        )}

                        <p className="text-foreground-secondary">
                          Your QBxR score is calculated by taking the average of your Web and VR test scores.
                        </p>
                      </CardContent>
                    </div>
                    <CardContent className="flex md:flex-row flex-col justify-evenly md:space-x-4 p-2">
                      <div className="flex flex-col">
                        <ScoreCard
                          title={"Your Web Test Scores"}
                          errMessage={"Take The Web Test"}
                          isLoading={false}
                          data={profileScores?.web}
                        />
                        {isMyProfile && (
                          <Link to="/web">
                            <Button className="w-full py-2 bg-primary hover:bg-green-secondary text-foreground rounded-full font-semibold text-lg mt-4 text-center !font-Audiowide">
                              {profileScores?.web === undefined || profileScores?.web?.length === 0
                                ? "Take The Web Test"
                                : "Retake The Web Test"}
                            </Button>
                          </Link>
                        )}
                      </div>
                      <div className="my-4 md:my-0"></div>
                      <div className="flex flex-col justify-center">
                        <ScoreCard
                          title={"Your VR Test Scores"}
                          errMessage={"Take The VR Test"}
                          isLoading={false}
                          data={profileScores?.vr}
                        />
                        {isMyProfile && (
                          <Link to="/vr">
                            <Button className="w-full py-2 bg-primary hover:bg-green-secondary text-foreground rounded-full font-semibold text-lg mt-4 text-center !font-Audiowide">
                              {profileScores?.vr === undefined || profileScores?.vr?.length === 0
                                ? "Take The VR Test"
                                : "Retake The VR Test"}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </>
                )}
                {profileData?.role === "NONPLAYER" && (
                  <FavoritesCard
                    userId={profileData?._id}
                    toggleBlur={toggleBlur}
                    setOpenProfile={setOpenProfile}
                    setShowProfile={setShowProfile}
                  />
                )}
              </Card>
            </div>
          </div>
        </div>
        <ProfileCard
          myId={myId}
          userId={openProfile?.userId}
          name={openProfile?.name}
          school={openProfile?.school}
          score={openProfile?.score}
          isVisible={showProfile}
          onClose={handleClose}
        />
        <EditProfileCard isVisible={showEditProfile} userId={myId} user={profileData} onClose={handleClose} />
      </div>
    );
  }
  return content;
};

export default ProfilePage;
