import { useState, useEffect } from "react";
import ScoreCard from "./ScoreCard";
import { cn, getInitials, scoreColor } from "../lib/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../hooks/auth/authSlice";
import { useGetWebScoreQuery, useGetVRScoreQuery } from "../hooks/scores/scoreApiSlice";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Star, StarOff, X } from "lucide-react";
import { Button } from "./ui/button";
import { useUpdateUserInfoMutation } from "@/hooks/users/userApiSlice";

type ProfileCardProps = {
  myId: string | null;
  userId: string;
  role: string;
  name: string;
  school: string;
  score: number;
  isVisible: boolean;
  onClose: () => void;
};

type ScoreData = { title: string; score: number }[];
// ProfileCard component. This component displays a profile card with the user's name, school, score, and test scores.
const ProfileCard = ({ myId, userId, role, name, school, score, isVisible, onClose }: ProfileCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const [updateInfo] = useUpdateUserInfoMutation();

  // Get the web and VR test scores for the user
  const { data: webData, isLoading: isLoadingWebData } = useGetWebScoreQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip: !userId,
  });
  const { data: vrData, isLoading: isLoadingVRData } = useGetVRScoreQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip: !userId,
  });

  const typedWebData = webData as ScoreData;
  const typedVRData = vrData as ScoreData;

  // Get the current user from the redux store (cache)
  const user = useSelector(selectCurrentUser);

  // When the component mounts, check if the user is a favorite and if the profile is the user's profile
  useEffect(() => {
    if (user?.favorites !== undefined) {
      if (user.favorites.includes(userId)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }

    if (myId === userId && user !== undefined && isVisible) {
      setMyProfile(true);
    } else {
      setMyProfile(false);
    }
  }, [user, userId, myId, isVisible]);

  // If the profile is not visible, return null
  if (!isVisible) return null;

  // Handle the favorite event. If the user is a favorite, remove the user from the favorites list. Otherwise, add the user to the favorites list.
  const handleFavorite = async () => {
    setIsFavorite((prevState) => !prevState);
    await updateInfo({ userId: myId, favorite: userId });
  };

  // Return the profile card content
  const content = (
    <div id="profile-popup" tabIndex={-1} className="fixed inset-0 z-50 m-10 flex items-center justify-center">
      {/* Display the profile card */}
      <Card className="relative max-h-full w-3/4 overflow-auto rounded-lg bg-background-secondary p-4">
        {/* Display the close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 ml-auto inline-flex items-center justify-center rounded-lg text-sm hover:bg-transparent"
          onClick={onClose}
        >
          <X size={32} className="cursor-pointer text-3xl text-primary" />
        </Button>
        {/* End Display the close button */}

        {/* Display the favorite button */}
        {!myProfile ? (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-12 ml-auto inline-flex items-center justify-center rounded-lg text-sm hover:bg-transparent"
            onClick={handleFavorite}
          >
            {isFavorite ? (
              <StarOff className="text-2xl text-[#DBAC34]/80" />
            ) : (
              <Star className="text-2xl text-[#DBAC34]/80" />
            )}
          </Button>
        ) : null}
        {/* End Display the favorite button */}

        {/* Display the profile details */}
        <div className="p-4 text-center font-Audiowide md:p-5">
          <CardHeader className="mt-2 rounded-none border-b-2 border-primary bg-transparent pb-2 shadow-none">
            <h3 className="text-3xl font-normal text-foreground uppercase">Profile Details</h3>
          </CardHeader>
          <CardContent className="w-full flex-col rounded-lg p-3 text-center font-Audiowide">
            {/* Profile Image */}
            <div className="image overflow-hidden">
              <div className="text-md inline-flex h-60 w-60 items-center justify-center rounded-full border border-foreground bg-primary text-foreground md:text-4xl">
                {getInitials(name)}
              </div>
            </div>
            {/* End Profile Image */}

            {/* Profile Name */}
            <h1 className="mt-2 text-xl text-foreground uppercase">{name}</h1>
            {/* End Profile Name */}

            {/* Profile School */}
            <h3 className="text-light-secondary font-lg mb-4 uppercase">{school}</h3>
            {/* End Profile School */}

            <hr className="border-1 mx-auto border-primary" />
            {role === "PLAYER" && (
              <>
                {/* Profile Score */}
                {typedWebData === undefined ||
                typedVRData === undefined ||
                typedWebData?.length === 0 ||
                typedVRData?.length === 0 ? (
                  <p className="m-4 text-3xl text-foreground uppercase">QBxR Score: No Data</p>
                ) : (
                  <p className="m-4 text-3xl text-foreground uppercase">
                    QBxR Score: <span className={cn(scoreColor(score))}>{score}</span>
                  </p>
                )}

                {/* End Profile Score */}

                {/* Profile Test Scores */}
                <CardContent className="flex flex-col items-center justify-around font-Audiowide">
                  {/* Web Test Scores */}
                  <ScoreCard
                    title={"Web Test"}
                    errMessage={"No Web Data"}
                    isLoading={isLoadingWebData}
                    data={typedWebData}
                  />
                  {/* End Web Test Scores */}

                  <div className="my-4"></div>

                  {/* VR Test Scores */}
                  <ScoreCard
                    title={"VR Test"}
                    errMessage={"No VR Data"}
                    isLoading={isLoadingVRData}
                    data={typedVRData}
                  />

                  {/* End VR Test Scores */}
                </CardContent>
              </>
            )}
            {/* End Profile Test Scores */}

            {/* Go To Profile Button */}
            <Button size="lg" className="mt-2" onClick={onClose} asChild>
              <Link to={`/profile/${userId}`}>Go To Profile</Link>
            </Button>

            {/* End Go To Profile Button */}
          </CardContent>
        </div>
      </Card>
      {/* End Display the profile card */}
    </div>
  );
  return content;
};

export default ProfileCard;
