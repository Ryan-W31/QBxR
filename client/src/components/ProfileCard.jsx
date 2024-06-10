import React, { useState, useEffect } from "react";
import ScoreCard from "./ScoreCard";
import { classNames, getInitials, scoreColor } from "../utils/utils";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { updateUserInfoAndRefresh } from "../hooks/users/userApiSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../hooks/auth/authSlice";
import {
  useGetWebScoreQuery,
  useGetVRScoreQuery,
} from "../hooks/scores/scoreApiSlice";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
} from "@material-tailwind/react";

// ProfileCard component. This component displays a profile card with the user's name, school, score, and test scores.
const ProfileCard = ({ myId, id, name, school, score, isVisible, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const dispatch = useDispatch();

  // Get the web and VR test scores for the user
  const { data: webData, isLoading: isLoadingWebData } = useGetWebScoreQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      skip: !id,
    }
  );
  const { data: vrData, isLoading: isLoadingVRData } = useGetVRScoreQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip: !id,
  });

  // Get the current user from the redux store (cache)
  const user = useSelector(selectCurrentUser);

  // When the component mounts, check if the user is a favorite and if the profile is the user's profile
  useEffect(() => {
    if (user?.favorites !== undefined) {
      if (user.favorites.includes(id)) {
        setIsFavorite(true);
      }
    }

    if (myId === id && user !== undefined && isVisible) {
      setMyProfile(true);
    } else {
      setMyProfile(false);
    }
  }, [user, id, myId, isVisible]);

  // If the profile is not visible, return null
  if (!isVisible) return null;

  // Handle the favorite event. If the user is a favorite, remove the user from the favorites list. Otherwise, add the user to the favorites list.
  const handleFavorite = async (e) => {
    e.preventDefault();
    setIsFavorite((prevState) => !prevState);
    await dispatch(
      updateUserInfoAndRefresh({ id: myId, favorite: id })
    ).unwrap();
  };

  // Return the profile card content
  const content = (
    <div
      id="profile-popup"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center m-10"
    >
      {/* Display the profile card */}
      <Card className="relative p-4 w-3/4 max-h-full bg-dark-secondary rounded-lg overflow-auto">
        {/* Display the close button */}
        <IconButton
          variant="text"
          ripple={false}
          className="absolute top-3 right-3 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center justify-center"
          onClick={onClose}
        >
          <AiOutlineClose className="cursor-pointer text-3xl text-green-primary hover:text-green-secondary" />
        </IconButton>
        {/* End Display the close button */}

        {/* Display the favorite button */}
        {!myProfile ? (
          <IconButton
            variant="text"
            ripple={false}
            className="absolute top-12 right-3 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center justify-center"
            onClick={handleFavorite}
          >
            {isFavorite ? (
              <FaStar className="text-2xl text-[#DBAC34]/80" />
            ) : (
              <FaRegStar className="text-2xl text-light-primary" />
            )}
          </IconButton>
        ) : null}
        {/* End Display the favorite button */}

        {/* Display the profile details */}
        <div className="p-4 md:p-5 text-center font-Audiowide">
          <CardHeader className="mt-2 pb-2 bg-transparent rounded-none shadow-none border-b-2 border-green-primary">
            <h3 className="text-3xl font-normal text-light-primary">
              Profile Details
            </h3>
          </CardHeader>
          <CardBody class="w-full flex-col bg-dark-secondary/80 p-3 rounded-lg text-center font-Audiowide">
            {/* Profile Image */}
            <div class="image overflow-hidden">
              <div className="h-60 w-60 text-light-primary bg-green-primary border border-light-primary rounded-full inline-flex items-center justify-center text-md md:text-4xl">
                {getInitials(name)}
              </div>
            </div>
            {/* End Profile Image */}

            {/* Profile Name */}
            <h1 class="text-light-primary font-bold text-xl mt-2">{name}</h1>
            {/* End Profile Name */}

            {/* Profile School */}
            <h3 class="text-light-secondary font-lg text-semibold mb-4">
              {school}
            </h3>
            {/* End Profile School */}

            <hr class="border-light-primary border-1 mx-auto" />
            {/* Profile Score */}
            {webData === undefined ||
            vrData === undefined ||
            webData.length === 0 ||
            vrData.length === 0 ? (
              <p class="text-3xl text-light-primary m-4">QBxR Score: No Data</p>
            ) : (
              <p class="text-3xl text-light-primary m-4">
                QBxR Score:{" "}
                <span className={classNames(scoreColor(score))}>{score}</span>
              </p>
            )}

            {/* End Profile Score */}

            {/* Profile Test Scores */}
            <CardBody className="flex flex-col justify-around font-Audiowide">
              {/* Web Test Scores */}
              <ScoreCard
                title={"Web Test Scores"}
                errMessage={"No Web Data"}
                size=""
                isLoading={isLoadingWebData}
                data={webData}
              />
              {/* End Web Test Scores */}

              <div class="my-4"></div>

              {/* VR Test Scores */}
              <ScoreCard
                title={"VR Test Scores"}
                errMessage={"No VR Data"}
                size=""
                isLoading={isLoadingVRData}
                data={vrData}
              />
              {/* End VR Test Scores */}
            </CardBody>
            {/* End Profile Test Scores */}

            {/* Go To Profile Button */}
            <Link to={`/profile/${id}`}>
              <Button
                size="lg"
                className="text-md font-Audiowide bg-green-primary hover:bg-green-secondary px-6 py-2 text-light-primary rounded-full tracking-wider"
              >
                Go To Profile
              </Button>
            </Link>
            {/* End Go To Profile Button */}
          </CardBody>
        </div>
      </Card>
      {/* End Display the profile card */}
    </div>
  );
  return content;
};

export default ProfileCard;
