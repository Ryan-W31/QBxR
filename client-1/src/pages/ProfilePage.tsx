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
import { cn, checkData, getInitials, getAge, scoreColor } from "../lib/utils";
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
  birthday: Date;
  bio: string;
  status: boolean;
  role: string;
  favorites: string[];
};

type Scores = {
  qbxr?: { qbxr_score: number; rank: number };
  web?: { title: string; score: number; max: number }[];
  vr?: { title: string; score: number; max: number }[];
};

type Profile = {
  userId: string;
  role: string;
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
  const [openProfile, setOpenProfile] = useState<Profile>({
    userId: "",
    role: "",
    name: "",
    school: "",
    score: 0,
  });
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<User | undefined>(undefined);
  const [profileScores, setProfileScores] = useState<Scores | undefined>(undefined);
  const { toast } = useToast();

  const { userId } = useParams();
  const myId = useSelector(selectCurrentId);
  const isMyProfile = !userId || myId === userId;

  const primaryUser = useSelector(selectCurrentUser) ?? undefined;
  const primaryUserScores = useSelector(selectCurrentScores) ?? undefined;

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
      const typedWebData = webData as { title: string; score: number; max: number }[];
      const typedVRData = vrData as { title: string; score: number; max: number }[];
      setProfileScores({
        qbxr: typedQBxRData,
        web: typedWebData,
        vr: typedVRData,
      });
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

  useEffect(() => {
    localStorage.clear();
  }, []);

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
      <div className="jusitfy-center flex flex-row">
        <p className="text-foreground">An error occurred: {err.data.message}.</p>
        <Link to="/login" className="mx-2 rounded-full bg-primary px-6 py-2 font-Audiowide text-foreground">
          Please login again
        </Link>
      </div>
    );
  } else if (isLoading) {
    content = <p className="font-Audiowide text-foreground">Loading...</p>;
  } else {
    content = (
      <div>
        <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="profile" />

        <div className={showBlur ? "pointer-events-none blur-lg" : ""}>
          <ScrollToTop showMenu={showMenu} />
          <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="profile" />
          <div className="flex h-full w-full items-center justify-center">
            <div className="mx-6 my-5 mt-10 flex w-full max-w-screen-2xl flex-col p-6 md:flex-row">
              <Card className="relative w-full flex-col rounded-lg border-t-4 border-primary p-3 text-center font-Audiowide uppercase md:w-1/3">
                {!isMyProfile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm hover:bg-transparent"
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
                  <div className="text-md inline-flex h-60 w-60 items-center justify-center rounded-full border-2 border-foreground bg-primary text-foreground md:text-4xl">
                    {getInitials(`${profileData?.firstname} ${profileData?.lastname}`)}
                  </div>
                </div>
                <CardHeader className="bg-transparent py-0 shadow-none">
                  <h1 className="my-1 text-xl font-bold text-foreground">
                    {profileData?.firstname + " " + profileData?.lastname}
                  </h1>
                </CardHeader>
                <CardContent className="space-y-2 p-2">
                  <h3 className="text-sm font-semibold text-foreground-secondary">
                    {profileData?.school_organization}
                  </h3>
                  <ul className="bg-dark-secondary mt-3 divide-y rounded border-2 border-primary px-3 py-2 text-foreground-secondary">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        {isMyProfile ? (
                          <select
                            className={cn(
                              profileData?.status ? "bg-primary" : "bg-red-600",
                              "rounded px-2 py-1 text-center text-sm uppercase text-foreground"
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
                              "rounded px-2 py-1 text-center text-sm uppercase text-foreground"
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
                  <div>
                    {profileData?.bio !== undefined && (
                      <p className="text-sm text-foreground-secondary">{profileData?.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <div className="my-4 w-full font-Audiowide font-semibold uppercase md:mx-2 md:my-0 md:w-9/12">
                <Card className="relative rounded-lg border-t-4 border-primary p-4 pt-0">
                  {isMyProfile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-3 z-40 cursor-pointer hover:bg-transparent hover:text-primary"
                      onClick={handleEditProfile}
                    >
                      <UserPen size={24} />
                    </Button>
                  )}
                  <CardHeader className="bg-tranparent relative mt-0 overflow-visible text-center text-3xl font-bold text-foreground shadow-none">
                    About
                  </CardHeader>
                  <CardContent className="text-foreground-secondary">
                    <div className="grid text-lg md:grid-cols-2">
                      <div className="grid grid-cols-2">
                        <div className="px-2 py-2">Name</div>
                        <div className="px-2 py-2">{profileData?.firstname + " " + profileData?.lastname}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-2 py-2">Email</div>
                        <a
                          className="block overflow-hidden text-ellipsis whitespace-nowrap px-2 py-2 text-foreground hover:text-primary"
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

                <Card className="rounded-lg border-t-4 border-primary p-4">
                  {profileData?.role === "PLAYER" && (
                    <>
                      <div className="mb-6 text-center">
                        <CardHeader className="bg-tranparent m-2 pb-0 text-3xl font-bold text-foreground shadow-none">
                          Your QBxR Score
                        </CardHeader>
                        <CardContent className="space-y-4 p-2">
                          {isMyProfile || !isLoadingQBxRData ? (
                            <>
                              {profileScores?.qbxr ? (
                                <p className={cn(scoreColor(profileScores?.qbxr?.qbxr_score), "mx-5 text-5xl")}>
                                  {Math.floor(profileScores?.qbxr?.qbxr_score * 100) / 100}
                                </p>
                              ) : (
                                <div>
                                  <p className="mb-4 text-3xl text-foreground">No Data</p>
                                  {checkData(profileScores?.web, profileScores?.vr)}
                                </div>
                              )}
                            </>
                          ) : (
                            <Skeleton className="h-[75px] w-[75px]" />
                          )}

                          <p className="text-sm text-foreground-secondary">
                            Your QBxR score is calculated using your Web and VR scores.
                          </p>
                        </CardContent>
                      </div>
                      <CardContent className="flex flex-col justify-center space-y-4">
                        <ScoreCard
                          title={"Web Test"}
                          isLoading={false}
                          data={profileScores?.web}
                          isMyProfile={isMyProfile}
                          isVr={false}
                        />
                        <div className="my-4 md:my-0"></div>
                        <ScoreCard
                          title={"VR Test"}
                          isLoading={false}
                          data={profileScores?.vr}
                          isMyProfile={isMyProfile}
                          isVr={true}
                        />
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
        </div>
        <ProfileCard
          myId={myId}
          userId={openProfile?.userId}
          role={openProfile?.role}
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
